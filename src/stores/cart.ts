import {defineStore} from 'pinia'

interface CartItem {
	product_id: string
	price: number
	quantity: number
	category: string
	color_id: string | number
	size_id: string | number
	image_id: string
	title: string
}

export const useCartStore = defineStore('userCart', {
	state: () => ({
		items: [] as CartItem[],
		relatedItems: null as any,
		discount: '',
		isRelatedProductPending: true,
	}),
	getters: {
		totalPrice: (state) => {
			const price = state.items.reduce(
				(total, item) => total + item.price * item.quantity,
				0,
			)
			return new Intl.NumberFormat('ru-RU', {
				style: 'currency',
				currency: 'RUB',
			}).format(price)
		},
	},
	actions: {
		async initCart() {
			let sessionId = localStorage.getItem('sessionId')
			if (!sessionId) {
				try {
					const res = await GqlCreateGuestSessionItem({data: {status: 'draft'}})
					sessionId = res.create_guest_session_item?.id
					localStorage.setItem('sessionId', sessionId)
				} catch (error) {
					console.error('Error during session initialization:', error)
				}
			}
			this.loadCartFromServer(sessionId)
			await callOnce(() => {
				this.getRelatedProducts()
			})
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
			const sessionId = localStorage.getItem('sessionId')
			if (!sessionId) return // Exit if no session ID available

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

		async addItem(item: CartItem) {
			const sessionId = localStorage.getItem('sessionId')
			if (!sessionId) {
				await this.initCart() // Initialize the cart if session is not found
				return
			}

			const existingItem = this.items.find(
				(i) =>
					i.product_id === item.product_id &&
					i.color_id === item.color_id &&
					i.size_id === item.size_id,
			)
			if (existingItem) {
				existingItem.quantity += item.quantity
			} else {
				this.items.push(item)
			}

			await this.saveCartToServer()
		},

		updateItemQuantity(itemId: number, newQuantity: number) {
			const item = this.items.find((i) => i.id === itemId)
			if (item) {
				item.quantity = newQuantity
				this.saveCartToServer()
			}
		},

		removeItem(itemId: number) {
			const index = this.items.findIndex((i) => i.id === itemId)
			if (index !== -1) {
				this.items.splice(index, 1)
				this.saveCartToServer()
			}
		},

		removeCart() {
			this.items = []
			this.discount = ''
			this.saveCartToServer()
		},

		async getDiscount(string: string) {
			try {
				const res = await GqlDiscount({
					discount: string,
				})
				console.log(res.discounts.length)
			} catch (error) {
				console.error('Error verifying discount:', error)
			}
		},

		async getRelatedProducts() {
			try {
				const products = await GqlRelatedProducts()
				this.relatedItems = products.products
				this.isRelatedProductPending = false
			} catch (error) {
				console.error('Error fetching related products:', error)
			}
		},
	},
})
