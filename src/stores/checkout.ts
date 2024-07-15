export const useCheckoutStore = defineStore('checkoutStore', {
	state: () => ({
		items: null,
		deliveryType: 'delivery',
		otpCode: '',
		isOtpVisible: false,
		promoCode: null,
		giftCard: null,
		paymentMethod: 'bank_card',
	}),
	actions: {
		handleDeliveryType() {
			if (this.$state.deliveryType !== 'self-delivery') {
				return this.$state.deliveryType === 'self-delivery'
			}
			return this.$state.deliveryType === 'delivery'
		},
		async sendCode(email: string) {
			const config = useRuntimeConfig()
			await fetch(config.public.databaseUrl + 'order/send-otp', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: email,
				}),
			}).then((res) => res.json())
		},
	},
})
