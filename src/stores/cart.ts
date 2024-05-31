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
				return Intl.NumberFormat('ru-RU', {
					style: 'currency',
					currency: 'RUB',
				}).format(total + item.price) // Assume quantity is 1 for gift cards
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

			const existingItem = this.items.find(
				(i) => i.product_id === item.product_id,
			)
			if (existingItem) {
				// const toast = useToast()
				// toast.error(
				// 	'Item already in cart. Remove it first if you want to change.',
				// )
				console.log(
					'Item already in cart. Remove it first if you want to change.',
				)
			} else {
				this.items.push(item)
				await this.saveCartToServer()
			}
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
				if (
					existingItem.quantity === 1 &&
					existingItem.variant_id === '1' &&
					item.quantity === 1
				) {
					console.log(
						'Cannot add more of this item to the cart as it already has quantity 1 and variant_id 1.',
					)
				} else {
					existingItem.quantity += item.quantity
					await this.saveCartToServer()
				}
			} else {
				this.items.push(item)
				await this.saveCartToServer()
			}
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
			const productIds = Array.from(this.items).map((item) => item.product_id)
			const productPvi = Array.from(this.items).map(
				(item) => item.variant_id,
			)[0]
			const productQuantity = Array.from(this.items).map(
				(item) => item.quantity,
			)[0]

			if (productIds.length > 0) {
				try {
					const res: any = await GqlGetCartProductsByIds({
						ids: productIds,
						pvi: productPvi,
						quantity: productQuantity,
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
	},
})
