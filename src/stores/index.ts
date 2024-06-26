import {createItem} from '@directus/sdk'
import type {Config} from '~/types/config.interface'

export interface INewsletterList {
	email: string
}

export const useWebsiteStore = defineStore('websiteStore', {
	state: () => ({
		isVisibleCart: false,
		isNewsletterPopup: false,
		isNewsletterFormSubmitted: false,
		isSearchPopup: false,
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
		// Toggles the visibility of the cart popup.
		handleVisibleCart(): void {
			this.isVisibleCart = !this.isVisibleCart
		},

		// Toggles the visibility of the search popup.
		handleVisibleSearch(): void {
			this.isSearchPopup = !this.isSearchPopup
		},

		async handleNewsletterSubscribe(values: {
			footerEmail: string
		}): Promise<void> {
			const {$directus} = useNuxtApp()
			await $directus
				.request(
					createItem('newsletter_list', {
						email: values.footerEmail,
					} as INewsletterList),
				)
				.then((result) => {
					this.isNewsletterFormSubmitted = true
				})
		},

		async getConfig() {
			const {getItems} = useDirectusItems()
			const response = await getItems({
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
			this.siteSettings = response as unknown as Config
			return response as unknown
		},
	},
})
