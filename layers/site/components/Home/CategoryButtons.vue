<script setup lang="ts">
	interface Props {
		categories: [{id: string; title: string}]
	}
	defineProps<Props>()
</script>
<template>
	<section
		class="container flex max-w-[84rem] flex-wrap items-center justify-center gap-4 gap-y-4 py-11 font-montserrat max-laptop:gap-x-3 max-tablet:mb-[2.5rem] max-tablet:pb-[1.25rem] max-tablet:pt-[2rem] max-mobile:grid max-mobile:grid-cols-[1fr_1fr] max-mobile:text-[0.875rem]"
	>
		<NuxtLink
			v-for="category in categories"
			:key="category.id"
			:to="{
				path: '/catalog',
				query: {
					category: [category.title],
				},
			}"
			class="flex h-11 items-center justify-center rounded-main border-[1px] border-black px-6 text-center transition-colors hover:bg-black hover:text-primary"
		>
			{{ category.title }}
		</NuxtLink>
	</section>
</template>
