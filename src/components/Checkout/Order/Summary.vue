<script setup lang="ts">
	const props = defineProps({
		cartItems: Array,
		totalPrice: Number,
		discount: Number,
	})
</script>

<template>
	<div class="bg-[#F4F4F4] pt-[3.125rem] font-montserrat max-tablet:pb-20">
		<div class="container laptop:w-[512px]">
			<CheckoutOrderItems :items="cartItems" />
			<CheckoutOrderTotal :totalPrice="totalPrice" :discount="discount" />
		</div>
	</div>
</template>
