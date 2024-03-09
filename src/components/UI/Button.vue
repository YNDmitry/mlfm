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
		class="inline-block w-full bg-black px-4 py-3 text-center text-[1rem] font-light text-white"
	>
		{{ title }}
	</component>
</template>
