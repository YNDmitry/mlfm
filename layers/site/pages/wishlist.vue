<script setup lang="ts">
	import {useWishlistStore} from '~~/core/src/stores/wishlist'

	definePageMeta({
		layout: 'default',
	})

	useSeoMeta({
		title: 'Избранное | MLFM',
		ogTitle: 'Избранное | MLFM',
	})

	const wishlistStore = useWishlistStore()
</script>

<template>
	<section class="py-16">
		<div class="container">
			<h1
				class="text-center text-h1 leading-[110%] max-mobile:pb-[2rem] mobile:pb-[24px]"
			>
				Избранное
			</h1>
			<div class="mx-auto mt-8">
				<div
					v-if="wishlistStore.productDetails.length > 0"
					class="grid grid-cols-newItems gap-6 max-tablet:grid-cols-[1fr_1fr]"
				>
					<ProductCard
						v-for="product in wishlistStore.productDetails"
						:key="product.id"
						:slug="product.slug"
						:title="product.title"
						:price="product.product_variants[0].price"
						:id="product.id"
						:imgSrc="product.main_image.id"
					/>
				</div>
				<div v-else class="mx-auto max-w-[430px] text-center">
					<span>Пока что ничего нет</span>
					<div class="mt-6">
						<NuxtLink
							to="/catalog"
							class="flex h-11 w-full items-center justify-center rounded-main bg-red2 font-montserrat text-[0.75rem] font-bold uppercase tracking-[3px] text-primary transition-colors hover:bg-red2-hover"
						>
							перейти в каталог
						</NuxtLink>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
