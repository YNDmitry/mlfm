export const useWebsiteStore = defineStore('websiteStore', {
	state: () => ({
		name: '',
		description: '',
		isVisibleCart: false,
	}),
	actions: {
		handleVisibleCart() {
			this.isVisibleCart = true
		},
	},
})
