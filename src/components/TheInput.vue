<script setup>
	defineProps({
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
	})
</script>
<template>
	<label :for="label" class="flex flex-col">
		<span class="font-light">{{ label }}</span>
		<input
			:type="inputType"
			:placeholder="inputPlaceholder"
			:name="label"
			class="mt-[0.5rem] min-h-12 border px-4 outline-none font-light"
		/>
	</label>
</template>
