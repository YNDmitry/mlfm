<script setup lang="ts">
	import {useCheckoutStore} from '~~/layers/checkout/stores'

	const {handleChange} = useField(() => 'deliveryType')

	const checkoutStore = useCheckoutStore()
	const updateValue = (newValue: any) => {
		handleChange(newValue.target.value)
		checkoutStore.deliveryType = newValue.target.value
	}
</script>

<template>
	<div
		class="flex flex-col pt-[3.125rem] max-tablet:gap-[12px] max-tablet:pt-[2rem] tablet:gap-[1.25rem]"
	>
		<h2
			class="pb-[0.75rem] text-h2 max-tablet:pb-[24px] max-tablet:text-h2Mob max-tablet:font-medium"
		>
			Способ доставки
		</h2>
		<label class="flex cursor-pointer items-center gap-[0.625rem]">
			<input
				type="radio"
				name="delivery"
				class="absolute h-5 w-5 cursor-pointer opacity-0"
				checked
				value="delivery"
				@change="($event) => updateValue($event)"
			/>
			<div
				class="relative flex h-5 w-5 cursor-pointer items-center justify-center rounded-[100%] border-[1px] border-black"
			></div>
			<span class="text-[0.625rem]">Доставка (+500 ₽)</span>
		</label>
		<label class="flex cursor-pointer items-center gap-[0.625rem]">
			<input
				type="radio"
				name="delivery"
				class="absolute h-5 w-5 cursor-pointer opacity-0"
				value="self-delivery"
				@change="($event) => updateValue($event)"
			/>
			<div
				class="relative flex h-5 w-5 cursor-pointer items-center justify-center rounded-[100%] border-[1px] border-black"
			></div>
			<span class="text-[0.625rem]">Самовывоз</span>
		</label>
	</div>
</template>
