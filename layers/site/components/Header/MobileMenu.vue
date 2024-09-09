<script setup lang="ts">
	defineProps({
		isOpen: Boolean,
		links: Array,
	})

	const emit = defineEmits(['closeMenu'])

	const handleIconClick = (action: string) => {
		emit('closeMenu')
	}
</script>

<template>
	<Dialog
		v-bind:visible="isOpen"
		:blockScroll="true"
		:closable="false"
		:pt="{root: 'w-full h-screen', mask: 'pt-[10px]'}"
	>
		<div
			class="flex items-center justify-center gap-4 max-tablet:flex-col max-tablet:items-start max-tablet:gap-5"
		>
			<NuxtLink
				v-for="link in links"
				:key="link.href"
				:to="link.href"
				@click="$emit('closeMenu')"
				:prefetch="true"
				class="text-[0.625rem] font-medium uppercase text-primary max-tablet:text-[1rem] max-tablet:text-black"
			>
				{{ link.title }}
			</NuxtLink>
			<HeaderSearchWishlistProfile @closeMenu="$emit('closeMenu')" />
		</div>
	</Dialog>
</template>

<style scoped>
	.router-link-active.router-link-exact-active {
		@apply text-red;
	}
</style>
