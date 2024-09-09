<script setup lang="ts">
	const emit = defineEmits(['toggleMenu'])
	const props = defineProps({
		isOpen: {
			type: Boolean,
		},
	})

	const toggleMenu = () => {
		emit('toggleMenu')
	}
</script>

<template>
	<button
		type="button"
		@click="toggleMenu"
		class="relative z-50 flex flex-col items-center justify-center"
	>
		<!-- Верхняя полоска -->
		<div
			class="h-[1px] w-8 transform bg-black transition-all duration-500 ease-in-out"
			:class="isOpen ? 'translate-y-[7px] rotate-45' : ''"
		></div>
		<!-- Средняя полоска (скрывается при открытии) -->
		<div
			class="mt-[6px] h-[1px] w-8 transform bg-black transition-all duration-500 ease-in-out"
			:class="isOpen ? 'opacity-0' : ''"
		></div>
		<!-- Нижняя полоска -->
		<div
			class="mt-[6px] h-[1px] w-8 transform bg-black transition-all duration-500 ease-in-out"
			:class="isOpen ? '-translate-y-[7px] -rotate-45' : ''"
		></div>
	</button>
</template>
