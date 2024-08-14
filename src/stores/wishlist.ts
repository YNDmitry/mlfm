import {defineStore} from 'pinia'

interface ProductDetails {
	id: string
}

interface WishlistItem {
	product_id: string
}

export const useWishlistStore = defineStore('wishlist', {
	state: () => ({
		wishlist: new Set<WishlistItem>(),
		productDetails: [] as ProductDetails[],
	}),
	getters: {
		isOnWishlist: (state) => {
			return (productId: string) =>
				Array.from(state.wishlist).some((item) => item.product_id === productId)
		},
	},
	actions: {
		async checkOrCreateSession() {
			let sessionId = localStorage.getItem('sessionId')
			if (sessionId === null) {
				try {
					const res = await GqlCreateGuestSessionItem({
						data: {status: 'draft'},
					})
					sessionId = res?.create_guest_session_item?.id as string
					localStorage.setItem('sessionId', sessionId)
				} catch (error) {
					console.error('Failed to initialize session:', error)
				}
			}
			return sessionId
		},

		async initWishlist() {
			if (typeof window === 'undefined') return // Exit if on server side

			try {
				const sessionId = await this.checkOrCreateSession()
				if (sessionId) {
					await this.loadWishlistFromServer(sessionId)
				}
			} catch (error) {
				console.error('Failed to initialize wishlist:', error)
			}
		},

		async loadWishlistFromServer(sessionId: string) {
			try {
				const res: any = await GqlGetSession({id: sessionId})
				const items = res?.guest_session_by_id?.temp_wishlist || []
				this.wishlist = new Set(items)
				await this.loadProductDetails()
			} catch (error) {
				console.error('Error loading wishlist from server:', error)
			}
		},

		async loadProductDetails() {
			const productIds = Array.from(this.wishlist).map(
				(item) => item.product_id,
			)
			if (productIds.length > 0) {
				try {
					const res: any = await GqlGetProductsByIds({ids: productIds})
					this.productDetails = res.products || []
				} catch (error) {
					console.error('Error loading product details:', error)
				}
			} else {
				this.productDetails = []
			}
		},

		async saveWishlistToServer() {
			const sessionId = await this.checkOrCreateSession()
			if (!sessionId) return

			try {
				await GqlUpdateGuestSessionItem({
					id: sessionId,
					data: {
						temp_wishlist: Array.from(this.wishlist),
					},
				})
			} catch (error) {
				if (sessionId) {
					localStorage.removeItem('sessionId')
				}
				console.error('Error saving wishlist to server:', error)
			}
		},

		async addItemToWishlist(productId: string) {
			this.wishlist.add({product_id: productId})
			await this.saveWishlistToServer()
			await this.loadProductDetails() // Refresh product details after adding an item
		},

		async removeItemFromWishlist(productId: string) {
			this.wishlist.forEach((item) => {
				if (item.product_id === productId) {
					this.wishlist.delete(item)
				}
			})
			await this.saveWishlistToServer()
			await this.loadProductDetails() // Refresh product details after adding an item
		},
	},
})
