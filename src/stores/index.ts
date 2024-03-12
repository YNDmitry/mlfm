export const useWebsiteStore = defineStore('websiteStore', {
	state: () => ({
		isVisibleCart: false,
		siteSettings: {
			meta_title: '',
			meta_description: '',
			meta_thumbnail: '',
			current_phone_number: '',
			general_message: '',
		},
	}),
	actions: {
		/**
		 * Toggles the visibility of the cart popup.
		 */
		handleVisibleCart() {
			this.isVisibleCart = !this.isVisibleCart
		},
	},
})
