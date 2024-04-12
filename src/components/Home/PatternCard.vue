<script setup lang="ts">
	defineProps({
		image: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		link: {
			type: String,
			required: true,
		},
	})
</script>

<template>
	<article class="col flex flex-col">
		<NuxtImg
			class="w-full"
			provider="directus"
			:src="image"
			width="300"
			height="410"
		/>

		<div class="flex flex-col items-center justify-center">
			<div
				class="flex flex-col items-center gap-[5px] font-medium text-third max-laptop:py-[10px] tablet:text-[14px] laptop:py-[20px]"
			>
				<p class="text-center max-tablet:text-[8px]">{{ title }}</p>
				<span class="max-tablet:text-[8px]">₽ {{ price }}</span>
			</div>

			<NuxtLink
				:to="'/catalog/' + link"
				class="flex min-h-[2.813rem] max-w-[10.625rem] items-center justify-center rounded-main bg-third px-6 font-montserrat text-[0.75rem] font-bold uppercase tracking-[3px] text-red2 transition-colors hover:bg-primary mobile:w-full"
			>
				купить
			</NuxtLink>
		</div>
	</article>
</template>
