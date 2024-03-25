<script setup>
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

	const currentPage = ref(1)
	const totalPages = ref(0)
	const productsPerPage = ref(!isMobile.value ? 9 : 10) // Количество продуктов на странице
	const currentBrand = ref('')
	const currentCollection = ref('')
	const currentColor = ref('')
	const currentSize = ref('')
	const currentCategory = ref(['All'])
	const currentMinPrice = ref()
	const currentMaxPrice = ref()

	const {data: count} = await useAsyncData('countOfProducts', () => {
		return $directus.request(
			aggregate('products', {
				aggregate: {count: '*'},
			}),
		)
	})

	const filters = ref({
		collection: {
			_in: currentCollection.value,
		},
		brand: {
			_in: currentBrand.value,
		},
		category: {
			_in: currentCategory.value,
		},
		color: {
			_in: currentColor.value,
		},
		size: {
			_in: currentSize.value,
		},
		price: {
			_lte: 0,
		},
	})

	const {data: products} = await useLazyAsyncData(
		() => {
			return getItems({
				collection: 'products',
				params: {
					fields: ['title', 'price', 'main_image', 'id'],
					sort: ['-date_created'],
					filters: filters.value,
					limit: productsPerPage.value,
					offset: currentPage.value,
				},
			})
		},
		{
			watch: [currentPage, filters],
		},
	)

	watchEffect(() => {
		totalPages.value = Math.ceil(count.value[0].count / productsPerPage.value)
	})

	watch([currentPage], () => {
		window.scrollTo(0, 0)
	})

	const {data: catalogBanners} = await useLazyAsyncData(() => {
		return getItems({
			collection: 'catalog_files',
		})
	})

	const {data: categories} = await useLazyAsyncData('categories', () => {
		return getItems({
			collection: 'categories',
			params: {
				fields: ['title', 'title_eng', 'id'],
			},
		})
	})

	const {data: brands} = await useLazyAsyncData('catalogBrands', () => {
		return getItems({
			collection: 'brands',
			params: {
				fields: ['title', 'description', 'id'],
			},
		})
	})

	const {data: colors} = await useLazyAsyncData('catalogColors', () => {
		return getItems({
			collection: 'colors',
			params: {
				fields: ['title', 'id'],
			},
		})
	})

	const {data: sizes} = await useLazyAsyncData('catalogSizes', () => {
		return getItems({
			collection: 'sizes',
			params: {
				fields: ['small_title', 'large_title', 'id'],
			},
		})
	})

	const {data: collections} = await useLazyAsyncData(
		'catalogCollections',
		() => {
			return getItems({
				collection: 'collection',
				params: {
					fields: ['title', 'id'],
				},
			})
		},
	)

	const {data: minPrice} = await useLazyAsyncData('maxPrice', () => {
		return $directus.request(
			aggregate('products', {
				aggregate: {min: 'price'},
			}),
		)
	})

	const {data: maxPrice} = await useLazyAsyncData('minPrice', () => {
		return $directus.request(
			aggregate('products', {
				aggregate: {max: 'price'},
			}),
		)
	})
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
							class="flex h-[3.125rem] w-full items-center justify-center gap-[0.625rem] rounded-[12px] border-[1px] border-black text-[0.625rem] max-mobile:h-[38px]"
						>
							<IconsSelect />
							<span>Новое</span>
						</button>

						<button
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
												:value="'All'"
												:checked="
													currentCategory.includes('All') &&
													currentCategory.length <= 1
												"
												v-model="currentCategory"
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
												:value="category.title"
												v-model="currentCategory"
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
								:currentFilter="currentCollection"
								@update:currentFilter="currentCollection = $event"
							/>
							<!-- /Коллекция -->

							<!-- Цвет -->
							<CatalogFilter
								:filters="colors"
								:title="`Цвет`"
								:currentFilter="currentColor"
								@update:currentFilter="currentColor = $event"
							/>
							<!-- /Цвет -->

							<!-- Размер -->
							<CatalogFilter
								:filters="sizes"
								:title="`Размер`"
								:currentFilter="currentSize"
								@update:currentFilter="currentSize = $event"
							/>
							<!-- /Размер -->

							<!-- Бренды -->
							<CatalogFilter
								:filters="brands"
								:title="`Бренд`"
								:currentFilter="currentBrand"
								@update:currentFilter="currentBrand = $event"
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
											v-model="currentMinPrice"
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
											v-model="currentMaxPrice"
											:placeholder="maxPrice[0].max.price"
											:min="minPrice[0].min.price"
											:max="maxPrice[0].max.price"
										/>
									</label>
								</div>
							</div>
							<!-- /Цена -->

							<div class="pt-[25px]">
								<NuxtPicture
									provider="directus"
									:src="page.main_banner"
									width="275"
									height="485"
								/>
							</div>
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
								v-if="currentBrand"
								class="mb-[3.75rem] rounded-[12px] border-[1px] border-gray p-[9px] text-[0.625rem] leading-[18px] max-laptop:hidden"
							>
								{{
									brands.find((el) => (el.title === currentBrand ? el : null))
										.description
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

								<!-- Вставить изображение после каждых трех продуктов -->
								<template v-if="(index + 1) % (!isMobile ? 3 : 2) === 0">
									<div
										v-if="
											catalogBanners?.length >
											((currentPage - 1) * productsPerPage) /
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
						<div class="w-ful relative border-t-[1px] border-[#AAAAAA]">
							<Paginator
								v-model:first="currentPage"
								:rows="productsPerPage"
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
					</div>
				</div>
			</div>
		</section>
	</div>
</template>
