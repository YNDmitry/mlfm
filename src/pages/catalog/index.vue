<script setup lang="ts">
	const {getThumbnail: img} = useDirectusFiles()
	const {getItems} = useDirectusItems()
	const {$directus} = useNuxtApp()
	import {aggregate} from '@directus/sdk'
	const isMobile = useMediaQuery('(max-width: 479px)')

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
		description: page.value.meta_description,
		ogImage: img(page.value.og_image),
	})

	const {data: products} = await useLazyAsyncData('catalogProducts', () => {
		return getItems({
			collection: 'products',
			params: {
				fields: ['title', 'price', 'main_image', 'id'],
			},
		})
	})

	const {data: categories} = await useLazyAsyncData('categories', () => {
		return getItems({
			collection: 'categories',
			params: {
				fields: ['title', 'id'],
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

	const {data: count} = await useLazyAsyncData('countOfProducts', () => {
		return $directus.request(
			aggregate('products', {
				aggregate: {count: '*'},
			}),
		)
	})

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

	const currentBrand = ref('Бренд')
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
							class="flex h-[3.125rem] w-full max-w-[250px] items-center justify-center gap-[0.625rem] rounded-[12px] border-[1px] border-black text-[0.625rem] max-mobile:h-[28px]"
						>
							<IconsSelect />
							<span>Новое</span>
						</button>

						<button
							class="flex h-[3.125rem] w-full max-w-[250px] items-center justify-center gap-[0.625rem] rounded-[12px] border-[1px] border-black text-[0.625rem] max-mobile:h-[28px]"
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
							<div
								v-if="collections"
								class="relative flex flex-col gap-[1.25rem] pb-[0.625rem] pt-[1.25rem] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-gray2 after:content-['']"
							>
								<span class="text-[0.875rem]">Коллекция</span>

								<select class="h-[1.25rem] cursor-pointer text-[0.625rem]">
									<option value="defulat">Коллекция</option>
									<option
										v-for="collection in collections"
										:key="collection.id"
										:value="collection.title"
									>
										{{ collection.title }}
									</option>
								</select>
							</div>
							<!-- /Коллекция -->

							<!-- Цвет -->
							<div
								v-if="colors"
								class="relative flex flex-col gap-[1.25rem] pb-[0.625rem] pt-[1.25rem] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-gray2 after:content-['']"
							>
								<span class="text-[0.875rem]">Цвет</span>

								<select class="h-[1.25rem] cursor-pointer text-[0.625rem]">
									<option value="default">Цвет</option>
									<option
										:value="color.title"
										v-for="color in colors"
										:key="color.id"
									>
										{{ color.title }}
									</option>
								</select>
							</div>
							<!-- /Цвет -->

							<!-- Бренды -->
							<div
								v-if="brands"
								class="relative flex flex-col gap-[1.25rem] pb-[0.625rem] pt-[1.25rem] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-gray2 after:content-['']"
							>
								<span class="text-[0.875rem]">Бренд</span>

								<select
									v-model="currentBrand"
									class="h-[1.25rem] cursor-pointer text-[0.625rem]"
								>
									<option value="Бренд">Бренд</option>
									<option
										v-for="brand in brands"
										:key="brand.id"
										:value="brand.title"
									>
										{{ brand.title }}
									</option>
								</select>
							</div>
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
										for="inp1"
										class="rounded-full flex min-h-[46px] w-full cursor-pointer items-center justify-center gap-[2px] border"
									>
										<span
											class="pointer-events-none whitespace-nowrap text-nowrap"
											>От -
										</span>

										<input
											class="w-[72px] focus:outline-none"
											type="number"
											:value="minPrice[0].min.price"
										/>
									</label>

									<label
										for="inp2"
										class="rounded-full flex min-h-[46px] w-full cursor-pointer items-center justify-center gap-[2px] border"
									>
										<span
											class="pointer-events-none whitespace-nowrap text-nowrap"
											>До -
										</span>

										<input
											class="w-[72px] focus:outline-none"
											type="number"
											:value="maxPrice[0].max.price"
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
						<p
							v-if="currentBrand !== 'Бренд'"
							class="mb-[3.75rem] rounded-[12px] border-[1px] border-gray p-[9px] text-[0.625rem] leading-[18px] max-laptop:hidden"
						>
							{{
								brands.find((brand) => brand.title === currentBrand)
									.description || ''
							}}
						</p>
						<!-- /О бренде -->

						<!-- Раздел с карточками -->
						<div class="grid grid-cols-catalog gap-[1.875rem] pb-[3.75rem]">
							<template v-for="product in products" :key="product.id">
								<ProductCard
									v-animateonscroll="{
										enterClass: 'fadein',
									}"
									:id="product.id"
									:title="product.title"
									:imgSrc="product.main_image"
									:price="product.price"
									class="animation-duration-2000 max-w-[18.5rem] flex-shrink-0 transition-all"
								/>
							</template>
						</div>
						<!-- /Раздел с карточками -->

						<!-- Изображение -->
						<!-- <div
							class="overflow-hidden max-laptop:mx-[-16px] max-laptop:pb-[3.75rem] laptop:pb-[6.25rem]"
						>
							<NuxtImg
								src="/img/catalog/1@2x.png"
								width="955"
								height="605"
								loading="lazy"
								decoding="auto"
							/>
						</div> -->
						<!-- /Изображение -->

						<!-- Пагинация -->
						<div class="w-ful relative border-t-[1px] border-[#AAAAAA]">
							<Paginator
								:rows="10"
								:totalRecords="120"
								template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
								:currentPageReportTemplate="
									!isMobile
										? 'Страница {currentPage} из {totalPages}'
										: '{currentPage} из {totalPages}'
								"
								class="w-full"
							/>
						</div>
						<!-- /Пагинация -->
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<style>
	.p-paginator.p-component {
		@apply w-full;
	}

	[data-pc-section='previouspagebutton'] {
		@apply mr-auto;
	}

	[data-pc-section='nextpagebutton'] {
		@apply ml-auto;
	}
</style>
