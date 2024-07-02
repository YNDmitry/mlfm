<script setup lang="ts">
	const props = defineProps({
		id: String,
		name: String,
		label: String,
		checked: Boolean,
		value: String,
	})

	const checkoutStore = useCheckoutStore()
</script>

<template>
	<label :id="id" class="flex cursor-pointer items-center gap-[8px]">
		<input
			:id="id"
			type="radio"
			:name="name"
			:value="value"
			class="absolute h-5 w-5 cursor-pointer opacity-0"
			:checked="checkoutStore.paymentMethod === value ? true : false"
			v-model="checkoutStore.paymentMethod"
		/>
		<div
			class="relative flex h-5 w-5 cursor-pointer items-center justify-center rounded-[100%] border-[1px] border-black"
		></div>
		<span class="text-[0.625rem]">{{ label }}</span>
	</label>
</template>
