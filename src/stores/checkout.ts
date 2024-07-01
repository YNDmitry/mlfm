export const useCheckoutStore = defineStore('checkoutStore', {
	state: () => ({
		items: null,
		deliveryType: 'delivery',
		otpCode: '',
		isOtpVisible: false,
		promoCode: null,
		giftCard: null,
	}),
	actions: {},
})
