import {defineStore} from 'pinia'

export const useCartStore = defineStore('userCart', {
	state: () => ({
		items: [],
	}),
	actions: {
		// Инициализация корзины из localStorage или синхронизация с сервером
		initCart() {
			const authStore = useUserStore()
			if (authStore.isAuthenticated) {
				// Загрузить корзину из сервера
				this.loadCartFromServer()
			} else {
				// Загрузить корзину из localStorage
				this.loadCartFromLocalStorage()
			}
		},

		loadCartFromLocalStorage() {
			const cart = localStorage.getItem('cart')
			if (cart) {
				this.items = JSON.parse(cart)
			}
		},

		async loadCartFromServer() {
			try {
				const response = await apiClient.get('/customer_cart')
				this.items = response.data
			} catch (error) {
				console.error('Error loading cart from server:', error)
			}
		},

		saveCart() {
			const authStore = useUserStore()
			if (authStore.isAuthenticated) {
				// Сохранить корзину на сервер
				this.saveCartToServer()
			} else {
				// Сохранить корзину в localStorage
				localStorage.setItem('cart', JSON.stringify(this.items))
			}
		},

		async saveCartToServer() {
			try {
				// await apiClient.post('/customer_cart', this.items)
			} catch (error) {
				console.error('Error saving cart to server:', error)
			}
		},

		addItem(item) {
			// Логика добавления товара, затем сохраняем корзину
			const existingItem = this.items.find((i) => i.id === item.id)
			if (existingItem) {
				existingItem.quantity += 1 // Assumes quantity field. Adjust as necessary.
			} else {
				this.items.push({...item, quantity: 1}) // Add new item with a quantity of 1
			}
			this.saveCart()
		},

		removeItem(itemId) {
			// Логика удаления товара, затем сохраняем корзину
			const index = this.items.findIndex((i) => i.id === itemId)
			if (index !== -1) {
				this.items.splice(index, 1)
			}
			this.saveCart()
		},
	},
})
