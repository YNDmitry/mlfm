<script setup>
	defineProps({
		title: {
			type: String,
			default: 'Button',
			required: true,
		},
		tag: {
			type: String,
			default: 'button',
		},
		type: {
			type: String,
			default: 'button',
		},
		href: {
			type: String,
			default: '#',
		},
	})
</script>

<template>
	<component
		:is="tag"
		:type="type"
		class="text-white py-3 px-4 bg-black inline-block text-center font-light text-[1rem] w-full"
	>
		{{ title }}
	</component>
</template>
