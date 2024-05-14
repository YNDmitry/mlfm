<script setup lang="ts">
	defineProps({
		image: {
			type: String,
		},
		title: {
			type: String,
		},
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
			class="absolute z-10 flex translate-y-[-50%] flex-col items-center justify-center gap-[1.5rem] text-primary max-tablet:right-[0.75rem] max-tablet:top-[40%] tablet:left-2/4 tablet:top-2/4 tablet:translate-x-[-50%]"
		>
			<h1
				v-if="title"
				class="text-center text-h1 uppercase tracking-[0.375rem] max-tablet:text-right max-tablet:text-h1Mob max-tablet:font-light max-tablet:tracking-[2.5px]"
			>
				{{ title }}
			</h1>

			<NuxtLink
				:to="'/catalog?collection=' + title"
				class="flex h-11 w-full max-w-[10.625rem] items-center justify-center rounded-main bg-red2 font-montserrat text-[0.75rem] font-bold uppercase tracking-[3px] transition-colors hover:bg-red2-hover max-tablet:hidden"
			>
				Купить
			</NuxtLink>
		</div>
	</section>
</template>
