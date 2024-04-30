import {defineStore} from 'pinia'

export const useWishlistStore = defineStore('wishlist', {
	state: () => ({
		wishlist: new Set<string>(), // Using a Set to ensure unique IDs
		productDetails: [] as any[],
	}),
	getters: {
		isOnWishlist: (state) => {
			return (productId: string) => state.wishlist.has(productId)
		},
	},
	actions: {
		async initWishlist() {
			if (typeof window === 'undefined') {
				return // Exit if on server side
			}
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
			await this.loadWishlistFromServer(sessionId)
		},

		async loadWishlistFromServer(sessionId) {
			try {
				const res = await GqlGetSession({id: sessionId})
				const items = res.guest_session_by_id.temp_wishlist || []
				this.wishlist = new Set(items)
				await this.loadProductDetails()
			} catch (error) {
				console.error('Error loading wishlist from server:', error)
			}
		},

		async loadProductDetails() {
			if (this.wishlist.size > 0) {
				try {
					const res = await GqlGetProductsByIds({
						ids: Array.from(this.wishlist),
					})
					this.productDetails = res.products || []
				} catch (error) {
					console.error('Error loading product details:', error)
				}
			} else {
				this.productDetails = [] // Clear details if wishlist is empty
			}
		},

		async saveWishlistToServer() {
			const sessionId = localStorage.getItem('sessionId')
			if (!sessionId) return // Exit if no session ID available

			try {
				await GqlUpdateGuestSessionItem({
					id: sessionId,
					data: {
						temp_wishlist: Array.from(this.wishlist),
					},
				})
			} catch (error) {
				console.error('Error saving wishlist to server:', error)
			}
		},

		async addItemToWishlist(productId: string) {
			const sessionId = localStorage.getItem('sessionId')
			if (!sessionId) {
				await this.initWishlist() // Initialize the wishlist if session is not found
				return
			}

			this.wishlist.add(productId)
			await this.saveWishlistToServer()
		},

		async removeItemFromWishlist(productId: string) {
			this.wishlist.delete(productId)
			await this.saveWishlistToServer()
		},
	},
})
