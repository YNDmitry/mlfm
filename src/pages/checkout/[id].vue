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

	const checkoutStore = useCheckoutStore()

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

	const giftCard = data.checkout_sessions_by_id?.session_data.items.find(
		(el: any) => el.type === 'gift-card',
	)

	// Сопоставление количества товаров
	const cartItemsWithQuantity = res.products.map((product: any) => {
		const matchedItem = data.checkout_sessions_by_id?.session_data.items.find(
			(item: any) =>
				item.product_id === product.id &&
				item.variant_id === product.product_variants[0].id,
		)

		return {
			...product,
			quantity: matchedItem ? matchedItem.quantity : 1, // по умолчанию 1, если вдруг нет совпадений
		}
	})

	checkoutStore.items = data.checkout_sessions_by_id?.session_data.items
	checkoutStore.promoCode = data.checkout_sessions_by_id?.session_data.discount
	checkoutStore.giftCard = data.checkout_sessions_by_id?.session_data.giftCode
</script>

<template>
	<section class="grid grid-cols-delivery max-tablet:flex max-tablet:flex-col">
		<NuxtLink
			to="/"
			v-tooltip.right="{
				value: 'Вернуться на сайт',
				pt: {text: 'text-[0.5rem] py-2 bg-red2 text-primary'},
			}"
			class="fixed left-4 top-5 flex h-12 w-12 rotate-180 items-center justify-center rounded-[100%] p-2 transition-all hover:bg-black/10 max-tablet:hidden"
		>
			<IconsOrderArrow width="30px" height="30px" />
		</NuxtLink>
		<CheckoutInfoForm />
		<CheckoutOrderSummary
			:giftCard="giftCard"
			:cartItems="cartItemsWithQuantity"
			:totalPrice="data.checkout_sessions_by_id?.session_data.totalPrice"
			:discount="data.checkout_sessions_by_id?.session_data.discount"
			:giftCodeCurrentBalance="
				data.checkout_sessions_by_id?.session_data.giftCodeCurrentBalance
			"
			:remainingGiftCardBalance="
				data.checkout_sessions_by_id?.session_data.remainingGiftCardBalance
			"
		/>
	</section>
</template>
