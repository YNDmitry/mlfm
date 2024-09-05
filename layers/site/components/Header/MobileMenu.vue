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
	<div
		:class="{'max-tablet:hidden': !isOpen}"
		class="bg-black px-5 py-4 max-tablet:fixed max-tablet:left-0 max-tablet:right-0 max-tablet:top-0 max-tablet:z-40 max-tablet:h-screen max-tablet:bg-primary max-tablet:pt-28 max-mobile:bottom-0"
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
	</div>
</template>

<style scoped>
	.router-link-active.router-link-exact-active {
		@apply text-red;
	}
</style>
