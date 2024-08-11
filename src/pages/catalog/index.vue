<script setup lang="ts">
	import {options} from '../../components/Catalog/constans'

	const {isDesktop, isMobile} = useDevice()
	const appConfig = useRuntimeConfig()
	const router = useRouter()
	const route = useRoute()

	const sortOptions = ref(options)
	const currentPage = ref(Number(route.query.page) - 1 || 0)
	const currentLimit = ref(Number(route.query.limit) || 9)
	const currentSort = ref(route.query.sort || sortOptions.value[0].code)

	const {products, productCount, refresh, isProductLoading} = useProducts()

	const {data} = await useAsyncGql(
		'Catalog',
		{},
		{
			getCachedData(key, nuxtApp) {
				return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
			},
		},
	)

	watch(
		() => route.query,
		() => {
			isProductLoading.value = true
		},
	)

	watch(
		() => {
			const {category, collectionId, color, size, brand, minPrice, maxPrice} =
				route.query
			return {category, collectionId, color, size, brand, minPrice, maxPrice}
		},
		(newFilters, oldFilters) => {
			if (JSON.stringify(newFilters) !== JSON.stringify(oldFilters)) {
				const preservedLimit = route.query.limit || currentLimit.value

				router.replace({
					query: {
						...route.query,
						page: 1, // сброс страницы на 1 при изменении фильтров
						limit: preservedLimit,
					},
				})

				refresh(currentPage.value, currentLimit.value)
			}
		},
		{deep: true},
	)

	watch(
		() => {
			const {page, limit} = route.query
			return {page, limit}
		},
		(newPage, oldPage) => {
			// if (JSON.stringify(newPage) !== JSON.stringify(oldPage)) {
			// currentPage.value = Number(newPage.page) - 1 || 0 // обновляем currentPage только при изменении page
			// currentLimit.value = Number(newPage.limit)
			// }
			refresh(currentPage.value, currentLimit.value) // обновляем данные
		},
	)

	useSeoMeta({
		title: data.value?.catalog?.SEO?.meta_title,
		ogTitle: data.value?.catalog?.SEO?.meta_title,
		description: data.value?.catalog?.SEO?.meta_description,
		ogDescription: data.value?.catalog?.SEO?.meta_description,
		ogImage:
			appConfig.public.databaseUrl +
			'assets/' +
			data.value?.catalog?.SEO?.og_image?.id,
		twitterImage:
			appConfig.public.databaseUrl +
			'assets/' +
			data.value?.catalog?.SEO?.og_image?.id,
	})

	function resetFilters() {
		router.replace({
			query: {
				page: 1,
				limit: route.query.limit || currentLimit.value,
			},
		})
		currentPage.value = 1
	}

	function updatePage(newPage: {page: number; rows: number}) {
		currentPage.value = newPage.page
		currentLimit.value = newPage.rows

		router.replace({
			query: {
				...route.query,
				page: newPage.page + 1,
				limit: newPage.rows,
			},
		})

		window.scrollTo(0, 0)
	}

	const minPriceValue = useRouteQuery('minPrice', null)
	const maxPriceValue = useRouteQuery('maxPrice', null)
	const categories = useState('categories', () => data.value.categories)

	refresh(currentPage.value, currentLimit.value)
</script>

<template>
	<div>
		<section class="pt-[3.75rem]">
			<div class="container max-w-[1342px]">
				<div class="laptop:grid laptop:grid-cols-aside laptop:gap-20">
					<!-- Кнопки для фильтров (На Мобилках) -->
					<CatalogMobileFilterSidebar
						v-if="isMobile"
						:data="data"
						:resetFilters="resetFilters"
						:totalProducts="data?.products_aggregated[0].count?.id"
						:minPrice="data?.products_aggregated[0]?.min?.price"
						:maxPrice="data?.products_aggregated[0]?.max?.price"
						:currentSort="currentSort"
						:categories="categories"
						@update:currentSort="($event) => (currentSort = $event)"
						:sort-options="sortOptions"
					/>
					<!-- Кнопки для фильтров (На Мобилках) -->

					<!-- Боковое меню (На ПК) -->
					<CatalogDesktopFilterSidebar
						v-if="isDesktop"
						:data="data"
						:resetFilters="resetFilters"
						:totalProducts="data?.products_aggregated[0].count?.id"
						:minPrice="data?.products_aggregated[0]?.min?.price"
						:maxPrice="data?.products_aggregated[0]?.max?.price"
						v-model:min-price-value="minPriceValue"
						v-model:max-price-value="maxPriceValue"
						class="max-tablet:hidden"
					/>
					<!-- /Боковое меню (На ПК)-->

					<div class="max-laptop:pb-[3.75rem] laptop:pb-[4.375rem]">
						<!-- Хлебные крошки и сортировка -->
						<CatalogSort
							:current-sort="currentSort"
							:sort-options="sortOptions"
							v-model="currentSort"
						/>
						<!-- /Хлебные крошки и сортировка -->

						<!-- О бренде -->
						<CatalogAboutBrand :brands="data.brands" />
						<!-- /О бренде -->

						<!-- Пагинация и лист с продуктами -->
						<CatalogProductList
							:isLoading="isProductLoading"
							:products="products"
							:totalProducts="productCount"
							:data="data"
							:currentPage="currentPage"
							:currentLimit="currentLimit"
							@resetFilters="resetFilters"
							@updatePage="updatePage"
						/>
						<!-- /Пагинация и лист с продуктами -->
					</div>
				</div>
			</div>
		</section>
	</div>
</template>
