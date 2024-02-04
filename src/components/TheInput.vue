<script setup>
	const props = defineProps({
		label: {
			type: String,
			default: () => '',
			required: true,
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

	// const model = defineModel()

	const {handleChange, handleBlur, value, errorMessage, meta} = useField(
		() => props.inputName,
		undefined,
	)
</script>
<template>
	<label :for="label" class="flex flex-col relative">
		<span class="font-light">{{ label }}</span>
		<input
			@change="handleChange"
			@blur="handleBlur"
			:value="value"
			:type="inputType"
			:placeholder="inputPlaceholder"
			:name="inputName"
			:class="{
				'border-[#B1B1B1]': meta.dirty,
				'border-[green]': meta.touched && meta.valid,
				'!border-[red]': meta.touched && !meta.valid,
			}"
			class="mt-2 min-h-12 border focus:border-black transition-all px-4 outline-none font-light"
		/>
		<span
			v-if="errorMessage && meta.touched"
			class="text-[red] text-[0.625rem] mt-2"
			>{{ errorMessage }}</span
		>
	</label>
</template>
