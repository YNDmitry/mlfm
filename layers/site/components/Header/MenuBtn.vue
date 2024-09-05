<script setup lang="ts">
	const emit = defineEmits(['toggleMenu'])

	const toggleMenu = () => {
		emit('toggleMenu')
	}
</script>

<template>
	<button
		type="button"
		@click="toggleMenu"
		class="relative z-50 cursor-pointer"
	>
		<div class="h-[1px] w-5 bg-black"></div>
		<div class="mt-[5px] h-[1px] w-5 bg-black"></div>
		<div class="mt-[5px] h-[1px] w-5 bg-black"></div>
	</button>
</template>
