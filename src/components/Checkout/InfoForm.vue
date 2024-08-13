<script setup lang="ts">
	import {boolean, object, string} from 'yup'

	const checkoutStore = useCheckoutStore()
	const config = useRuntimeConfig()

	const formValues = ref('')
	const isError = ref(false)
	const isOtpSubmit = ref(false)
	const otpResendTimeout = ref(0)
	const toast = useToast()

	const schema = object({
		firstName: string().required('Обязательное поле'),
		lastName: string().required('Обязательное поле'),
		thirdName: string().required('Обязательное поле'),
		email: string()
			.email('Введите валидный email')
			.required('Обязательное поле'),
		phone: string()
			.matches(/^\+7 \(\d{3}\) \d{3} \d{2}-\d{2}$/, 'Обязательное поле')
			.required('Обязательное поле'),
		deliveryType: string()
			.oneOf(['delivery', 'self-delivery'])
			.default('delivery')
			.notRequired(),
		city: string().when('deliveryType', {
			is: (value: string) => value === 'delivery',
			then: () => string().required('Обязательное поле'),
			otherwise: () => string().notRequired(),
		}),
		street: string().when('deliveryType', {
			is: (value: string) => value === 'delivery',
			then: () => string().required('Обязательное поле'),
			otherwise: () => string().notRequired(),
		}),
		home: string().when('deliveryType', {
			is: (value: string) => value === 'delivery',
			then: () => string().required('Обязательное поле'),
			otherwise: () => string().notRequired(),
		}),
		entrance: string().when('deliveryType', {
			is: (value: string) => value === 'delivery',
			then: () => string().required('Обязательное поле'),
			otherwise: () => string().notRequired(),
		}),
		apartment: string().when('deliveryType', {
			is: (value: string) => value === 'delivery',
			then: () => string().required('Обязательное поле'),
			otherwise: () => string().notRequired(),
		}),
		postCode: string().when('deliveryType', {
			is: (value: string) => value === 'delivery',
			then: () => string().required('Обязательное поле'),
			otherwise: () => string().notRequired(),
		}),
		comment: string(),
		paymentMethod: string().oneOf([
			'sbp',
			'bank_card',
			'installments',
			'sberbank',
			'tinkoff_bank',
		]),
		offer: boolean()
			.required('Нужно обязательно подтвердить')
			.oneOf([true], 'Нужно обязательно подтвердить'),
	})

	const {isSubmitting, handleSubmit, submitCount} = useForm({
		validationSchema: schema,
		initialValues: {
			deliveryType: 'delivery',
			offer: false,
		},
	})

	const {value: email} = useField('email')
	const {value: phone} = useField('phone')
	const {value: comment} = useField('comment')
	const {value: firstName} = useField('firstName')
	const {value: lastName} = useField('lastName')
	const {value: thirdName} = useField('thirdName')
	const {value: city} = useField('city')
	const {value: street} = useField('street')
	const {value: home} = useField('home')
	const {value: entrance} = useField('entrance')
	const {value: apartment} = useField('apartment')

	const {pause, resume} = useIntervalFn(() => {
		if (otpResendTimeout.value > 0) {
			otpResendTimeout.value--
		} else {
			pause()
		}
	}, 1000)

	const submitForm = handleSubmit(async (values: any) => {
		try {
			if (submitCount.value === 1) {
				await checkoutStore.sendCode(email.value as string)
				otpResendTimeout.value = 60
				resume()
			}
			checkoutStore.isOtpVisible = true
			formValues.value = values
			updateOrderModel()
		} catch (error) {
			throw createError({
				status: 401,
				statusMessage: 'Что-то пошло не так',
			})
		}
	})

	const orderModel = ref({
		email: email.value,
		otpCode: checkoutStore.otpCode,
		orderDetails: {
			comment: comment.value,
			delivery_type: checkoutStore.deliveryType,
			items: checkoutStore.items,
		},
		userDetails: {
			first_name: firstName.value,
			last_name: lastName.value,
			patronymic: thirdName.value,
			phone: phone.value,
		},
		paymentMethod: checkoutStore.paymentMethod,
		checkout_session_id: useRoute().params.id,
	})

	function updateOrderModel() {
		orderModel.value.email = email.value
		orderModel.value.otpCode = checkoutStore.otpCode
		orderModel.value.orderDetails.comment = comment.value
		orderModel.value.orderDetails.delivery_type = checkoutStore.deliveryType
		orderModel.value.orderDetails.items = checkoutStore.items

		// Добавляем discount только если он есть
		if (checkoutStore.promoCode) {
			orderModel.value.orderDetails.discount = checkoutStore.promoCode
		} else {
			delete orderModel.value.orderDetails.discount
		}

		// Добавляем gift_card_code только если он есть
		if (checkoutStore.giftCard) {
			orderModel.value.orderDetails.gift_card_code = checkoutStore.giftCard
		} else {
			delete orderModel.value.orderDetails.gift_card_code
		}

		if (checkoutStore.deliveryType === 'delivery') {
			orderModel.value.orderDetails.address_json = [
				{
					city: city.value,
					street: street.value,
					home: home.value,
					entrance: entrance.value,
					apartment: apartment.value,
				},
			]
		}

		orderModel.value.userDetails.first_name = firstName.value
		orderModel.value.userDetails.last_name = lastName.value
		orderModel.value.userDetails.patronymic = thirdName.value
		orderModel.value.userDetails.phone = phone.value
		orderModel.value.paymentMethod = checkoutStore.paymentMethod
		orderModel.value.checkout_session_id = useRoute().params.id
	}

	const submitOtp = async () => {
		isOtpSubmit.value = true
		updateOrderModel()

		await fetch(config.public.databaseUrl + 'order/create', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(orderModel.value),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.success) {
					isOtpSubmit.value = false
					window.location.href = data.paymentUrl
				} else {
					toast.add({
						severity: 'warn',
						summary: 'Ошибка',
						detail: data.message,
						life: 10000,
					})
				}
			})
			.catch(() => {
				isOtpSubmit.value = false
				isError.value = true
			})
	}

	const sendCode = () => {
		checkoutStore.sendCode(email.value as string)
		otpResendTimeout.value = 60
		updateOrderModel()
		resume()
	}

	const isOnlyVirtual = ref(false)

	onMounted(() => {
		const gift = checkoutStore.items.filter(
			(item: any) =>
				item.type === 'gift-card' && item.category === 'Виртуальная',
		)
		if (checkoutStore.items.length === 1 && gift.length === 1) {
			checkoutStore.deliveryType = 'self-delivery'
			return (isOnlyVirtual.value = true)
		} else {
			return (isOnlyVirtual.value = false)
		}
	})
</script>

<template>
	<div class="pb-[3.75rem]">
		<Toast :position="'top-right'" />
		<div class="container laptop:max-w-[512px]">
			<Dialog
				modal
				v-model:visible="checkoutStore.isOtpVisible"
				:pt="{icons: 'hidden', root: 'max-tablet:w-[95%]'}"
			>
				<div class="flex-column align-items-center flex flex-col text-center">
					<div class="text-xl mb-2 font-bold">Подтвердите свою почту</div>
					<p class="text-color-secondary mb-5 block">
						Пожалуйста, введите код который был выслан вам на почту
					</p>
					<InputOtp
						v-model="checkoutStore.otpCode"
						:length="6"
						integerOnly
						:pt="{root: 'justify-center', input: 'h-12'}"
					>
						<template #default="{attrs, events, index}">
							<input
								type="text"
								v-bind="attrs"
								v-on="events"
								class="h-10 w-10 rounded-[0.5rem] border-2 border-gray2 text-center focus:outline-none"
							/>
						</template>
					</InputOtp>
					<div
						class="justify-content-between align-self-stretch mt-5 flex flex-col"
					>
						<div class="flex">
							<button
								@click="sendCode"
								:disabled="otpResendTimeout > 0 || isError"
								class="w-full text-[0.7rem] disabled:pointer-events-none disabled:opacity-50 max-tablet:min-h-[1.875rem] max-tablet:rounded-[1.25rem] max-tablet:text-[0.625rem] tablet:min-h-[35px] tablet:rounded-[1.875rem]"
							>
								Отправить код заново
							</button>
							<button
								:disabled="
									checkoutStore.otpCode.length < 6 ? true : false || isError
								"
								type="submit"
								@click="submitOtp"
								class="w-full bg-red2 text-primary transition-colors hover:bg-red2-hover disabled:pointer-events-none disabled:opacity-50 max-tablet:min-h-[1.875rem] max-tablet:rounded-[1.25rem] max-tablet:text-[0.625rem] tablet:min-h-[45px] tablet:rounded-[1.875rem]"
							>
								<ProgressSpinner
									aria-label="Loading..."
									style="width: 20px; height: 20px"
									:pt="{
										root: 'mx-0 absolute left-[2rem]',
										circle: '!stroke-[#ffffff]',
									}"
									v-if="isOtpSubmit"
								/>
								Подтвердить
							</button>
						</div>
						<p v-if="otpResendTimeout > 0" class="mt-2 text-[0.7rem]">
							Повторно отправить код можно через
							{{ otpResendTimeout }} секунд
						</p>
						<p v-if="isError" class="text-red2">
							Что-то пошло не так. Пожалуйста, попробуйте создать заказ позже
						</p>
					</div>
				</div>
			</Dialog>
			<form @submit.prevent="submitForm" class="pt-8">
				<CheckoutFields />
				<CheckoutDeliveryOptions v-if="!isOnlyVirtual" />
				<CheckoutDeliveryAddress
					v-if="checkoutStore.deliveryType === 'delivery'"
				/>
				<CheckoutOrderComment />
				<CheckoutPaymentMethod />
				<CheckoutSubmitButton :isSubmitting="isSubmitting" />
			</form>
		</div>
	</div>
</template>
