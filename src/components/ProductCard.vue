<script setup lang="ts">
	const props = defineProps({
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

	const priceFormated = computed(() =>
		Intl.NumberFormat('ru-RU', {
			style: 'currency',
			currency: 'RUB',
		}).format(props.price),
	)
</script>

<template>
	<NuxtLink :to="'/catalog/' + id" class="product_card w-full">
		<div class="relative w-full" v-if="imgSrc">
			<NuxtImg
				provider="directus"
				class="w-full object-cover"
				:src="imgSrc"
				width="300"
				height="410"
				:alt="title"
			/>

			<IconsHearth
				class="absolute right-3 top-3 h-5 w-5 transition-all"
				@click.prevent
			/>
		</div>

		<div
			class="flex flex-col gap-[0.5rem] pt-5 text-[14px] font-normal max-tablet:gap-1 max-tablet:pt-2 max-tablet:text-[10px]"
		>
			<div>{{ title }}</div>

			<span>{{ priceFormated }}</span>
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
