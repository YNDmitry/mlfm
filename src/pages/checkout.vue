<script setup lang="ts">
	import {boolean, object, string} from 'yup'

	definePageMeta({
		layout: 'checkout',
		middleware: 'checkout',
	})

	useSeoMeta({
		title: 'Оформление заказа | MLFM',
		ogTitle: 'Оформление заказа | MLFM',
	})

	const cartStore = useCartStore()
	const deliveryType = ref(false)

	const schema = object({
		firstName: string().required(),
		lastName: string().required(),
		thirdName: string(),
		email: string().email().required(),
		phone: string().required(),
		deliveryType: boolean(),
		city: string().when('deliveryType', {
			is: true,
			then: string().required(),
			otherwise: string().notRequired(),
		}),
		street: string().when('deliveryType', {
			is: true,
			then: string().required(),
			otherwise: string().notRequired(),
		}),
		home: string().when('deliveryType', {
			is: true,
			then: string().required(),
			otherwise: string().notRequired(),
		}),
		entrance: string().when('deliveryType', {
			is: true,
			then: string().required(),
			otherwise: string().notRequired(),
		}),
		apartment: string().when('deliveryType', {
			is: true,
			then: string().required(),
			otherwise: string().notRequired(),
		}),
		postCode: string().when('deliveryType', {
			is: true,
			then: string().required(),
			otherwise: string().notRequired(),
		}),
		comment: string(),
		paymentMethod: string(),
		terms: boolean(),
	})

	const {handleSubmit} = useForm({
		validationSchema: schema,
	})

	const onSubmit = handleSubmit((values) => {
		console.log(values)
	})
</script>

<template>
	<section class="laptop:grid laptop:grid-cols-delivery">
		<CheckoutInfoForm @submit="onSubmit" :deliveryType="deliveryType" />
		<CheckoutOrderSummary
			:cartItems="cartStore.items"
			:totalPrice="cartStore.totalPrice"
			:discount="cartStore.discount"
		/>
	</section>
</template>
