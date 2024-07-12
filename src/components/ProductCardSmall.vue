<script setup lang="ts">
	interface Props {
		title: string
		image: string
		collection?: string
		item?: {title: string; id: string} | null
	}
	defineProps<Props>()
</script>

<template>
	<NuxtLink
		:to="
			collection === 'collection'
				? `/catalog?collectionId=${item?.title}`
				: collection === 'categories'
					? `/catalog?category=${item?.title}`
					: '/catalog'
		"
		class="relative h-full w-full"
	>
		<NuxtImg
			provider="directus"
			class="h-full w-full object-cover"
			:src="image"
			width="441"
			height="550"
			fit="cover"
			format="webp"
		/>

		<div
			class="absolute bottom-[25px] left-[29px] right-[29px] flex flex-col items-start gap-[17px] uppercase text-primary max-tablet:bottom-[16px] max-tablet:left-[8px] max-tablet:right-[8px] max-tablet:gap-[7px]"
		>
			<p
				class="text-[14px] font-bold tracking-[2.1px] max-tablet:text-[10px] max-tablet:tracking-[1.5px]"
			>
				{{ title }}
			</p>
			<button
				class="min-w-[8.313rem] rounded-main border-[1px] border-primary font-montserrat text-[0.625rem] font-bold transition-colors hover:bg-primary hover:text-black max-tablet:min-h-[1rem] max-tablet:min-w-[3.75rem] max-tablet:text-[0.5rem] max-tablet:tracking-[0.4px] tablet:min-h-[2.25rem] tablet:tracking-[2.5px]"
			>
				купить
			</button>
		</div>
	</NuxtLink>
</template>
