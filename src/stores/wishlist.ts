import {defineStore} from 'pinia'

export const useWishlistStore = defineStore('userWishlist', {
	state: () => ({
		items: [],
	}),
	actions: {
		// Инициализация списка желаемого из localStorage или синхронизация с сервером
		initWishlist() {
			const authStore = useUserStore()
			if (authStore.isAuthenticated) {
				// Загрузить список желаемого из сервера
				this.loadWishlistFromServer()
			} else {
				// Загрузить список желаемого из localStorage
				this.loadWishlistFromLocalStorage()
			}
		},

		loadWishlistFromLocalStorage() {
			const wishlist = localStorage.getItem('wishlist')
			if (wishlist) {
				this.items = JSON.parse(wishlist)
			}
		},

		async loadWishlistFromServer() {
			try {
				const response = await apiClient.get('/customer_wishlist')
				this.items = response.data
			} catch (error) {
				console.error('Error loading wishlist from server:', error)
			}
		},

		saveWishlist() {
			const authStore = useUserStore()
			if (authStore.isAuthenticated) {
				// Сохранить список желаемого на сервер
				this.saveWishlistToServer()
			} else {
				// Сохранить список желаемого в localStorage
				localStorage.setItem('wishlist', JSON.stringify(this.items))
			}
		},

		async saveWishlistToServer() {
			try {
				await apiClient.post('/customer_wishlist', this.items)
			} catch (error) {
				console.error('Error saving wishlist to server:', error)
			}
		},

		addItem(item) {
			// Логика добавления товара в список желаемого
			const existingItem = this.items.find((i) => i.id === item.id)
			if (existingItem) {
				existingItem.quantity += 1 // Assumes quantity field. Adjust as necessary.
			} else {
				this.items.push({...item, quantity: 1}) // Add new item with a quantity of 1
			}
			this.saveWishlist()
		},

		removeItem(itemId) {
			// Логика удаления товара из списка желаемого
			const index = this.items.findIndex((i) => i.id === itemId)
			if (index !== -1) {
				this.items.splice(index, 1)
			}
			this.saveWishlist()
		},
	},
})
