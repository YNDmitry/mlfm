<script lang="ts" setup>
	defineProps({
		links: Array,
	})
</script>

<template>
	<div class="bg-black px-5 py-4 max-tablet:hidden">
		<div class="flex items-center justify-center gap-4">
			<NuxtLink
				v-for="link in links"
				:key="link.href"
				:to="link.href"
				@click="$emit('closeMenu')"
				:prefetch="true"
				class="text-[0.625rem] font-medium uppercase text-primary"
			>
				{{ link.title }}
			</NuxtLink>
		</div>
	</div>
</template>

<style scoped>
	.router-link-active.router-link-exact-active {
		@apply text-red;
	}
</style>
