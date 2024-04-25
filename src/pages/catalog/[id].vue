<script setup lang="ts">
	const appConfig = useRuntimeConfig()
	const {getItems, getItemById} = useDirectusItems()

	const cartStore = useCartStore()

	definePageMeta({
		layout: 'default',
	})

	const {id} = useRoute().params

	const {data: product} = await useAsyncData(
		`product-${id}`,
		() => {
			return getItemById({
				collection: 'products',
				id: id,
			})
		},
		{
			getCachedData(key, nuxtApp) {
				return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
			},
		},
	)
	const {data: productColors} = await useAsyncData(
		`product-${id}-colors`,
		() => {
			if (product?.value?.colors?.length === 0) return null
			return getItems({
				collection: 'products_colors',
				params: {
					filter: {
						id: {
							_in: product.value.colors,
						},
					},
				},
			}).then((res) => {
				return getItems({
					collection: 'colors',
					params: {
						filter: {
							id: {
								_in: res.map((el) => (el = el.colors_id)),
							},
						},
					},
				})
			})
		},
		{
			getCachedData(key, nuxtApp) {
				return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
			},
		},
	)
	const {data: productSizes} = await useAsyncData(
		`product-${id}-sizes`,
		() => {
			if (product?.value?.sizes?.length === 0) return null
			return getItems({
				collection: 'products_sizes',
				params: {
					filter: {
						id: {
							_in: product.value.sizes,
						},
					},
				},
			}).then((res) => {
				return getItems({
					collection: 'sizes',
					params: {
						filter: {
							id: {
								_in: res.map((el) => (el = el.colors_id)),
							},
						},
					},
				})
			})
		},
		{
			getCachedData(key, nuxtApp) {
				return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
			},
		},
	)
	const {data: category} = await useAsyncData(
		`product-category-${id}`,
		() => {
			if (product?.value.category === null) return null

			return getItemById({
				collection: 'categories',
				id: product?.value.category,
			})
		},
		{
			getCachedData(key, nuxtApp) {
				return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
			},
		},
	)

	if (!product.value) {
		throw createError({
			statusCode: 404,
			statusMessage: 'Продукт не найден',
		})
	}

	useSeoMeta({
		title: product.value.title + ' | MLFM',
		ogTitle: product.value.title + ' | MLFM',
		description: product.value.description,
		ogDescription: product.value.description,
		ogImage:
			appConfig.public.databaseUrl + 'assets/' + product.value.main_image,
		twitterImage:
			appConfig.public.databaseUrl + 'assets/' + product.value.main_image,
	})

	const isRandomProductsPending = ref(true)
	const rProducts = ref(null)
	const initRandomProducts = async () => {
		try {
			const randomProducts = await getItems({
				collection: 'products',
				params: {
					fields: ['title', 'price', 'main_image', 'id'],
					filter: {
						id: {
							_neq: id,
						},
					},
					limit: 4,
				},
			})
			isRandomProductsPending.value = false
			return (rProducts.value = randomProducts)
		} catch (error) {
			console.log(error)
		}
	}
	await initRandomProducts()

	const toast = useToast()
	const handleAddToCart = () => {
		cartStore.addItem(product.value)
		toast.add({
			severity: 'success',
			summary: 'Успешно',
			detail: 'Товар в корзине',
			life: 3000,
		})
	}

	const price = computed(() =>
		Intl.NumberFormat('ru-RU', {
			style: 'currency',
			currency: 'RUB',
		}).format(product.value.price),
	)
</script>

<template>
	<div>
		<Toast :position="'top-right'" />
		<!-- Карточка товара -->
		<section class="pt-[78px] max-tablet:pt-0">
			<div class="mx-auto my-0 max-w-[1189px] px-[1rem]">
				<div class="flex gap-7 max-tablet:flex-col max-tablet:gap-4">
					<Swiper
						class="!sticky top-40 max-h-[650px] max-w-[700px] max-laptop:!static max-laptop:w-full max-tablet:h-[500px]"
						:slides-per-view="1"
						:autoplay="{
							delay: 8000,
							disableOnInteraction: true,
						}"
						:loop="true"
					>
						<SwiperSlide v-for="slide in 3" :key="slide">
							<Image preview class="h-full w-full text-primary">
								<template #image>
									<NuxtImg
										provider="directus"
										class="h-full w-full object-cover"
										:src="product.main_image"
									/>
								</template>
								<template #preview="slotProps">
									<NuxtImg
										provider="directus"
										class="h-full w-full object-cover"
										width="720"
										:src="product.main_image"
										:style="slotProps.style"
										@click="slotProps.onClick"
									/>
								</template>
							</Image>
						</SwiperSlide>
					</Swiper>

					<div
						class="flex w-full max-w-[420px] flex-col max-tablet:max-w-none max-tablet:gap-[0.75rem] tablet:gap-[2rem]"
					>
						<h1
							class="text-h1 max-tablet:text-h1Mob max-tablet:font-light tablet:font-extralight"
						>
							{{ product.title }}
						</h1>

						<div class="flex flex-col max-tablet:gap-[0.75rem] tablet:gap-4">
							<div
								class="flex flex-col max-tablet:gap-[0.75rem] max-tablet:text-[0.625rem] tablet:gap-4 tablet:text-[0.75rem]"
							>
								<span v-if="product.category"
									>Категория: {{ category.title }}</span
								>
								<template v-if="productColors?.length > 0">
									<span>Цвет: </span>
									<div class="flex max-tablet:gap-[0.75rem] tablet:gap-2">
										<label
											class="inline-flex cursor-pointer items-center"
											v-for="color in productColors"
											:key="color.id"
										>
											<input
												checked
												type="radio"
												name="color"
												:value="color.title"
												class="hidden"
											/>

											<span
												class="rounded-full bg-white flex items-center justify-center border border-black text-black max-tablet:min-h-[1.25rem] max-tablet:min-w-[3.438rem] max-tablet:text-[0.625rem] tablet:min-h-[2rem] tablet:min-w-[5.938rem]"
												id="option-6"
												>{{ color.title }}</span
											>
										</label>
									</div>
								</template>
							</div>

							<div
								class="flex flex-col max-tablet:gap-[0.75rem] tablet:gap-2"
								v-if="productSizes?.length > 0"
							>
								<span class="max-tablet:text-[0.625rem] tablet:text-[0.75rem]"
									>Размер:</span
								>

								<!-- radio кнопки! -->
								<div class="flex max-tablet:gap-[0.75rem] tablet:gap-2">
									<label
										class="inline-flex cursor-pointer items-center"
										v-for="size in productSizes"
										:key="size.id"
									>
										<input
											checked
											type="radio"
											name="size"
											:value="size.title"
											class="hidden"
										/>

										<span
											class="rounded-full bg-white flex items-center justify-center border border-black text-black max-tablet:min-h-[1.25rem] max-tablet:min-w-[3.438rem] max-tablet:text-[0.625rem] tablet:min-h-[2rem] tablet:min-w-[5.938rem]"
											id="option-6"
											>{{ size.title }}</span
										>
									</label>
								</div>
								<!-- /radio кнопки! -->

								<NuxtLink
									class="text-[0.625rem] text-darkGray2 underline tablet:hidden"
									>Руководсто по размерам</NuxtLink
								>
							</div>
						</div>

						<span class="max-tablet:text-[0.625rem] tablet:text-[0.875rem]"
							>Цена: ₽ {{ price }}</span
						>

						<!-- Кнопки "Добавить" -->
						<div
							class="flex flex-col max-tablet:my-[1.25rem] max-tablet:gap-[1rem] tablet:gap-[1.313rem]"
						>
							<button
								type="button"
								:disabled="product.quantity === 0"
								@click="handleAddToCart"
								class="w-full rounded-main bg-red2 text-primary transition-all hover:bg-red2-hover disabled:pointer-events-none disabled:opacity-70 max-tablet:min-h-[2rem] max-tablet:text-[0.625rem] tablet:min-h-[3.313rem]"
							>
								Добавить в корзину
							</button>
							<button
								type="button"
								class="w-full rounded-main border-[1px] border-black transition-all hover:bg-black hover:text-primary max-tablet:min-h-[2rem] max-tablet:text-[0.625rem] tablet:min-h-[3.313rem]"
							>
								Добавить в избранное
							</button>
						</div>
						<!-- /Кнопки "Добавить" -->

						<!-- Dropdown-ы -->
						<div
							class="flex flex-col max-tablet:gap-[0.75rem] tablet:gap-[1.25rem]"
						>
							<Accordion :multiple="true" v-if="product.description">
								<AccordionTab class="p-0">
									<template #header class="p-0">
										<div class="font-normal">О продукте</div>
									</template>
									<p>{{ product.description }}</p>
								</AccordionTab>
								<AccordionTab class="p-0">
									<template #header>
										<div class="font-normal">Доставка</div>
									</template>
									<p>
										Lorem ipsum dolor sit amet consectetur, adipisicing elit.
										Fuga illo ex architecto distinctio esse dolorum, quis totam
										deserunt! Harum saepe alias veniam ex iusto accusamus sunt
										commodi officia sit blanditiis?
									</p>
								</AccordionTab>
							</Accordion>
						</div>
						<!-- /Dropdown-ы -->
					</div>
				</div>
			</div>
		</section>
		<!-- /Карточка товара -->

		<!-- Похожие товары -->
		<section
			class="max-laptop:pb-[3.75rem] max-tablet:pt-[2rem] tablet:pt-[7.25rem] laptop:pb-[12.5rem]"
		>
			<div class="container my-0 px-3">
				<h2
					class="pb-[2rem] text-center text-h2 font-bold uppercase tracking-[0.25rem] max-tablet:text-h2Mob"
				>
					Похожие товары
				</h2>

				<div
					v-if="isRandomProductsPending"
					class="no-scrollbar mx-[-1rem] flex scroll-px-3 gap-[45px] overflow-x-auto px-[1rem] max-tablet:gap-[20px]"
				>
					<div class="w-full" v-for="(item, idx) in 4" :key="idx">
						<Skeleton width="300px" height="410px" />

						<div
							class="flex flex-col gap-[0.5rem] pt-5 text-[14px] font-normal max-tablet:gap-1 max-tablet:pt-2 max-tablet:text-[10px]"
						>
							<Skeleton width="10rem" />

							<Skeleton width="4rem" />
						</div>
					</div>
				</div>
				<div
					v-else
					class="no-scrollbar mx-[-1rem] flex scroll-px-3 gap-[45px] overflow-x-auto px-[1rem] max-tablet:gap-[20px]"
				>
					<template v-for="product in rProducts" :key="product.id">
						<ProductCard
							:id="product.id"
							:title="product.title"
							:imgSrc="product.main_image"
							:price="product.price"
							class="animation-duration-2000 max-w-[18.31rem] flex-shrink-0 transition-all max-tablet:w-[150px]"
						/>
					</template>
				</div>
			</div>
		</section>
		<!-- /Похожие товары -->
	</div>
</template>

<style>
	.p-accordion .p-accordion-header .p-accordion-header-link {
		@apply pl-0 pr-0;
	}
</style>
