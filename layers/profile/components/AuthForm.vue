<script setup lang="ts">
	defineProps({
		title: {
			default: () => '',
			type: String,
			required: true,
		},
	})
</script>
<template>
	<div class="mx-auto w-[95%] max-w-[30rem] py-16">
		<h1 class="text-center text-h1">{{ title }}</h1>
		<div class="mt-8">
			<slot />
		</div>
	</div>
</template>
