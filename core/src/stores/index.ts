import {createItem} from '@directus/sdk'
import type {Config} from '../types/config.interface'

export interface INewsletterList {
	email: string
}

export const useWebsiteStore = defineStore('websiteStore', {
	state: () => ({
		isVisibleCart: false,
		isNewsletterPopup: false,
		isNewsletterFormSubmitted: false,
		isSearchPopup: false,
		siteSettings: {} as Config,
		toastInstance: null as any,
	}),
	actions: {
		setToastInstance(toast: any) {
			this.toastInstance = toast
		},

		showToast({severity = 'info', summary = '', detail = '', life = 3000}) {
			if (this.toastInstance) {
				this.toastInstance.add({
					severity,
					summary,
					detail,
					life,
				})
			}
		},

		// Toggles the visibility of the cart popup.
		handleVisibleCart(): void {
			this.isVisibleCart = !this.isVisibleCart
		},

		// Toggles the visibility of the search popup.
		handleVisibleSearch(): void {
			this.isSearchPopup = !this.isSearchPopup
		},

		async handleNewsletterSubscribe(email: string): Promise<void> {
			const {$directus} = useNuxtApp()
			await $directus
				.request(
					createItem('newsletter_list', {
						email: email,
					} as INewsletterList),
				)
				.then((result) => {
					this.isNewsletterFormSubmitted = true
				})
		},

		async getConfig() {
			const response = await useAsyncGql(
				'GlobalConfig',
				{},
				{
					getCachedData(key, nuxtApp) {
						return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
					},
				},
			)

			this.siteSettings = response.data?.value?.site as unknown as Config
			return response.data.value as unknown
		},
	},
})
