export const useCheckoutStore = defineStore('checkoutStore', {
	state: () => ({
		items: null || [],
		deliveryType: 'delivery',
		otpCode: '',
		isOtpVisible: false,
		promoCode: null,
		giftCard: null,
		paymentMethod: 'bank_card',
		isSubmitting: false,
		orderModel: {
			email: '',
			otpCode: '',
			orderDetails: {
				comment: '',
				delivery_type: '',
				items: [],
				discount: null,
				gift_card_code: null,
				address_json: null,
			},
			userDetails: {
				first_name: '',
				last_name: '',
				patronymic: '',
				phone: '',
			},
			paymentMethod: '',
			checkout_session_id: '',
		},
	}),
	actions: {
		handleDeliveryType() {
			if (this.deliveryType !== 'self-delivery') {
				return this.deliveryType === 'self-delivery'
			}
			return this.deliveryType === 'delivery'
		},

		async sendCode(email: string) {
			const config = useRuntimeConfig()
			this.isSubmitting = true
			try {
				const res = await fetch(config.public.databaseUrl + 'order/send-otp', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						email: email,
					}),
				})
				const data = await res.json()

				// Проверяем успех ответа
				if (res.ok) {
					return data
				} else {
					console.log('Ошибка отправки кода:', data)
					throw new Error(data.message || 'Ошибка при отправке OTP')
				}
			} catch (error) {
				console.error('Ошибка при отправке кода:', error)
				return null
			} finally {
				this.isSubmitting = false
			}
		},

		updateOrderModel(formData: any) {
			this.orderModel.email = formData.email
			this.orderModel.orderDetails.comment = formData.comment
			this.orderModel.orderDetails.delivery_type = this.deliveryType
			this.orderModel.orderDetails.items = this.items

			// Обработка промокода и подарочной карты
			if (this.promoCode) {
				this.orderModel.orderDetails.discount = this.promoCode
			} else {
				delete this.orderModel.orderDetails.discount
			}

			if (this.giftCard) {
				this.orderModel.orderDetails.gift_card_code = this.giftCard
			} else {
				delete this.orderModel.orderDetails.gift_card_code
			}

			// Если доставка — добавляем адрес
			if (this.deliveryType === 'delivery') {
				this.orderModel.orderDetails.address_json = [
					{
						city: formData.city,
						street: formData.street,
						home: formData.home,
						entrance: formData.entrance,
						apartment: formData.apartment,
					},
				]
			}

			// Обновляем данные пользователя
			this.orderModel.userDetails = {
				first_name: formData.firstName,
				last_name: formData.lastName,
				patronymic: formData.thirdName,
				phone: formData.phone,
			}

			this.orderModel.paymentMethod = this.paymentMethod
			this.orderModel.checkout_session_id = formData.checkout_session_id
		},

		// Метод отправки заказа
		async submitOrder() {
			const config = useRuntimeConfig()
			try {
				const res = await fetch(config.public.databaseUrl + 'order/create', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(this.orderModel),
				})

				const data = await res.json()
				if (res.ok) {
					window.location = data.returnUrl
					return data
				} else {
					throw new Error(data.errors?.[0]?.message || 'Ошибка создания заказа')
				}
			} catch (error) {
				console.error('Ошибка создания заказа:', error)
				return null
			}
		},
	},
})
