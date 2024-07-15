<script setup lang="ts">
	import {options} from '../../components/Catalog/constans'

	const appConfig = useRuntimeConfig()
	const isMobile = useMediaQuery('(max-width: 768px)')
	const route = useRoute()
	const router = useRouter()

	const currentPage = ref(0)
	const totalPages = ref(0)
	const currentLimit = ref(9)

	const currentSort = ref('')
	const sortOptions = ref(options)

	const initialState = reactive({
		offset: currentPage.value,
		filter: {
			brandTitle: null,
			collectionId: route.query.collection || null,
			colors: route.query.color || null,
			size: route.query.size || null,
			categories: route.query.category || [],
			minPrice: route.query.minPrice || null,
			maxPrice: route.query.maxPrice || null,
		},
	})

	const {data: products, refresh} = await useAsyncData('products', () => {
		const {filter} = initialState
		const filters: any = {}

		if (filter.brandTitle) {
			filters.brand = {title: {_eq: filter.brandTitle}}
		}

		if (filter.collectionId) {
			filters.collection = {title: {_eq: filter.collectionId}}
		}

		if (filter.colors !== null) {
			filters.colors = {colors_id: {title: {_eq: filter.colors}}}
		}

		if (filter.size) {
			filters.sizes = {sizes_id: {small_title: {_eq: filter.size}}}
		}

		if (filter.categories.length > 0) {
			filters.category = {title: {_in: filter.categories}}
		}

		if (filter.minPrice) {
			filters.price = {_gte: filter.minPrice}
		}

		if (filter.maxPrice) {
			filters.price = {...(filters.price || {}), _lte: filter.maxPrice}
		}

		return GqlProducts({
			page: currentPage.value + 1,
			limit: currentLimit.value,
			sort:
				currentSort?.value.length === 0
					? ['-date_created']
					: currentSort.value?.code,
			filter: filters,
		})
	})

	const {data} = await useAsyncGql(
		'Catalog',
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
		title: data.value?.catalog?.SEO?.meta_title,
		ogTitle: data.value?.catalog?.SEO?.meta_title,
		description: data.value?.catalog?.SEO?.meta_description,
		ogDescription: data.value?.catalog?.SEO?.meta_description,
		ogImage:
			appConfig.public.databaseUrl +
			'assets/' +
			data.value?.catalog?.SEO.og_image?.id,
		twitterImage:
			appConfig.public.databaseUrl +
			'assets/' +
			data.value?.catalog?.SEO?.og_image?.id,
	})

	function resetFilters() {
		router.replace({query: {}})
		Object.keys(initialState.filter).forEach((key) => {
			if (Array.isArray(initialState.filter[key])) {
				initialState.filter[key] = null || []
			} else {
				initialState.filter[key] = null
			}
		})
		currentPage.value = 0
		refresh()
	}

	function updateQueryParams() {
		const queryParams: any = {}
		// Добавляем только определенные фильтры в URL
		if (currentSort.value) queryParams.sort = currentSort.value
		if (initialState.filter.brandTitle)
			queryParams.brandTitle = initialState.filter.brandTitle
		if (initialState.filter.collectionId)
			queryParams.collection = initialState.filter.collectionId
		if (initialState.filter.colors !== null)
			queryParams.color = initialState.filter.colors.join(',')
		if (initialState.filter.size) queryParams.size = initialState.filter.size
		if (initialState.filter.categories.length > 0)
			queryParams.category = initialState.filter.categories.join(',')
		if (initialState.filter.minPrice)
			queryParams.minPrice = initialState.filter.minPrice
		if (initialState.filter.maxPrice)
			queryParams.maxPrice = initialState.filter.maxPrice

		router.push({query: queryParams})
	}

	function updateLimit(newLimit: number) {
		currentLimit.value = newLimit
		refresh()
		updateQueryParams()
	}

	function updatePage(newPage: any) {
		currentPage.value = newPage.page
		refresh()
		window.scrollTo(0, 0)
		updateQueryParams()
	}

	function updateCollection(newCollection: string) {
		initialState.filter.collectionId = newCollection
	}

	watch(
		() => [currentSort, initialState.filter],
		() => {
			refresh()
			currentPage.value = 0
			window.scrollTo(0, 0)
			document.querySelector('header')?.classList.remove('translate-y-[-100%]')
		},
		{deep: true},
	)

	watch(
		() => initialState.filter,
		(newFilters) => {
			const filteredQuery = Object.entries(newFilters).reduce(
				(acc, [key, value]) => {
					if (value) {
						if (Array.isArray(value) && value.length > 0) {
							acc[key] = value.join(',')
						} else if (!Array.isArray(value) && value !== '') {
							acc[key] = value
						}
					}
					return acc
				},
				{},
			)
			router.push({query: filteredQuery})
		},
		{deep: true},
	)

	watch(
		() => route,
		() => {
			updateQueryParams()
		},
	)

	const minPrice = computed(() =>
		Intl.NumberFormat('ru-RU', {
			style: 'currency',
			currency: 'RUB',
		}).format(data.value.products_aggregated[0].min.price),
	)
	const maxPrice = computed(() =>
		Intl.NumberFormat('ru-RU', {
			style: 'currency',
			currency: 'RUB',
		}).format(data.value.products_aggregated[0].max.price),
	)

	const totalProducts = data?.value?.products_aggregated[0].count?.id
</script>

<template>
	<div>
		<section class="pt-[3.75rem]">
			<div class="container max-w-[1342px]">
				<div class="laptop:grid laptop:grid-cols-aside laptop:gap-20">
					<!-- Кнопки для фильтров (На Мобилках) -->
					<CatalogMobileFilterSidebar
						:currentSort="currentSort"
						:sortOptions="sortOptions"
						@update:currentSort="($event) => (currentSort = $event)"
						:totalProducts="totalProducts"
						:categories="categories.categories"
						:filters="initialState.filter"
						:data="data"
						:resetFilters="resetFilters"
						:minPrice="minPrice"
						:maxPrice="maxPrice"
						@updateCollection="updateCollection"
					/>
					<!-- Кнопки для фильтров (На Мобилках) -->

					<!-- Боковое меню (На ПК) -->
					<CatalogDesktopFilterSidebar
						:totalProducts="totalProducts"
						:categories="categories.categories"
						:filters="initialState.filter"
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
										<div v-if="slotProps.value" class="align-items-center flex">
											<div>{{ slotProps.value.name }}</div>
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
								v-if="initialState.filter.brandTitle"
								class="mb-[3.75rem] rounded-[12px] border-[1px] border-gray p-[9px] text-[0.625rem] leading-[18px]"
							>
								{{
									data.brands.find((el) =>
										el.title === initialState.filter.brandTitle ? el : null,
									).description
								}}
							</p>
						</div>
						<!-- /О бренде -->

						<CatalogProductList
							:products="products?.products"
							:data="data"
							:totalProducts="totalProducts"
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

<style>
	#sort-wrapper .p-select-option-selected {
		@apply bg-red2 text-primary;
	}
</style>
