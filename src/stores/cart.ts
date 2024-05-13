import {defineStore} from 'pinia'

interface CartItem {
	product_id: string
	price: number | null
	quantity: number
	category: string
	color_id?: string | number
	size_id?: string | number
	image_id: string
	title: string
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
		relatedItems: [],
		discount: '',
		isRelatedProductPending: true,
	}),
	getters: {
		totalPrice: (state) => {
			return state.items.reduce((total, item) => {
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
				this.loadCartFromServer(sessionId)
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
					i.color_id === item.color_id &&
					i.size_id === item.size_id,
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

		async getRelatedProducts() {
			try {
				const products = await GqlRelatedProducts()
				this.relatedItems = products.products as any
				this.isRelatedProductPending = false
			} catch (error) {
				console.error('Error fetching related products:', error)
			}
		},
	},
})
