<script setup lang="ts">
	const props = defineProps({
		cartItems: Array,
		totalPrice: Number,
		discount: Number,
	})
</script>

<template>
	<div
		class="font-montserrat max-laptop:pt-[2rem] laptop:bg-[#F4F4F4] laptop:pt-[3.125rem]"
	>
		<div class="container laptop:w-[512px]">
			<CheckoutOrderItems :items="cartItems" />
			<CheckoutOrderTotal :totalPrice="totalPrice" :discount="discount" />
		</div>
	</div>
</template>
