<script setup lang="ts">
	import {options} from '../../components/Catalog/constans'

	const appConfig = useRuntimeConfig()
	const isMobile = useMediaQuery('(max-width: 768px)')
	const router = useRouter()
	const sortOptions = ref(options)

	const {currentPage, currentLimit, currentSort, filters} = useFilters()
	const {products, refresh} = useProducts(
		filters,
		currentPage,
		currentLimit,
		currentSort,
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
		Object.keys(filters).forEach((key) => {
			if (Array.isArray(filters[key])) {
				filters[key] = null || []
			} else {
				filters[key] = null
			}
		})
		currentPage.value = 0
		refresh()
	}

	function updateLimit(newLimit: number) {
		currentLimit.value = newLimit
		refresh()
	}

	function updatePage(newPage: number) {
		currentPage.value = newPage
		refresh()
		window.scrollTo(0, 0)
	}

	function updateCollection(newCollection: string) {
		filters.collectionId = newCollection
	}

	const minPrice = usePrice(data?.value.products_aggregated[0]?.min?.price)
	const maxPrice = usePrice(data.value.products_aggregated[0]?.max?.price)
	const totalProducts = computed(
		() => data?.value?.products_aggregated[0].count?.id,
	)
</script>

<template>
	<div>
		<section class="pt-[3.75rem]">
			<div class="container max-w-[1342px]">
				<div class="laptop:grid laptop:grid-cols-aside laptop:gap-20">
					<!-- Кнопки для фильтров (На Мобилках) -->
					<CatalogMobileFilterSidebar
						:currentSort="currentSort"
						@update:currentSort="($event) => (currentSort = $event)"
						:totalProducts="totalProducts"
						:categories="data?.categories"
						:filters="filters"
						:data="data"
						:resetFilters="resetFilters"
						:minPrice="minPrice"
						:maxPrice="maxPrice"
						@updateCollection="updateCollection"
						:sort-options="sortOptions"
					/>
					<!-- Кнопки для фильтров (На Мобилках) -->

					<!-- Боковое меню (На ПК) -->
					<CatalogDesktopFilterSidebar
						:totalProducts="totalProducts"
						:categories="data?.categories"
						:filters="filters"
						:data="data"
						:resetFilters="resetFilters"
						:minPrice="minPrice"
						:maxPrice="maxPrice"
						@updateCollection="updateCollection"
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
											<div>{{ slotProps.name }}</div>
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
								v-if="filters.brandTitle"
								class="mb-[3.75rem] rounded-[12px] border-[1px] border-gray p-[9px] text-[0.625rem] leading-[18px]"
							>
								{{
									data.brands.find((el) => el.title === filters.brandTitle)
										?.description
								}}
							</p>
						</div>
						<!-- /О бренде -->

						<CatalogProductList
							:products="products?.products"
							:totalProducts="totalProducts"
							:data="data"
							:currentPage="currentPage"
							:currentLimit="currentLimit"
							:isMobile="isMobile"
							@resetFilters="resetFilters"
							@updateLimit="updateLimit"
							@updatePage="updatePage"
							@updateCollection="updateCollection"
						/>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>
