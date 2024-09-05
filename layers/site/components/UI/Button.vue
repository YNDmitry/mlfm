<script setup lang="ts">
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
		class="flex h-11 w-full max-w-[10.625rem] items-center justify-center rounded-main bg-red2 font-montserrat text-[0.75rem] font-bold uppercase tracking-[3px] text-primary transition-colors hover:bg-red2-hover"
	>
		{{ title }}
	</component>
</template>
