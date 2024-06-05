<script setup lang="ts">
	import {boolean, object, string} from 'yup'

	const schema = object({
		firstName: string().required('Обязательное поле'),
		lastName: string().required('Обязательное поле'),
		thirdName: string(),
		email: string()
			.email('Введите валидный email')
			.required('Обязательное поле'),
		phone: string().required('Обязательное поле'),
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
			'SPB',
			'Банковская карта',
			'Долями',
			'SberPay',
			'TinkoffPay',
		]),
		terms: boolean().oneOf([true], 'Нужно обязательно подтвердить'),
		offer: boolean().oneOf([true], 'Нужно обязательно подтвердить'),
	})

	let initialValues = {
		deliveryType: 'delivery',
		terms: false,
		offer: false,
	}

	// Закомменти этот говнокод чтобы протестировать валидацию
	if (process.env.NODE_ENV === 'development') {
		import('~/config/devConfig').then((module) => {
			initialValues = {
				...initialValues,
				...module.devCheckoutInitialValues,
			}
		})
	}

	const {handleSubmit, isSubmitting} = useForm({
		validationSchema: schema,
		initialValues: initialValues,
	})

	const submitForm = handleSubmit((values) => {
		console.log(values)
	})

	const deliveryTypeField = useField('deliveryType')
	const deliveryTypeValue = computed(() => deliveryTypeField.value.value)
</script>

<template>
	<div class="pb-[3.75rem]">
		<div class="container laptop:max-w-[512px]">
			<form @submit.prevent="submitForm" class="pt-8">
				<CheckoutFields />
				<CheckoutDeliveryOptions />
				<CheckoutDeliveryAddress v-if="deliveryTypeValue === 'delivery'" />
				<CheckoutOrderComment />
				<CheckoutPaymentMethod />
				<CheckoutSubmitButton :isSubmitting="isSubmitting" />
			</form>
		</div>
	</div>
</template>
