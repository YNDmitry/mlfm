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
		slug: {
			type: String,
			required: true,
			default: '',
		},
	})

	const priceFormated = computed(() =>
		Intl.NumberFormat('ru-RU', {
			style: 'currency',
			currency: 'RUB',
		}).format(props.price as number),
	)

	const wishlistStore = useWishlistStore()

	const isInsideOnWishlist = computed(() =>
		wishlistStore.isOnWishlist(props.id as string),
	)
</script>

<template>
	<NuxtLink :to="'/catalog/' + slug" class="product_card w-full">
		<div class="relative w-full" v-if="imgSrc">
			<NuxtImg
				provider="directus"
				class="w-full object-cover"
				:src="imgSrc"
				width="300"
				height="410"
				:alt="title"
				format="webp"
				:placeholder="[50, 70, 0, 1]"
			/>

			<ClientOnly>
				<IconsHearth
					class="absolute right-3 top-3 h-5 w-5 transition-all"
					:is-on-wishlist="isInsideOnWishlist"
					v-tooltip.bottom="{
						value: !isInsideOnWishlist
							? 'Добавить в изобранное'
							: 'Удалить из избранного',
						pt: {text: 'text-[0.5rem] bg-red2 text-primary'},
					}"
					@click.prevent="
						!wishlistStore.isOnWishlist(id as string)
							? wishlistStore.addItemToWishlist(id as string)
							: wishlistStore.removeItemFromWishlist(id as string)
					"
				/>
			</ClientOnly>
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
