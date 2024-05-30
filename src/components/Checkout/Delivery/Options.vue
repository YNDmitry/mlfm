<script setup lang="ts">
	const props = defineProps({
		deliveryType: Boolean,
	})

	defineEmits(['updateOption'])
</script>

<template>
	<div
		class="flex flex-col pt-[1.25rem] max-tablet:gap-[12px] tablet:gap-[1.25rem]"
	>
		<label class="flex cursor-pointer items-center gap-[0.625rem]">
			<input
				type="radio"
				name="delivery"
				class="absolute h-5 w-5 cursor-pointer opacity-0"
				checked
				:value="deliveryType"
				@change="$emit('updateOption')"
			/>
			<div
				class="rounded-full relative flex h-5 w-5 cursor-pointer items-center justify-center border-[1px] border-black"
			></div>
			<span class="text-[0.625rem]">Доставка - 500Р</span>
		</label>
		<label class="flex cursor-pointer items-center gap-[0.625rem]">
			<input
				type="radio"
				name="delivery"
				class="absolute h-5 w-5 cursor-pointer opacity-0"
				:value="deliveryType"
				@change="$emit('updateOption')"
			/>
			<div
				class="rounded-full relative flex h-5 w-5 cursor-pointer items-center justify-center border-[1px] border-black"
			></div>
			<span class="text-[0.625rem]">Самовывоз - 0Р</span>
		</label>
	</div>
</template>
