<script setup lang="ts">
	const props = defineProps({
		label: String,
		placeholder: String,
		name: {
			type: String,
			required: true,
			default: '',
		},
	})

	const {handleChange, handleBlur, value, errorMessage, meta} = useField(
		() => props.name,
		undefined,
	)
</script>

<template>
	<label class="flex cursor-pointer flex-col gap-2">
		<span v-if="label" class="max-tablet:text-[0.625rem] tablet:text-[12px]">
			{{ label }}
		</span>
		<div v-auto-animate>
			<input
				:class="{
					'border-[#B1B1B1]': meta.dirty,
					'border-[green]': meta.touched && meta.valid,
					'!border-[red]': meta.touched && !meta.valid,
				}"
				:name="name"
				:placeholder="placeholder"
				@change="handleChange"
				@blur="handleBlur"
				:value.trim="value"
				class="w-full border-[1px] border-black font-light outline-none focus:border-red2-hover max-tablet:h-[1.875rem] max-tablet:rounded-[1.25rem] max-tablet:px-[12px] max-tablet:py-[5px] max-tablet:text-[0.625rem] tablet:h-[48px] tablet:rounded-[35px] tablet:px-[0.875rem] tablet:text-[0.875rem]"
				type="text"
			/>
			<span
				v-if="errorMessage && meta.touched"
				class="mt-1 text-nowrap text-[0.625rem] text-[red]"
				>{{ errorMessage }}</span
			>
		</div>
	</label>
</template>
