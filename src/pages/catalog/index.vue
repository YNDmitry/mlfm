<script setup lang="ts">
	import {options} from '../../components/Catalog/constans'

	const appConfig = useRuntimeConfig()
	const router = useRouter()
	const route = useRoute()
	const sortOptions = ref(options)

	const currentPage = ref(route.query.page || 0)
	const currentLimit = ref(route.query.limit || 9)
	const currentSort = ref(options[0])
	const isProductsLoading = ref(false)

	const {products, refresh} = useProducts(
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

	watch(
		() => route.query,
		() => {
			isProductsLoading.value = true
		},
	)

	// Обновляем фильтры, если изменяются параметры маршрута
	watchDebounced(
		() => route.query,
		async () => {
			await refresh().then(() => (isProductsLoading.value = false))
		},
		{debounce: 500, maxWait: 500},
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

	function updateLimit(newLimit: number) {
		router.push({query: {...route.query, limit: newLimit}})
	}

	function updatePage(newPage: number) {
		router.push({query: {...route.query, page: newPage.page + 1}})
		window.scrollTo(0, 0)
	}

	const minPrice = usePrice(data?.value.products_aggregated[0]?.min?.price)
	const maxPrice = usePrice(data.value.products_aggregated[0]?.max?.price)
	const minPriceValue = useRouteQuery('minPrice', null)
	const maxPriceValue = useRouteQuery('maxPrice', null)
	const totalProducts = ref(
		data?.value?.products_aggregated[0].count?.id as number,
	)
	const categories = useState('categories', () => data.value.categories)
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
						:minPrice="minPrice"
						:maxPrice="maxPrice"
						:sort-options="sortOptions"
					/>
					<!-- Кнопки для фильтров (На Мобилках) -->

					<!-- Боковое меню (На ПК) -->
					<CatalogDesktopFilterSidebar
						v-if="$device.isDesktop"
						:data="data"
						:resetFilters="resetFilters"
						:totalProducts="totalProducts"
						:minPrice="minPrice"
						:maxPrice="maxPrice"
						v-model:min-price="minPriceValue"
						v-model:max-price="maxPriceValue"
						class="max-tablet:hidden"
					/>
					<!-- /Боковое меню (На ПК)-->

					<div class="max-laptop:pb-[3.75rem] laptop:pb-[4.375rem]">
						<!-- Хлебные крошки -->
						<div
							class="flex items-center justify-between pb-[3.125rem] pt-[8px] max-tablet:hidden"
						>
							<div class="text-[12px]">
								<NuxtLink to="/">Главная</NuxtLink>
								/
								<NuxtLink to="/catalog">Каталог</NuxtLink>
							</div>
							<div id="sort-wrapper" class="relative">
								<Select
									v-model="currentSort"
									:options="sortOptions"
									@update:modelValue="
										router.replace({
											query: {...route.query, sort: currentSort.code},
										})
									"
									optionLabel="sort"
									placeholder="Сортировка"
									:pt="{
										root: 'shadow-none outline-none !max-h-none items-center gap-4',
										label: 'text-black p-0 text-black text-[12px]',
										wrapper: '!max-h-none',
										overlay: '!left-auto !right-0 !top-[30px]',
										dropdownicon: 'text-black',
										dropdown: 'w-[14px] h-[14px]',
									}"
									append-to="#sort-wrapper"
								>
									<template #value="slotProps">
										<div v-if="slotProps" class="align-items-center flex">
											<div>
												{{
													slotProps?.value?.name
														? slotProps?.value?.name
														: 'Сортировка'
												}}
											</div>
										</div>
										<span v-else>
											{{ slotProps.placeholder }}
										</span>
									</template>
									<template #option="slotProps">
										<div class="align-items-center flex text-[12px]">
											<div>{{ slotProps.option.name }}</div>
										</div>
									</template>
								</Select>
							</div>
						</div>
						<!-- /Хлебные крошки -->

						<!-- О бренде -->
						<div v-auto-animate>
							<p
								v-if="route.query.brand"
								class="mb-[3.75rem] rounded-[12px] border-[1px] border-gray p-[9px] text-[0.625rem] leading-[18px]"
							>
								{{
									data.brands.find((el) => el.title === route.query.brand)
										?.description
								}}
							</p>
						</div>
						<!-- /О бренде -->

						<CatalogProductList
							:isLoading="isProductsLoading"
							:products="products?.products"
							:totalProducts="totalProducts"
							:data="data"
							:isMobile="$device.isMobile"
							:currentPage="currentPage"
							:currentLimit="currentLimit"
							@resetFilters="resetFilters"
							@updateLimit="updateLimit"
							@updatePage="updatePage"
						/>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<style>
	#sort-wrapper .p-select-option.p-select-option-selected {
		@apply bg-red2 text-primary;
	}

	[data-pc-section='listcontainer'] .p-select-option.p-select-option-selected {
		@apply bg-red2 text-primary;
	}
</style>
