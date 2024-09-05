<script setup lang="ts">
	import {useWebsiteStore} from '~~/core/src/stores'

	const appConfig = useRuntimeConfig()
	const websiteStore = useWebsiteStore()

	definePageMeta({
		layout: 'default',
	})

	const {data} = await useAsyncGql(
		'Homepage',
		{},
		{
			getCachedData(key, nuxtApp) {
				return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
			},
		},
	)

	const {data: categories} = await useAsyncGql(
		'Categories',
		{},
		{
			getCachedData(key, nuxtApp) {
				return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
			},
		},
	)

	useSeoMetaUtil(websiteStore.siteSettings?.seo, appConfig)
</script>

<template>
	<div>
		<!-- Главный банер - слайдер -->
		<HomeHero
			:title="data.homepage?.slider_collection?.title"
			:image="data.homepage?.slider_collection?.image?.id"
			:position="data.homepage?.position"
		/>
		<!-- /Главный банер - слайдер -->

		<!-- Ряд кнопок -->
		<HomeCategoryButtons :categories="categories.categories" />
		<!-- /Ряд кнопок -->

		<!-- Новинки -->
		<HomeNewProducts
			:products="data.homepage_products.map((el: any) => (el = el.products_id))"
			:product-banners="data.homepage_banners_1"
		/>
		<!-- /Новинки -->

		<!-- Купить образ -->
		<HomeLook
			:image="data.homepage?.look_image?.id"
			:products="data.homepage?.look_product"
		/>
		<!-- /Купить образ -->

		<!-- фирменный магазин -->
		<HomeAbout :config="websiteStore" />
		<!-- /фирменный магазин -->

		<!-- Подарочные карты -->
		<HomeGiftCards />
		<!-- /Подарочные карты -->

		<!-- Выбор стилиста -->
		<HomeUniqProduct
			:uniq_image="data.homepage?.uniq_product_image?.id"
			:uniq_product_image_2="data.homepage?.uniq_product_image_2?.id"
			:uniq_product_id="data.homepage?.uniq_product_id?.id"
			:uniq_product_slug="data.homepage?.uniq_product_id?.slug"
		/>
		<!-- /Выбор стилиста -->
	</div>
</template>
