export const useWebsiteStore = defineStore('websiteStore', {
	state: () => ({
		isVisibleCart: false,
		siteSettings: {
			meta_title: '',
			meta_description: '',
			meta_thumbnail: '',
			current_phone_number: '',
			general_message: '',
			current_address: '',
			current_email: '',
			current_whatsapp: '',
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
