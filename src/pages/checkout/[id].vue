<script setup lang="ts">
	import type {IconsOrderArrow} from '#build/components'

	const route = useRoute()

	definePageMeta({
		layout: 'checkout',
		middleware: 'checkout',
	})

	useSeoMeta({
		title: 'Оформление заказа | MLFM',
		ogTitle: 'Оформление заказа | MLFM',
	})

	const cartStore = useCartStore()

	const data = await GqlGetCheckoutSession({
		id: route.params.id as string,
	})

	const productIds = data.checkout_sessions_by_id?.session_data.items.map(
		(item: any) => item.product_id,
	)
	const variantIds = data.checkout_sessions_by_id?.session_data.items
		.filter((item: any) => 'variant_id' in item)
		.map((item: any) => item.variant_id)

	const res = await GqlGetCartProductsByIds({
		ids: productIds,
		variant_ids: variantIds,
	})

	const totalPrice = computed(() => {
		return res.products.reduce((total, item) => {
			if ('quantity' in item) {
				return total + item.price * item.quantity
			}
			return total + item.price // Assume quantity is 1 for gift cards
		}, 0)
	})
</script>

<template>
	<section class="grid grid-cols-delivery max-tablet:flex max-tablet:flex-col">
		<NuxtLink
			to="/"
			v-tooltip.right="'Вернуться на сайт'"
			class="fixed left-4 top-5 flex h-12 w-12 rotate-180 items-center justify-center rounded-[100%] p-2 transition-all hover:bg-black/10 tablet:hidden"
		>
			<IconsOrderArrow width="30px" height="30px" />
		</NuxtLink>
		<CheckoutInfoForm />
		<CheckoutOrderSummary
			:cartItems="res.products"
			:totalPrice="totalPrice"
			:discount="res.discount"
		/>
	</section>
</template>
