<script setup>
	const props = defineProps({
		label: {
			type: String,
			default: () => '',
			required: false,
		},
		isRequired: {
			type: Boolean,
			default: false,
			required: false,
		},
		inputPlaceholder: {
			type: String,
			default: () => '',
			required: false,
		},
		inputType: {
			type: String,
			required: true,
			default: 'text',
		},
		inputName: {
			type: String,
			required: true,
			default: '',
		},
	})

	const {handleChange, handleBlur, value, errorMessage, meta} = useField(
		() => props.inputName,
		undefined,
	)
</script>
<template>
	<label class="flex cursor-pointer flex-col gap-2" :for="inputName">
		<span
			class="max-tablet:text-[0.625rem] tablet:text-[12px]"
			v-if="label.length > 0"
			>{{ label }}*</span
		>

		<input
			class="w-full border-[1px] border-black font-light focus:outline-none max-tablet:h-[1.875rem] max-tablet:rounded-[1.25rem] max-tablet:px-[12px] max-tablet:py-[5px] max-tablet:text-[0.625rem] tablet:h-[48px] tablet:rounded-[35px] tablet:px-[0.875rem] tablet:text-[0.875rem]"
			:class="{
				'border-[#B1B1B1]': meta.dirty,
				'border-[green]': meta.touched && meta.valid,
				'!border-[red]': meta.touched && !meta.valid,
			}"
			@change="handleChange"
			@blur="handleBlur"
			:value="value"
			:type="inputType"
			:placeholder="inputPlaceholder"
			:name="inputName"
		/>
		<span
			v-if="errorMessage && meta.touched"
			class="mt-1 text-[0.625rem] text-[red]"
			>{{ errorMessage }}</span
		>
	</label>
</template>
