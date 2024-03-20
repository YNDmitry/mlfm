<script setup>
	defineProps({
		title: {
			type: String,
			required: false,
		},
		price: {
			type: Number,
			required: false,
		},
		imgSrc: {
			type: String,
			required: false,
		},
		id: {
			type: String,
			required: false,
		},
	})
</script>

<template>
	<NuxtLink :to="'/catalog/' + id" class="product_card">
		<div class="relative">
			<NuxtImg
				provider="directus"
				class="w-full max-tablet:aspect-[136/165]"
				:src="imgSrc"
				width="300"
				height="410"
				:alt="title"
			/>

			<IconsHearth class="absolute right-3 top-3 h-5 w-5 transition-all" />
		</div>

		<div
			class="flex flex-col gap-[0.5rem] pt-5 text-[14px] font-medium max-tablet:pt-[4px] max-tablet:text-[10px]"
		>
			<div>{{ title }}</div>

			<span>₽ {{ price }}</span>
		</div>
	</NuxtLink>
</template>

<style>
	.product_card svg {
		color: transparent;
	}
	.product_card svg:hover {
		color: white;
		transform: scale3d(1.2, 1.2, 1.2);
	}
</style>
