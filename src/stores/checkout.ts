export const useCheckoutStore = defineStore('checkoutStore', {
	state: () => ({
		items: null,
		deliveryType: 'delivery',
		otpCode: '',
		isOtpVisible: false,
		promoCode: null,
		giftCard: null,
		otpResendTimeout: 60,
		resendInterval: null,
		paymentMethod: 'spb',
	}),
	getters: {
		isResendDisabled(state) {
			return state.otpResendTimeout > 0
		},
	},
	actions: {
		startResendTimer() {
			this.otpResendTimeout = 60 // 60 секунд
			if (this.resendInterval) clearInterval(this.resendInterval) // Очищаем предыдущий интервал, если он есть
			this.resendInterval = setInterval(() => {
				if (this.otpResendTimeout > 0) {
					this.otpResendTimeout--
				} else {
					clearInterval(this.resendInterval)
				}
			}, 1000)
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
			if (!this.isResendDisabled) {
				this.startResendTimer() // Перезапускаем таймер после отправки
			}
		},
		clearResendInterval() {
			if (this.resendInterval) clearInterval(this.resendInterval) // Очищаем интервал
		},
	},
})
