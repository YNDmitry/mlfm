<script setup>
	defineProps({
		title: {
			default: () => '',
			type: String,
			required: true,
		},
	})
</script>
<template>
	<div class="py-16 max-w-[30rem] w-[95%] mx-auto">
		<h1 class="text-center text-[3rem]">{{ title }}</h1>
		<div class="mt-8">
			<slot />
		</div>
	</div>
</template>
