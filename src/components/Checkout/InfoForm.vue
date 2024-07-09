<script setup lang="ts">
	import {boolean, object, string} from 'yup'

	const checkoutStore = useCheckoutStore()
	const config = useRuntimeConfig()

	const schema = object({
		firstName: string().required('Обязательное поле'),
		lastName: string().required('Обязательное поле'),
		thirdName: string(),
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

	const {isSubmitting, handleSubmit} = useForm({
		validationSchema: schema,
		initialValues: {
			deliveryType: 'delivery',
			offer: false,
		},
	})

	const {value: email} = useField('email')
	const {value: comment} = useField('comment')
	const {value: firstName} = useField('firstName')
	const {value: lastName} = useField('lastName')
	const {value: thirdName} = useField('thirdName')

	const formValues = ref('')
	const submitForm = handleSubmit(async (values: any) => {
		try {
			await checkoutStore.sendCode(email.value)
			checkoutStore.isOtpVisible = true
			formValues.value = values
		} catch (error) {
			throw createError({
				status: 401,
				statusMessage: 'Что-то пошло не так',
			})
		}
	})

	const isError = ref(false)
	const isOtpSubmit = ref(false)
	const submitOtp = async () => {
		isOtpSubmit.value = true
		await fetch(config.public.databaseUrl + 'order/create', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: email.value,
				otpCode: checkoutStore.otpCode,
				orderDetails: {
					comment: comment.value,
					status: 'created',
					delivery_type: checkoutStore.deliveryType,
					items: checkoutStore.items,
					promoCode: checkoutStore.promoCode || null,
					giftCardCode: checkoutStore.giftCard || null,
				},
				userDetails: {
					first_name: firstName.value,
					last_name: lastName.value,
					third_name: thirdName.value,
				},
				paymentMethod: checkoutStore.paymentMethod,
				checkout_session_id: useRoute().params.id,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				isOtpSubmit.value = false
				console.log(data)
			})
			.catch(() => {
				isOtpSubmit.value = false
				isError.value = true
			})
	}

	const sendCode = () => {
		checkoutStore.sendCode(email.value)
	}
</script>

<template>
	<div class="pb-[3.75rem]">
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
								:disabled="checkoutStore.isResendDisabled || isError"
								class="w-full text-[0.7rem] transition-colors hover:bg-red2-hover disabled:pointer-events-none disabled:opacity-50 max-tablet:min-h-[1.875rem] max-tablet:rounded-[1.25rem] max-tablet:text-[0.625rem] tablet:min-h-[35px] tablet:rounded-[1.875rem]"
							>
								Отправить код заново
							</button>
							<button
								:disabled="
									checkoutStore.otpCode.length < 6 ? true : false || isError
								"
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
						<p
							v-if="checkoutStore.isResendDisabled || !isError"
							class="mt-2 text-[0.7rem]"
						>
							Можно отправить код через
							{{ checkoutStore.otpResendTimeout }} секунд
						</p>
						<p v-if="isError" class="text-red2">
							Что-то пошло не так. Пожалуйста, попробуйте создать заказ позже
						</p>
					</div>
				</div>
			</Dialog>
			<form @submit.prevent="submitForm" class="pt-8">
				<CheckoutFields />
				<CheckoutDeliveryOptions />
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
