<script setup lang="ts">
	const props = defineProps({
		id: String,
		name: String,
		label: String,
		checked: Boolean,
	})
</script>

<template>
	<label :id="id" class="flex cursor-pointer items-center gap-[8px]">
		<input
			:id="id"
			type="radio"
			:name="name"
			class="absolute h-5 w-5 cursor-pointer opacity-0"
			:checked="checked"
		/>
		<div
			class="rounded-full relative flex h-5 w-5 cursor-pointer items-center justify-center border-[1px] border-black"
		></div>
		<span class="text-[0.625rem]">{{ label }}</span>
	</label>
</template>
