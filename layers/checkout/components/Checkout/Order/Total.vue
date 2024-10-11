<script setup lang="ts">
	import {useCheckoutStore} from '~~/layers/checkout/stores'

	const props = defineProps({
		totalPrice: Number,
		discount: String,
		giftCodeCurrentBalance: Number,
		remainingGiftCardBalance: Number,
	})

	const priceFormated = (num: number) =>
		Intl.NumberFormat('ru-RU', {
			style: 'currency',
			currency: 'RUB',
		}).format(num as number)

	const price: Ref<number> = ref(props.totalPrice as number)

	const checkoutStore = useCheckoutStore()
</script>

<template>
	<div>
		<div
			class="relative mt-8 flex flex-col gap-2 border-t-[1px] border-gray2 pb-[1.25rem] pt-[1.25rem]"
			v-auto-animate
		>
			<div class="flex justify-between" v-if="discount">
				<span>Скидка</span>
				<span>{{ discount }}</span>
			</div>
			<div class="flex justify-between" v-if="giftCodeCurrentBalance">
				<span>Подарочная карта</span>
				<span>{{ priceFormated(giftCodeCurrentBalance) }}</span>
			</div>
			<div class="flex justify-between" v-if="remainingGiftCardBalance">
				<span>Остаток на подарочной карте</span>
				<span>{{ priceFormated(remainingGiftCardBalance) }}</span>
			</div>
			<div class="flex justify-between">
				<span>Итого</span>
				<span>{{ priceFormated(price) }}</span>
			</div>
		</div>
	</div>
</template>
