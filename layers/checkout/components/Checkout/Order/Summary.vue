<script setup lang="ts">
	const props = defineProps({
		cartItems: Array,
		totalPrice: Number,
		discount: String,
		giftCodeCurrentBalance: Number,
		remainingGiftCardBalance: Number,
		giftCard: Object,
	})
</script>

<template>
	<div class="bg-[#F4F4F4] pt-[3.125rem] font-montserrat max-tablet:pb-20">
		<div class="container sticky top-9 laptop:w-[512px]">
			<CheckoutOrderItems :items="cartItems" :giftCard="giftCard" />
			<CheckoutOrderTotal
				:totalPrice="totalPrice"
				:discount="discount"
				:giftCodeCurrentBalance="giftCodeCurrentBalance"
				:remainingGiftCardBalance="remainingGiftCardBalance"
			/>
		</div>
	</div>
</template>
