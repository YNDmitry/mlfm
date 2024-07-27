<script setup lang="ts">
	const props = defineProps({
		image: {
			type: String,
		},
		title: {
			type: String,
		},
	})

	const link = computed(() => {
		return {
			path: '/catalog',
			query: {
				collectionId: props.title,
			},
		}
	})
</script>
<template>
	<section
		class="relative flex h-[37.5rem] items-center justify-center max-tablet:h-[20rem] max-mobile:h-[15rem]"
	>
		<div class="relative h-full w-full" v-if="image">
			<NuxtImg
				provider="directus"
				:src="image"
				class="h-full w-full object-cover"
				width="1440"
				height="600"
				format="webp"
			/>
		</div>
		<div
			class="absolute z-10 flex flex-col items-center justify-center gap-[1.5rem] text-primary"
		>
			<h1
				v-if="title"
				class="max-w-[30rem] text-center text-h1 uppercase tracking-[0.375rem] max-tablet:max-w-[13rem] max-tablet:text-[0.8rem] max-tablet:font-light max-tablet:tracking-[2.5px]"
			>
				{{ title }}
			</h1>

			<NuxtLink
				:to="link"
				class="flex h-11 w-full min-w-[10.625rem] max-w-[10.625rem] items-center justify-center rounded-main bg-red2 px-4 font-montserrat text-[0.75rem] font-bold uppercase tracking-[3px] transition-colors hover:bg-red2-hover max-tablet:h-8"
			>
				Купить
			</NuxtLink>
		</div>
	</section>
</template>
