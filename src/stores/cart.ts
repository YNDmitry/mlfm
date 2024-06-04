import {defineStore} from 'pinia'

interface CartItem {
	product_id: string
	quantity: number
	variant_id: string
}

interface GiftCard {
	product_id: string
	price: number
	image_id: string
	title: string
	category: string
}

// Union type for all cart items
type CartItemUnion = CartItem | GiftCard

export const useCartStore = defineStore('userCart', {
	state: () => ({
		items: [] as CartItemUnion[],
		itemsDetails: [],
		relatedItems: [],
		discount: '',
		discountPercent: null,
		discountErrors: '',
		isRelatedProductPending: true,
	}),
	getters: {
		totalPrice: (state) => {
			return state.itemsDetails.reduce((total, item) => {
				if ('quantity' in item) {
					return total + item.price * item.quantity
				}
				return total + item.price // Assume quantity is 1 for gift cards
			}, 0)
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

					this.itemsDetails = res.products || []
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
				this.discountErrors = ''
			} catch (error: any) {
				return (this.discountErrors = {
					status: 400,
					statusMessage: 'Скидка не найдена',
				})
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
							totalPrice: this.totalPrice,
							discount: this.discount,
						}

						console.log(
							'Current session data:',
							JSON.stringify(currentSessionData),
						)
						console.log(
							'Existing session data:',
							JSON.stringify(existingSession.session_data),
						)

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
					totalPrice: this.totalPrice,
					discount: this.discount,
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
