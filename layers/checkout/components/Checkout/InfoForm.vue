<script setup lang="ts">
	import {useWebsiteStore} from '~~/core/src/stores'
	import {useCheckoutForm} from '../../composables/useCheckoutForm'
	import {useOtpTimer} from '../../composables/useOtpTimer'
	import {useCheckoutStore} from '../../stores'

	const checkoutStore = useCheckoutStore()
	const {showToast} = useWebsiteStore()

	const isError = ref(false)
	const isOtpSubmit = ref(false)

	// Default values for development mode
	const devDefaultValues = import.meta.env.DEV
		? {
				firstName: 'Иван',
				lastName: 'Иванов',
				thirdName: 'Иванович',
				email: 'dredbads@gmail.com',
				phone: '+7 (999) 123 45-67',
				deliveryType: 'delivery',
				city: 'Москва',
				street: 'Ленина',
				home: '1',
				entrance: '2',
				apartment: '3',
				postCode: '0000',
				offer: true,
			}
		: {}

	const {handleSubmit} = useCheckoutForm(devDefaultValues)
	const {otpResendTimeout, resume, pause} = useOtpTimer()

	const submitForm = handleSubmit(async (formData) => {
		checkoutStore.updateOrderModel(formData)

		isOtpSubmit.value = true
		const response = await checkoutStore.sendCode(
			checkoutStore.orderModel.email,
		)
		if (response) {
			checkoutStore.isOtpVisible = true
			isOtpSubmit.value = false
			showToast({
				severity: 'success',
				detail: 'Код OTP отправлен на ваш email',
				summary: 'Успешно',
			})
		} else {
			isOtpSubmit.value = false
			showToast({
				severity: 'error',
				detail: 'Не удалось отправить код OTP. Попробуйте позже.',
				summary: 'Ошибка',
			})
		}
	})

	const submitOtp = async () => {
		checkoutStore.isOtpVisible = true
		await checkoutStore.submitOrder()
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
		<div class="container laptop:max-w-[512px]">
			<Dialog
				modal
				v-model:visible="checkoutStore.isOtpVisible"
				:closable="false"
				:pt="{icons: 'hidden', root: 'max-tablet:w-[95%]'}"
			>
				<div class="flex-column align-items-center flex flex-col text-center">
					<div class="text-xl mb-2 font-bold">Подтвердите свою почту</div>
					<p class="text-color-secondary mb-5 block">
						Пожалуйста, введите код который был выслан вам на почту
					</p>
					<InputOtp
						v-model="checkoutStore.orderModel.otpCode"
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
								@click="checkoutStore.submitOrder()"
								:disabled="otpResendTimeout > 0 || isError"
								class="w-full text-[0.7rem] disabled:pointer-events-none disabled:opacity-50 max-tablet:min-h-[1.875rem] max-tablet:rounded-[1.25rem] max-tablet:text-[0.625rem] tablet:min-h-[35px] tablet:rounded-[1.875rem]"
							>
								Отправить код заново
							</button>
							<button
								:disabled="
									checkoutStore.orderModel.otpCode.length < 6
										? true
										: false || isOtpSubmit
								"
								type="submit"
								@click="submitOtp"
								class="relative w-full bg-red2 text-primary transition-colors hover:bg-red2-hover disabled:pointer-events-none disabled:opacity-50 max-tablet:min-h-[1.875rem] max-tablet:rounded-[1.25rem] max-tablet:text-[0.625rem] tablet:min-h-[45px] tablet:rounded-[1.875rem]"
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
			<form @submit="submitForm" class="pt-8" v-auto-animate>
				<CheckoutFields />
				<CheckoutDeliveryOptions v-if="!isOnlyVirtual" />
				<CheckoutDeliveryAddress
					v-if="checkoutStore.deliveryType === 'delivery'"
				/>
				<CheckoutOrderComment />
				<CheckoutPaymentMethod />
				<CheckoutSubmitButton :isSubmitting="checkoutStore.isSubmitting" />
			</form>
		</div>
	</div>
</template>
