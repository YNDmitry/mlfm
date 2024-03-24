<script setup>
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
				<p class="text-center">{{ title }}</p>
				<span>{{ price }}</span>
			</div>

			<NuxtLink
				:to="'/catalog/' + link"
				class="flex max-w-[10.625rem] items-center justify-center rounded-main bg-third font-montserrat text-[0.75rem] font-bold uppercase tracking-[3px] text-red2 transition-colors hover:bg-primary max-tablet:min-h-[2.188rem] max-mobile:min-h-[1rem] max-mobile:w-[59px] max-mobile:text-[0.5rem] max-mobile:tracking-[0.4px] mobile:w-full tablet:min-h-[2.813rem]"
			>
				купить
			</NuxtLink>
		</div>
	</article>
</template>
