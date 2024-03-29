<script setup lang="ts">
	const appConfig = useRuntimeConfig()
	const {getItems} = useDirectusItems()
	const {$directus} = useNuxtApp()
	import {aggregate} from '@directus/sdk'
	const isMobile = useMediaQuery('(max-width: 768px)')

	const {data: page} = await useAsyncData(() => {
		return getItems({
			collection: 'catalog',
			params: {
				fields: ['meta_title', 'meta_description', 'og_image', 'main_banner'],
			},
		})
	})

	useSeoMeta({
		title: page.value.meta_title,
		ogTitle: page.value.meta_title,
		description: page.value.meta_description,
		ogDescription: page.value.meta_description,
		ogImage: appConfig.public.databaseUrl + 'assets/' + page.value.og_image,
		lang: 'ru',
		twitterImage:
			appConfig.public.databaseUrl + 'assets/' + page.value.og_image,
	})

	const route = useRoute()
	const router = useRouter()

	const initialFilters = {
		currentPage: 1,
		totalPages: 0,
		productsPerPage: isMobile.value ? 10 : 9,
		filters: {
			brand: route.query.brand || '',
			collection: route.query.collection || '',
			color: route.query.color || '',
			size: route.query.size || '',
			category: route.query.category || [],
		},
	}

	// Определение начальных состояний
	let initialState = reactive({...initialFilters})

	function resetFilters() {
		// Сброс каждого фильтра к его исходному значению
		router.replace({query: []})
		Object.keys(initialFilters).forEach((key) => {
			initialState[key] = initialFilters[key]
		})

		// Сброс текущей страницы к первой
		initialState.currentPage = 1

		// Вы можете добавить дополнительные действия по сбросу здесь, например, обновление продуктов
		updateProducts()
	}

	// Слежение за изменениями в route.query и обновление фильтров
	watch(
		() => route.query,
		(newQuery) => {
			initialState.filters.brand = newQuery.brand || ''
			initialState.filters.collection = newQuery.collection || ''
			initialState.filters.color = newQuery.color || ''
			initialState.filters.size = newQuery.size || ''
			initialState.filters.category = newQuery.category || ''
		},
	)

	const {data: count} = await useAsyncData('countOfProducts', () => {
		return $directus.request(
			aggregate('products', {
				aggregate: {count: '*'},
			}),
		)
	})

	// Асинхронное получение продуктов с примененными фильтрами
	async function getProducts() {
		return await getItems({
			collection: 'products',
			params: {
				fields: ['title', 'price', 'main_image', 'id'],
				sort: ['-date_created'],
				filter: {
					// Обновите логику фильтрации здесь в соответствии с ваш ими требованиями и структурой данных
					...(initialState.filters.brand && {
						brand: {
							_eq: brands.value.find(
								(el) => el.title === initialState.filters.brand,
							).id,
						},
					}),
					...(initialState.filters.collection && {
						collection: {
							_eq: collections.value.find(
								(el) => el.title === initialState.filters.collection,
							).id,
						},
					}),
					...(initialState.filters.color && {
						color: {_eq: initialState.filters.color},
					}),
					// ...(initialState.filters.size && {
					// 	size: {_contains: initialState.filters.size},
					// }),
					...(initialState.filters.category.length > 0 && {
						category: {_in: initialState.filters.category},
					}),
					// Убедитесь, что ваша логика фильтрации по цене соответствует требуемой логике
					// ...(initialState.filters.price._lte > 0 && {
					// 	price: {_lte: initialState.filters.price._lte},
					// }),
				},
				limit: initialState.productsPerPage,
				offset: initialState.currentPage - 1,
			},
		})
	}

	const {data: products, refresh: refreshProducts} =
		await useAsyncData(getProducts)

	// Функция обновления продуктов (вызывается при изменении фильтров или страницы)
	async function updateProducts() {
		refreshProducts()
	}

	// Наблюдение за изменениями фильтров и страницы, и обновление продуктов при их изменении
	watch(
		() => [initialState.currentPage, initialState.filters],
		() => {
			updateProducts()
			window.scrollTo(0, 0) // Возвращаем пользователя к началу страницы при смене фильтров
		},
		{deep: true},
	)

	// Расчет общего количества страниц для пагинации
	watchEffect(() => {
		initialState.totalPages = Math.ceil(
			count.value?.[0]?.count / initialState.productsPerPage,
		)
	})

	// Обновление URL при изменении фильтров (опционально)
	watch(
		() => initialState.filters,
		(newFilters) => {
			const filteredQuery = Object.entries(newFilters).reduce(
				(acc, [key, value]) => {
					// Если значение не пустое, добавляем его в аккумулирующий объект
					if (value) {
						// Здесь можно добавить более сложные условия для "непустых" значений
						acc[key] = value
					}
					return acc
				},
				{},
			)

			router.push({query: filteredQuery})
		},
		{deep: true},
	)

	// Дополнительные данные для страницы (баннеры, категории, бренды, цвета, размеры и т.д.)
	const {data: catalogBanners} = await useLazyAsyncData(
		'catalogBanners',
		() => {
			const {data: cachedPage} = useNuxtData('catalogBanners')
			return cachedPage.value || getItems({collection: 'catalog_files'})
		},
	)
	const {data: categories} = await useLazyAsyncData('categories', () => {
		const {data: cachedPage} = useNuxtData('categories')
		return (
			cachedPage.value ||
			getItems({
				collection: 'categories',
				params: {fields: ['title', 'title_eng', 'id']},
			})
		)
	})

	const {data: brands} = await useLazyAsyncData('catalogBrands', () => {
		const {data: cachedPage} = useNuxtData('catalogBrands')
		return (
			cachedPage.value ||
			getItems({
				collection: 'brands',
				params: {fields: ['title', 'description', 'id']},
			})
		)
	})
	const {data: colors} = await useLazyAsyncData('catalogColors', () => {
		const {data: cachedPage} = useNuxtData('catalogColors')
		return (
			cachedPage.value ||
			getItems({collection: 'colors', params: {fields: ['title', 'id']}})
		)
	})
	const {data: sizes} = await useLazyAsyncData('catalogSizes', () => {
		const {data: cachedPage} = useNuxtData('catalogSizes')
		return (
			cachedPage.value ||
			getItems({
				collection: 'sizes',
				params: {fields: ['small_title', 'large_title', 'id']},
			})
		)
	})
	const {data: collections} = await useLazyAsyncData(
		'catalogCollections',
		() => {
			const {data: cachedPage} = useNuxtData('catalogCollections')
			return (
				cachedPage.value ||
				getItems({collection: 'collection', params: {fields: ['title', 'id']}})
			)
		},
	)

	// Определение минимальной и максимальной цены для фильтра по цене
	const {data: minPrice} = await useLazyAsyncData('minPrice', () => {
		const {data: cachedPage} = useNuxtData('minPrice')
		return (
			cachedPage.value ||
			$directus.request(aggregate('products', {aggregate: {min: 'price'}}))
		)
	})
	const {data: maxPrice} = await useLazyAsyncData('maxPrice', () => {
		const {data: cachedPage} = useNuxtData('maxPrice')
		return (
			cachedPage.value ||
			$directus.request(aggregate('products', {aggregate: {max: 'price'}}))
		)
	})

	// Обновляем фильтр цены в зависимости от выбранных пользователем значений
	function updatePriceFilter(min, max) {
		initialState.filters.price._lte = max
		// Здесь может быть добавлена логика для обработки минимальной цены, если это необходимо
	}
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
								v-if="count"
								class="relative mb-[1.875rem] pb-[35px] text-[12px] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-gray2 after:content-['']"
							>
								{{ count[0].count }} Товаров
							</p>

							<!-- Чекбоксы -->
							<div
								class="relative pb-[1.25rem] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-gray2 after:content-['']"
								data-lenis-prevent
								v-if="categories"
							>
								<p class="pb-[1.25rem] text-[0.875rem]">Категория</p>

								<ScrollPanel style="width: 100%; height: 140px">
									<form class="flex flex-col gap-[0.625rem] text-[0.625rem]">
										<label
											class="flex cursor-pointer items-center gap-[0.625rem]"
										>
											<input
												type="checkbox"
												class="absolute h-5 w-5 cursor-pointer opacity-0"
												name="category"
												:value="'All'"
												v-model="initialState.filters.category"
												:checked="
													initialState.filters.category.length <= 1 ||
													initialState.filters.category.length ===
														categories.length
												"
											/>

											<div
												class="flex h-5 w-5 cursor-pointer items-center justify-center border-[1px] border-grayLight"
											>
												<IconsCheckbox />
											</div>

											<span>Все продукты</span>
										</label>

										<label
											class="flex cursor-pointer items-center gap-[0.625rem]"
											v-for="category in categories"
											:key="category.id"
										>
											<input
												type="checkbox"
												class="absolute h-5 w-5 cursor-pointer opacity-0"
												name="category"
												:value="category.title"
												@change="
													initialState.filters.category.push(
														$event.target.value,
													)
												"
											/>

											<div
												class="flex h-5 w-5 cursor-pointer items-center justify-center border-[1px] border-grayLight"
											>
												<IconsCheckbox />
											</div>

											<span>{{ category.title }}</span>
										</label>
									</form>
								</ScrollPanel>

								<!-- Reset button -->
								<div class="flex items-center gap-[5px] pt-[1.25rem]">
									<IconsReset />
									<button
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
								:filters="collections"
								:title="`Коллекция`"
								:currentFilter="initialState.filters.collection"
								@update:currentFilter="initialState.filters.collection = $event"
							/>
							<!-- /Коллекция -->

							<!-- Цвет -->
							<CatalogFilter
								:filters="colors"
								:title="`Цвет`"
								:currentFilter="initialState.filters.color"
								@update:currentFilter="initialState.filters.color = $event"
							/>
							<!-- /Цвет -->

							<!-- Размер -->
							<CatalogFilter
								:filters="sizes"
								:title="`Размер`"
								:currentFilter="initialState.filters.size"
								@update:currentFilter="initialState.filters.size = $event"
							/>
							<!-- /Размер -->

							<!-- Бренды -->
							<CatalogFilter
								:filters="brands"
								:title="`Бренд`"
								:currentFilter="initialState.filters.brand"
								@update:currentFilter="initialState.filters.brand = $event"
							/>
							<!-- /Бренды -->

							<!-- Цена -->
							<div
								v-if="minPrice && maxPrice"
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
											:placeholder="minPrice[0].min.price"
											:min="minPrice[0].min.price"
											:max="maxPrice[0].max.price"
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
											:placeholder="maxPrice[0].max.price"
											:min="minPrice[0].min.price"
											:max="maxPrice[0].max.price"
										/>
									</label>
								</div>
							</div>
							<!-- /Цена -->

							<!-- Баннер -->
							<div class="pt-[25px]">
								<NuxtPicture
									provider="directus"
									:src="page.main_banner"
									width="275"
									height="485"
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
								v-if="initialState.filters.brand"
								class="mb-[3.75rem] rounded-[12px] border-[1px] border-gray p-[9px] text-[0.625rem] leading-[18px] max-laptop:hidden"
							>
								{{
									brands.find((el) =>
										el.title === initialState.filters.brand ? el : null,
									).description
								}}
							</p>
						</div>
						<!-- /О бренде -->

						<!-- Раздел с карточками -->
						<div
							class="grid grid-cols-catalog gap-[1.875rem] pb-[3.75rem] max-tablet:grid-cols-[1fr_1fr]"
						>
							<template v-for="(product, index) in products" :key="product.id">
								<ProductCard
									:id="product.id"
									:title="product.title"
									:imgSrc="product.main_image"
									:price="product.price"
									class="animation-duration-2000 flex-shrink-0 transition-all"
								/>

								<!-- изображение -->
								<template v-if="(index + 1) % (!isMobile ? 3 : 2) === 0">
									<div
										v-if="
											catalogBanners?.length >
											((initialState.currentPage - 1) *
												initialState.productsPerPage) /
												(!isMobile ? 3 : 2) +
												index / (!isMobile ? 3 : 2)
										"
										class="col-span-3 w-full overflow-hidden max-tablet:col-span-2"
									>
										<NuxtImg
											provider="directus"
											:src="
												catalogBanners[
													Math.floor(index / (!isMobile ? 3 : 2)) %
														catalogBanners?.length
												].directus_files_id
											"
											class="h-auto max-w-full"
											width="955"
										/>
									</div>
								</template>
							</template>
						</div>
						<!-- /Раздел с карточками -->

						<!-- Пагинация -->
						<div
							class="w-ful relative border-t-[1px] border-[#AAAAAA]"
							v-if="
								products?.length !== 0 &&
								products?.length >= initialState.productsPerPage &&
								initialState.currentPage !== 0
							"
						>
							<Paginator
								v-model:first="initialState.currentPage"
								:rows="initialState.productsPerPage"
								:totalRecords="Number(count[0].count)"
								template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
								:currentPageReportTemplate="
									!isMobile
										? 'Страница {currentPage} из {totalPages}'
										: '{currentPage} из {totalPages}'
								"
								:pt="{
									paginator: 'w-full',
									previouspagebutton: 'mr-auto',
									nextpagebutton: 'ml-auto',
								}"
							/>
						</div>
						<!-- /Пагинация -->
						<div
							v-if="products?.length === 0"
							class="mx-auto flex w-full max-w-[500px] flex-col justify-center gap-5 text-center"
						>
							<div>Продуктов по данным фильтрам не найдены</div>
							<button
								@click="resetFilters()"
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
