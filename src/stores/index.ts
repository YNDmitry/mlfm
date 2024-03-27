import {createItem} from '@directus/sdk'

export const useWebsiteStore = defineStore('websiteStore', {
	state: () => ({
		isVisibleCart: false,
		isNewsletterPopup: false,
		isNewsletterFormSubmitted: false,
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

		async handleNewsletterSubscribe(values: {footerEmail: string}) {
			const {$directus} = useNuxtApp()
			await $directus
				.request(
					createItem('newsletter_list', {
						email: values.footerEmail,
					}),
				)
				.then((result) => {
					this.isNewsletterFormSubmitted = true
				})
		},

		async getConfig() {
			const {getItems} = useDirectusItems()
			return await getItems({
				collection: 'site',
				params: {
					fields: [
						'meta_title',
						'meta_description',
						'meta_thumbnail',
						'general_message',
						'current_phone_number',
						'current_address',
						'current_email',
						'current_whatsapp',
					],
				},
			})
		},
	},
})
