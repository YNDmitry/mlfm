<script setup lang="ts">
	const props = defineProps({
		label: String,
		placeholder: String,
	})
</script>

<template>
	<label class="flex cursor-pointer flex-col gap-2">
		<span class="max-tablet:text-[0.625rem] tablet:text-[12px]">{{
			label
		}}</span>
		<input
			class="w-full border-[1px] border-black font-light max-tablet:h-[1.875rem] max-tablet:rounded-[1.25rem] max-tablet:px-[12px] max-tablet:py-[5px] max-tablet:text-[0.625rem] tablet:h-[48px] tablet:rounded-[35px] tablet:px-[0.875rem] tablet:text-[0.875rem]"
			type="text"
			:placeholder="placeholder"
		/>
	</label>
</template>
