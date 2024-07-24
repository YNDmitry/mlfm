import {defineStore} from 'pinia'

interface CartItem {
	product_id: string
	quantity: number
	variant_id: string
	type: 'product'
}

interface GiftCard {
	product_id: string
	price: number
	image_id: string
	title: string
	category: string
	type: 'gift-card'
}

// Union type for all cart items
type CartItemUnion = CartItem | GiftCard

interface ItemDetail {
	id: 'gift-card'
	title: string
	price: number
	image_id: string
	type: 'product' | 'gift-card'
	quantity?: number
	category?: string
}

export const useCartStore = defineStore('userCart', {
	state: () => ({
		items: [] as CartItemUnion[],
		itemsDetails: [] as ItemDetail[],
		relatedItems: [],
		discount: '',
		discountPercent: null,
		discountErrors: {} as {status?: number; statusMessage?: string},
		giftCode: '',
		giftCodeInitialAmount: null,
		giftCodeCurrentBalance: null,
		giftCodeRemainingBalance: null,
		giftCodeErrors: {} as {status?: number; statusMessage?: string},
		isRelatedProductPending: true,
	}),
	getters: {
		totalPrice: (state) => {
			const total = state.itemsDetails.reduce((total, item) => {
				if (item.type === 'product' && item.quantity) {
					return total + item.price * item.quantity
				}
				return total + item.price
			}, 0)
			return total
		},
		totalPriceWithDiscount: (state) => {
			// Общая стоимость всех товаров
			let total = state.itemsDetails.reduce((total, item) => {
				if (item.type === 'product' && item.quantity) {
					return total + item.product_variants[0]?.price * item.quantity
				}
				return total + item.price
			}, 0)

			// Общая стоимость товаров без учета подарочных карт
			let totalWithoutGiftCards = state.itemsDetails.reduce((total, item) => {
				if (item.type === 'product' && item.quantity) {
					return total + item.product_variants[0]?.price * item.quantity
				}
				return item.type === 'product'
					? total + item.product_variants[0]?.price
					: total
			}, 0)

			// Применяем скидку только на товары
			if (state.discountPercent) {
				totalWithoutGiftCards -=
					(totalWithoutGiftCards * state.discountPercent) / 100
			}

			// Добавляем стоимость подарочных карт обратно к общей сумме
			let giftCardTotal = state.itemsDetails.reduce((total, item) => {
				return item.type === 'gift-card' ? total + item.price : total
			}, 0)

			// Итоговая сумма с учетом скидок и подарочных карт
			total = totalWithoutGiftCards + giftCardTotal

			// Применяем баланс подарочной карты
			if (state.giftCodeCurrentBalance && total > 1) {
				const giftCardAmountToApply = Math.min(
					totalWithoutGiftCards,
					state.giftCodeCurrentBalance,
				)
				const remainingBalance =
					state.giftCodeCurrentBalance - giftCardAmountToApply
				state.giftCodeRemainingBalance =
					remainingBalance < 0 ? 0 : remainingBalance

				total -= giftCardAmountToApply

				// Убедимся, что хотя бы 1 рубль остается для оплаты
				if (total < 1) {
					state.giftCodeRemainingBalance += 1 - total
					total = 1
				}
			}

			return total > 0 ? total : 0
		},
		discountAmount: (state) => {
			const total = state.itemsDetails.reduce((total, item) => {
				if (item.type === 'product' && item.quantity) {
					return total + item.product_variants[0]?.price * item.quantity
				}
				return item.type === 'product'
					? total + item.product_variants[0]?.price
					: total
			}, 0)
			return state.discountPercent ? (total * state.discountPercent) / 100 : 0
		},
		remainingGiftCardBalance: (state) => {
			return state.giftCodeRemainingBalance
		},
	},
	actions: {
		async getSessionId(): Promise<string | undefined> {
			let sessionId = localStorage.getItem('sessionId')
			if (!sessionId) {
				try {
					const res = await GqlCreateGuestSessionItem({data: {status: 'draft'}})
					sessionId = res.create_guest_session_item?.id as string
					localStorage.setItem('sessionId', sessionId)
				} catch (error) {
					console.error('Error during session initialization:', error)
					return undefined
				}
			} else {
				// Проверка валидности существующей сессии в базе данных
				try {
					const res = await GqlGetSession({id: sessionId})
					if (!res || !res.guest_session_by_id) {
						// Сессия не найдена, создаем новую
						const newRes = await GqlCreateGuestSessionItem({
							data: {status: 'draft'},
						})
						sessionId = newRes.create_guest_session_item?.id as string
						localStorage.setItem('sessionId', sessionId)
					}
				} catch (error) {
					console.error('Error validating session:', error)
					// Ошибка при проверке, создаем новую сессию
					const newRes = await GqlCreateGuestSessionItem({
						data: {status: 'draft'},
					})
					sessionId = newRes.create_guest_session_item?.id as string
					localStorage.setItem('sessionId', sessionId)
				}
			}
			return sessionId
		},

		async initCart() {
			const sessionId = await this.getSessionId()
			if (sessionId) {
				await this.loadCartFromServer(sessionId)
				await this.loadProductDetails()
				return await this.getRelatedProducts()
			}
		},

		async loadCartFromServer(sessionId: string) {
			try {
				const res = await GqlGetSession({id: sessionId})
				this.items = res?.guest_session_by_id?.temp_order || []
				await this.loadProductDetails() // Обновление деталей продуктов после загрузки корзины
			} catch (error) {
				console.error('Error loading cart from server:', error)
			}
		},

		async saveCartToServer() {
			const sessionId = await this.getSessionId()
			if (!sessionId) return
			try {
				await GqlUpdateGuestSessionItem({
					id: sessionId,
					data: {
						temp_order: this.items,
					},
				})
				await this.loadProductDetails() // Обновление деталей продуктов после сохранения корзины
			} catch (error) {
				console.error('Error saving cart to server:', error)
			}
		},

		async addGiftCard(item: GiftCard) {
			item.type = 'gift-card'
			const sessionId = await this.getSessionId()
			if (!sessionId) {
				await this.initCart()
				return
			}

			const existingItemIndex = this.items.findIndex(
				(i) => i.product_id === item.product_id && 'price' in i,
			)
			if (existingItemIndex !== -1) {
				// Заменяем номинал карты вместо сообщения об ошибке
				this.items[existingItemIndex] = item
			} else {
				this.items.push(item)
			}

			await this.saveCartToServer()
		},

		async addItem(item: CartItem) {
			item.type = 'product'
			const sessionId = await this.getSessionId()
			if (!sessionId) {
				await this.initCart()
				return
			}

			const existingItem = this.items.find(
				(i) =>
					'quantity' in i &&
					i.product_id === item.product_id &&
					i.variant_id === item.variant_id,
			)

			if (existingItem && 'quantity' in existingItem) {
				existingItem.quantity += item.quantity
			} else {
				this.items.push(item)
			}

			await this.saveCartToServer()
		},

		removeItem(productId: string) {
			const index = this.items.findIndex((i) => i.product_id === productId)
			if (index !== -1) {
				this.items.splice(index, 1)
				this.saveCartToServer()
			}
		},

		async removeCart() {
			this.items = []
			this.discount = ''
			this.giftCode = ''
			this.discountPercent = null
			this.giftCodeInitialAmount = null
			this.giftCodeCurrentBalance = null
			await this.saveCartToServer()
		},

		async loadProductDetails() {
			if (this.items.length > 0) {
				try {
					const productIds = this.items.map((item) => item.product_id)
					const variantIds = this.items
						.filter((item): item is CartItem => 'variant_id' in item)
						.map((item) => item.variant_id)

					const res: any = await GqlGetCartProductsByIds({
						ids: productIds,
						variant_ids: variantIds,
					})

					const productsDetails = res.products || []
					this.itemsDetails = this.items.map((item) => {
						const detail = productsDetails.find(
							(p: any) => p.id === item.product_id,
						)
						if (detail) {
							return {
								...detail,
								type: item.type,
								quantity: 'quantity' in item ? item.quantity : 1,
								category: 'category' in item ? item.category : undefined,
							}
						}
						return {
							id: item.product_id,
							title: 'Подарочная карта',
							price: 'price' in item ? item.price : 0,
							image_id: 'image_id' in item ? item.image_id : '',
							type: item.type,
							quantity: 'quantity' in item ? item.quantity : 1,
							category: 'category' in item ? item.category : undefined,
						}
					})
				} catch (error) {
					console.error('Error loading product details:', error)
				}
			} else {
				this.itemsDetails = []
			}
		},

		async getRelatedProducts() {
			try {
				const products = await GqlRelatedProducts()
				this.relatedItems = products.products as any
				this.isRelatedProductPending = false
			} catch (error) {
				console.error('Error fetching related products:', error)
			}
		},

		async setDiscount() {
			const config = useRuntimeConfig()
			try {
				const res = (await fetch(config.public.databaseUrl + 'discount', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({code: this.discount}),
				}).then((res) => res.json())) as any

				this.discountPercent = res.data[0].percent
				this.discountErrors = {}
			} catch (error: any) {
				return (this.discountErrors = {
					status: 400,
					statusMessage: 'Скидка не найдена',
				})
			}
		},

		async setGiftCard() {
			const config = useRuntimeConfig()
			try {
				const res = (await fetch(config.public.databaseUrl + 'gift-card', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({code: this.giftCode}),
				}).then((res) => res.json())) as any

				this.giftCodeInitialAmount = parseFloat(res.data[0].initial_amount)
				this.giftCodeCurrentBalance = parseFloat(res.data[0].current_balance)
				const totalWithoutGiftCards = this.itemsDetails
					.filter((item) => item.type === 'product')
					.reduce(
						(sum, item) =>
							sum + item.product_variants[0]?.price * (item.quantity || 1),
						0,
					)
				this.giftCodeRemainingBalance =
					this.giftCodeCurrentBalance - totalWithoutGiftCards
				if (this.giftCodeRemainingBalance < 0) this.giftCodeRemainingBalance = 0
				this.giftCodeErrors = ''
			} catch (error: any) {
				this.giftCodeErrors = {
					status: 400,
					statusMessage: 'Подарочная карта не найдена',
				}
			}
		},

		async createCheckoutSession() {
			const sessionId = await this.getSessionId()
			if (!sessionId) {
				await this.initCart()
				return
			}

			const existingCheckoutSessionId =
				localStorage.getItem('checkoutSessionId')
			if (existingCheckoutSessionId) {
				try {
					const data = await GqlGetCheckoutSession({
						id: existingCheckoutSessionId,
					})

					const existingSession = data.checkout_sessions_by_id

					// Проверка, не истекла ли сессия
					if (
						existingSession &&
						new Date(existingSession.expires_at) > new Date()
					) {
						// Проверка, изменились ли данные в корзине
						const currentSessionData = {
							items: this.items,
							totalPrice: this.totalPriceWithDiscount,
							discount: this.discount,
							giftCode: this.giftCode,
							giftCodeCurrentBalance: this.giftCodeCurrentBalance,
							remainingGiftCardBalance: this.remainingGiftCardBalance,
						}

						if (
							JSON.stringify(currentSessionData) ===
							JSON.stringify(existingSession.session_data)
						) {
							return existingCheckoutSessionId // Возвращаем ID существующей активной сессии
						}
					}
				} catch (error) {
					console.error('Error reading existing checkout session:', error)
					localStorage.removeItem('checkoutSessionId') // Удаляем невалидную сессию
				}
			}

			try {
				const expiresAt = new Date(Date.now() + 30 * 60 * 1000).toISOString() // Сессия действительна в течение 30 минут

				const sessionData = {
					items: this.items,
					totalPrice: this.totalPriceWithDiscount,
					discount: this.discount,
					giftCode: this.giftCode,
					giftCodeCurrentBalance: this.giftCodeCurrentBalance,
					remainingGiftCardBalance: this.remainingGiftCardBalance,
				}

				const data = await GqlCreateCheckoutSession({
					session_data: sessionData,
					expires_at: expiresAt,
				})

				const newSessionId = data.create_checkout_sessions_item?.id as string
				localStorage.setItem('checkoutSessionId', newSessionId)
				return newSessionId
			} catch (error) {
				console.error('Error creating checkout session:', error)
			}
		},
	},
})
