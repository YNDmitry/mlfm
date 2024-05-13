<script setup lang="ts">
	const appConfig = useRuntimeConfig()
	const isMobile = useMediaQuery('(max-width: 768px)')
	const route = useRoute()
	const router = useRouter()

	const currentPage = ref(0)
	const totalPages = ref(0)
	const initialState = reactive({
		offset: currentPage.value,
		limit: isMobile.value ? 10 : 9,
		filter: {
			brandTitle: '',
			collectionId: route.query.collection || '',
			colors: route.query.color || [],
			size: route.query.size || '',
			categories: route.query.category || [],
			minPrice: route.query.minPrice || '',
			maxPrice: route.query.maxPrice || '',
		},
	})

	const {data: products, refresh} = await useAsyncData('products', () => {
		const {filter} = initialState

		const filters = {}

		// Фильтр по названию бренда
		if (filter.brandTitle) {
			filters.brand = {title: {_eq: filter.brandTitle}}
		}

		// Фильтр по ID коллекции
		if (filter.collectionId) {
			filters.collection = {title: {_eq: filter.collectionId}}
		}

		// Фильтр по цветам
		if (filter.colors.length > 0) {
			filters.colors = {colors_id: {title: {_eq: filter.colors}}}
		}

		// Фильтр по размеру
		if (filter.size) {
			filters.sizes = {sizes_id: {small_title: {_eq: filter.size}}}
		}

		// Фильтр по категориям
		if (filter.categories.length > 0) {
			filters.category = {title: {_in: filter.categories}}
		}

		// Фильтр по минимальной цене
		if (filter.minPrice) {
			filters.price = {_gte: filter.minPrice}
		}

		// Фильтр по максимальной цене
		if (filter.maxPrice) {
			filters.price = {...(filters.price || {}), _lte: filter.maxPrice}
		}

		return GqlProducts({
			page: Math.ceil(currentPage.value / initialState.limit) + 1,
			limit: initialState.limit,
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
		title: data.value?.catalog?.meta_title,
		ogTitle: data.value?.catalog?.meta_title,
		description: data.value?.catalog?.meta_description,
		ogDescription: data.value?.catalog?.meta_description,
		ogImage:
			appConfig.public.databaseUrl +
			'assets/' +
			data.value?.catalog?.og_image?.id,
		twitterImage:
			appConfig.public.databaseUrl +
			'assets/' +
			data.value?.catalog?.og_image?.id,
	})

	function resetFilters() {
		router.replace({query: {}}) // Очищаем query параметры
		Object.keys(initialState.filter).forEach((key) => {
			if (Array.isArray(initialState.filter[key])) {
				initialState.filter[key] = []
			} else {
				initialState.filter[key] = ''
			}
		})
		currentPage.value = 1 // Сброс текущей страницы на первую
		refresh() // Вызов функции обновления данных
	}

	// Наблюдение за изменениями фильтров и страницы, и обновление продуктов при их изменении
	watch(
		() => [currentPage, initialState.filter],
		() => {
			refresh()
			window.scrollTo(0, 0) // Возвращаем пользователя к началу страницы при смене фильтров
		},
		{deep: true},
	)

	watch(
		() => [initialState.filter],
		() => {
			currentPage.value = 0 // Сбрасываем текущую страницу
			refresh() // Перезагрузка данных
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
					<div
						class="items-center justify-between gap-4 pb-[2.5rem] pt-[70] max-laptop:flex laptop:hidden"
					>
						<button
							type="button"
							class="flex h-[3.125rem] w-full items-center justify-center gap-[0.625rem] rounded-[12px] border-[1px] border-black text-[0.625rem] max-mobile:h-[38px]"
						>
							<IconsSelect />
							<span>Новое</span>
						</button>

						<button
							type="button"
							class="flex h-[3.125rem] w-full items-center justify-center gap-[0.625rem] rounded-[12px] border-[1px] border-black text-[0.625rem] max-mobile:h-[38px]"
						>
							<IconsFilters />
							<span>Фильтры</span>
						</button>
					</div>
					<!-- Кнопки для фильтров (На Мобилках) -->

					<!-- Боковое меню (На ПК) -->
					<aside class="pb-[4.375rem] max-laptop:hidden">
						<div class="relative">
							<p
								v-if="totalProducts"
								class="relative mb-[1.875rem] pb-[35px] text-[12px] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-gray2 after:content-['']"
							>
								{{ totalProducts }} Товаров
							</p>

							<!-- Чекбоксы -->
							<div
								class="relative pb-[1.25rem] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-gray2 after:content-['']"
								data-lenis-prevent
								v-if="categories"
							>
								<p class="pb-[1.25rem] text-[0.875rem]">Категория</p>

								<ScrollPanel style="width: 100%; height: 140px">
									<div class="flex flex-col gap-[0.625rem] text-[0.625rem]">
										<label
											class="flex cursor-pointer items-center gap-[0.625rem]"
											v-for="category in categories.categories"
											:key="category.id"
										>
											<input
												type="checkbox"
												class="absolute h-5 w-5 cursor-pointer opacity-0"
												:value="category.title"
												v-model="initialState.filter.categories"
											/>

											<div
												class="flex h-5 w-5 cursor-pointer items-center justify-center border-[1px] border-grayLight"
											>
												<IconsCheckbox />
											</div>

											<span>{{ category.title }}</span>
										</label>
									</div>
								</ScrollPanel>

								<!-- Reset button -->
								<div class="flex items-center gap-[5px] pt-[1.25rem]">
									<IconsReset />
									<button
										@click="resetFilters"
										class="text-[8px] leading-[1.188rem] underline hover:no-underline"
									>
										Сбросить параметры
									</button>
								</div>
								<!-- /Reset button -->
							</div>
							<!-- /Чекбоксы -->

							<!-- Коллекция -->
							<CatalogFilter
								:filters="data?.collection"
								:title="`Коллекция`"
								:currentFilter="initialState.filter.collectionId"
								@update:currentFilter="
									initialState.filter.collectionId = $event
								"
							/>
							<!-- /Коллекция -->

							<!-- Цвет -->
							<CatalogFilter
								:filters="data?.colors"
								:title="`Цвет`"
								:currentFilter="initialState.filter.colors"
								@update:currentFilter="initialState.filter.colors = $event"
							/>
							<!-- /Цвет -->

							<!-- Размер -->
							<CatalogFilter
								:filters="
									data?.sizes.map((el: any) => (el = {title: el.small_title}))
								"
								:title="`Размер`"
								:currentFilter="initialState.filter.size"
								@update:currentFilter="initialState.filter.size = $event"
							/>
							<!-- /Размер -->

							<!-- Бренды -->
							<CatalogFilter
								:filters="data?.brands"
								:title="`Бренд`"
								:currentFilter="initialState.filter.brandTitle"
								@update:currentFilter="initialState.filter.brandTitle = $event"
							/>
							<!-- /Бренды -->

							<!-- Цена -->
							<div
								class="relative flex flex-col gap-[1.25rem] pb-[25px] pt-[25px] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-gray2 after:content-['']"
							>
								<span class="text-[0.875rem]">Цена</span>

								<div
									class="flex justify-between gap-[0.625rem] text-[0.625rem]"
								>
									<label
										class="rounded-full flex min-h-[46px] w-full cursor-pointer items-center justify-center gap-[2px] border"
									>
										<span
											class="pointer-events-none whitespace-nowrap text-nowrap"
											>От -
										</span>

										<input
											class="w-[72px] focus:outline-none"
											type="number"
											:placeholder="minPrice"
											:min="minPrice"
											:max="maxPrice"
											v-model="initialState.filter.minPrice"
										/>
									</label>

									<label
										class="rounded-full flex min-h-[46px] w-full cursor-pointer items-center justify-center gap-[2px] border"
									>
										<span
											class="pointer-events-none whitespace-nowrap text-nowrap"
											>До -
										</span>

										<input
											class="w-[72px] focus:outline-none"
											type="number"
											:placeholder="maxPrice"
											:min="minPrice"
											:max="maxPrice"
											v-model="initialState.filter.maxPrice"
										/>
									</label>
								</div>
								<button
									v-if="
										initialState.filter.maxPrice || initialState.filter.minPrice
									"
									@click="console.log('hello')"
								>
									Приминить
								</button>
							</div>
							<!-- /Цена -->

							<!-- Баннер -->
							<div class="pt-[25px]" v-if="data?.catalog?.main_banner?.id">
								<NuxtImg
									provider="directus"
									:src="data?.catalog?.main_banner?.id"
									width="275"
									height="485"
									format="webp"
								/>
							</div>
							<!-- /Баннер -->
						</div>
					</aside>
					<!-- /Боковое меню (На ПК)-->

					<div class="max-laptop:pb-[3.75rem] laptop:pb-[4.375rem]">
						<!-- Хлебные крошки -->
						<div class="pb-[3.125rem] pt-[8px] text-[12px] max-laptop:hidden">
							<NuxtLink to="/">Главная</NuxtLink>
							/
							<NuxtLink to="/catalog">Каталог</NuxtLink>
						</div>
						<!-- /Хлебные крошки -->

						<!-- О бренде -->
						<div v-auto-animate>
							<p
								v-if="initialState.filter.brandTitle"
								class="mb-[3.75rem] rounded-[12px] border-[1px] border-gray p-[9px] text-[0.625rem] leading-[18px] max-laptop:hidden"
							>
								{{
									data.brands.find((el: any) =>
										el.title === initialState.filter.brandTitle ? el : null,
									).description
								}}
							</p>
						</div>
						<!-- /О бренде -->

						<!-- Раздел с карточками -->
						<div
							class="grid grid-cols-catalog gap-[1.875rem] pb-[3.75rem] max-tablet:grid-cols-[1fr_1fr]"
						>
							<template
								v-for="(product, index) in products?.products"
								:key="product.id"
							>
								<ProductCard
									:id="product.id"
									:title="product.title ?? undefined"
									:imgSrc="product.main_image?.id"
									:price="product.price ?? undefined"
									class="animation-duration-2000 flex-shrink-0 transition-all"
								/>

								<!-- изображение -->
								<template v-if="(index + 1) % (!isMobile ? 3 : 2) === 0">
									<div
										v-if="
											data.catalog?.random_banners.length >
											((currentPage - 1) * initialState.limit) /
												(!isMobile ? 3 : 2) +
												index / (!isMobile ? 3 : 2)
										"
										class="col-span-3 w-full overflow-hidden max-tablet:col-span-2"
									>
										<NuxtImg
											provider="directus"
											:src="
												data.catalog?.random_banners[
													Math.floor(index / (!isMobile ? 3 : 2)) %
														data.catalog?.random_banners?.length
												].directus_files_id.id
											"
											class="h-auto max-w-full"
											width="955"
											format="webp"
										/>
									</div>
								</template>
							</template>
						</div>
						<!-- /Раздел с карточками -->

						<!-- Пагинация -->
						<div
							class="w-ful relative border-t-[1px] border-[#AAAAAA]"
							v-if="products?.products.length !== 0"
						>
							<Paginator
								v-model:first="currentPage"
								:rows="initialState.limit"
								:totalRecords="totalProducts"
								template="PrevPageLink CurrentPageReport NextPageLink"
								:currentPageReportTemplate="
									!isMobile
										? '{currentPage} из {totalPages}'
										: '{currentPage} из {totalPages}'
								"
								:pt="{
									root: 'px-0',
									paginator: 'w-full',
									previouspagebutton: 'mr-auto',
									nextpagebutton: 'ml-auto',
								}"
							/>
						</div>
						<!-- /Пагинация -->
						<div
							v-if="products?.products.length === 0"
							class="mx-auto flex w-full max-w-[500px] flex-col justify-center gap-5 text-center"
						>
							<div>Продуктов по данным фильтрам не найдено</div>
							<button
								@click="resetFilters"
								type="button"
								class="relative flex w-full items-center justify-center bg-red2 text-primary transition-colors hover:bg-red2-hover disabled:pointer-events-none disabled:opacity-70 max-tablet:min-h-[1.875rem] max-tablet:rounded-[1.25rem] max-tablet:text-[0.625rem] tablet:min-h-[45px] tablet:rounded-[1.875rem]"
							>
								Сбросить фильтры
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>
