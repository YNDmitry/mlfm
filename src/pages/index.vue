<script setup lang="ts">
	const appConfig = useRuntimeConfig()
	const isMobile = useMediaQuery('(max-width:768px)')
	const config = useNuxtData('config').data

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

	useSeoMeta({
		title: config?.value?.meta_title,
		ogTitle: config?.value?.meta_title,
		description: config?.value?.meta_description,
		ogDescription: config?.value?.meta_description,
		ogImage:
			appConfig.public.databaseUrl + 'assets/' + config?.value?.meta_thumbnail,
	})
</script>

<template>
	<div>
		<!-- Главный банер - слайдер -->
		<HomeHero
			:title="data.homepage?.slider_collection?.title"
			:image="data.homepage?.slider_collection?.image?.id"
		/>
		<!-- /Главный банер - слайдер -->

		<!-- Ряд кнопок -->
		<HomeCategoryButtons :categories="categories.categories" />
		<!-- /Ряд кнопок -->

		<!-- Новинки -->
		<HomeNewProducts
			:products="data.homepage_products.map((el: any) => (el = el.products_id))"
			:product-banners="data.homepage_banners"
		/>
		<!-- /Новинки -->

		<!-- Купить образ -->
		<HomeLook
			:image="data.homepage?.look_image?.id"
			:products="data.homepage?.look_product"
		/>
		<!-- /Купить образ -->

		<!-- фирменный магазин -->
		<HomeAbout :config="config" />
		<!-- /фирменный магазин -->

		<!-- Подарочные карты -->
		<HomeGiftCards />
		<!-- /Подарочные карты -->

		<!-- Выбор стилиста -->
		<HomeUniqProduct
			:uniq_image="data.homepage?.uniq_product_image?.id"
			:uniq_product_image_2="data.homepage?.uniq_product_image_2?.id"
			:uniq_product_id="data.homepage?.uniq_product_id?.id"
		/>
		<!-- /Выбор стилиста -->
	</div>
</template>
