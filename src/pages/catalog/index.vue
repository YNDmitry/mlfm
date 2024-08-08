<script setup lang="ts">
	import {options} from '../../components/Catalog/constans'

	const appConfig = useRuntimeConfig()
	const router = useRouter()
	const route = useRoute()

	const sortOptions = ref(options)
	const currentPage = ref(Number(route.query.page) || 0)
	const currentLimit = ref(Number(route.query.limit) || 9)
	const currentSort = ref(route.query.sort || options[0].code)

	const {products, refresh, isProductLoading} = useProducts(
		currentSort,
		currentPage.value,
		currentLimit.value,
	)

	const {data} = await useAsyncGql(
		'Catalog',
		{},
		{
			getCachedData(key, nuxtApp) {
				return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
			},
		},
	)

	const otherQuery = computed(() => {
		const {page, limit, ...rest} = route.query
		return rest
	})
	watch(
		() => route.query,
		() => {
			isProductLoading.value = true
		},
	)

	watch(
		() => otherQuery.value,
		() => {
			if (!otherQuery.value) {
				router.replace({query: {...route.query, page: 1}})
				refresh()
			}
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
		router.replace({query: {}})
		currentPage.value = 0
	}

	function updatePage(newPage: number) {
		router.replace({
			query: {...route.query, page: newPage.page + 1, limit: newPage.rows},
		})
		window.scrollTo(0, 0)
	}

	const minPriceValue = useRouteQuery('minPrice', null)
	const maxPriceValue = useRouteQuery('maxPrice', null)
	const categories = useState('categories', () => data.value.categories)

	refresh()
</script>

<template>
	<div>
		<section class="pt-[3.75rem]">
			<div class="container max-w-[1342px]">
				<div class="laptop:grid laptop:grid-cols-aside laptop:gap-20">
					<!-- Кнопки для фильтров (На Мобилках) -->
					<CatalogMobileFilterSidebar
						v-if="$device.isMobileOrTablet"
						:currentSort="currentSort"
						@update:currentSort="($event) => (currentSort = $event)"
						:data="data"
						:resetFilters="resetFilters"
						:minPrice="data?.products_aggregated[0]?.min?.price"
						:maxPrice="data?.products_aggregated[0]?.max?.price"
						:sort-options="sortOptions"
					/>
					<!-- Кнопки для фильтров (На Мобилках) -->

					<!-- Боковое меню (На ПК) -->
					<CatalogDesktopFilterSidebar
						v-if="$device.isDesktop"
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
							:current-sort="currentSort.code"
							:sort-options="sortOptions"
							v-model="currentSort"
						/>
						<!-- /Хлебные крошки и сортировка -->

						<!-- О бренде -->
						<CatalogAboutBrand :brands="data.brands" />
						<!-- /О бренде -->

						<!-- Пагинация и лист с продуктами -->
						<CatalogProductList
							v-if="products?.length"
							:isLoading="isProductLoading"
							:products="products"
							:totalProducts="data?.products_aggregated[0].count?.id"
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
