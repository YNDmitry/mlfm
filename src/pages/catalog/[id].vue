<script setup lang="ts">
	const appConfig = useRuntimeConfig()
	const {getItems} = useDirectusItems()
	const {$preview} = useNuxtApp()

	const cartStore = useCartStore()
	const wishlistStore = useWishlistStore()
	const {id} = useRoute().params
	const isOnWishlist = computed(() => wishlistStore.isOnWishlist(id as string))

	definePageMeta({
		layout: 'default',
	})

	const product = ref<Product | null>(null)

	const fetchProduct = async () => {
		try {
			const response = await useAsyncGql(
				'GetProductById',
				{id: id as string},
				{
					getCachedData(key, nuxtApp) {
						return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
					},
				},
			)
			product.value = response.data?.value.products_by_id || null

			if (!product.value) {
				throw createError({
					statusCode: 404,
					statusMessage: 'Продукт не найден',
				})
			}
		} catch (error) {
			console.error('Error fetching product:', error)
			throw createError({
				statusCode: 404,
				statusMessage: 'Продукт не найден',
			})
		}
	}
	await fetchProduct()

	useSeoMeta({
		title: product?.value?.title + ' | MLFM',
		ogTitle: product?.value?.title + ' | MLFM',
		description: product?.value?.description,
		ogDescription: product?.value?.description,
		ogImage:
			appConfig.public.databaseUrl + 'assets/' + product?.value?.main_image?.id,
		twitterImage:
			appConfig.public.databaseUrl + 'assets/' + product?.value?.main_image?.id,
	})

	const currentColor = ref(
		product?.value?.product_variants?.at(0)?.color_id?.title,
	)
	const currentSize = ref(
		product?.value?.product_variants?.at(0)?.size_id?.small_title,
	)

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
	const handleAddToCart = async () => {
		const currentProduct = product?.value
		cartStore.addItem({
			product_id: currentProduct?.id,
			price: currentProduct?.price,
			category: currentProduct?.category?.title,
			size_id: currentSize.value,
			color_id: currentColor.value,
			quantity: 1,
			image_id: currentProduct?.main_image?.id,
			title: currentProduct?.title,
		})

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
		}).format(product?.value?.price as number),
	)

	let processedData = ref({
		products_by_id: {
			colors: [],
			sizes: [],
		},
	})

	// Extract unique colors and sizes
	const colorSet = new Set()
	const sizeMap = new Map()

	watch(product, (newValue) => {
		if (newValue) {
			newValue.product_variants.forEach((item) => {
				const {color_id, size_id} = item

				if (!colorSet.has(color_id?.title || null)) {
					processedData.value.products_by_id.colors.push({colors_id: color_id})
					colorSet.add(color_id?.title)
				}

				if (!sizeMap.has(size_id?.small_title || null)) {
					const id = sizeMap.size + 1
					processedData.value.products_by_id.sizes.push({
						sizes_id: {...size_id, id},
					})
					sizeMap.set(size_id?.small_title, id)
				}
			})
		}
	})

	const isMatching = computed(() => {
		return product.value
			? product.value.product_variants.some(
					(variant) =>
						variant.color_id.title === currentColor.value &&
						variant.size_id.small_title === currentSize.value &&
						variant.quantity >= 1,
				)
			: false
	})
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
										:src="product.main_image?.id"
									/>
								</template>
								<template #preview="slotProps">
									<NuxtImg
										provider="directus"
										class="h-full w-full object-cover"
										width="720"
										:src="product.main_image?.id"
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
							{{ product?.title }}
						</h1>

						<div class="flex flex-col max-tablet:gap-[0.75rem] tablet:gap-4">
							<div
								class="flex flex-col max-tablet:gap-[0.75rem] max-tablet:text-[0.625rem] tablet:gap-4 tablet:text-[0.75rem]"
							>
								<span v-if="product?.category"
									>Категория: {{ product?.category?.title }}</span
								>

								<template
									v-if="processedData.products_by_id.colors?.length > 0"
								>
									<span>Цвет: </span>
									<div class="flex max-tablet:gap-[0.75rem] tablet:gap-2">
										<label
											class="inline-flex cursor-pointer items-center"
											v-for="(color, idx) in processedData.products_by_id
												.colors"
											:key="idx"
										>
											<input
												checked
												type="radio"
												name="color"
												:value="color?.colors_id?.title"
												v-model="currentColor"
												class="hidden"
											/>

											<span
												class="rounded-full bg-white flex items-center justify-center border border-black text-black max-tablet:min-h-[1.25rem] max-tablet:min-w-[3.438rem] max-tablet:text-[0.625rem] tablet:min-h-[2rem] tablet:min-w-[5.938rem]"
												id="option-6"
												>{{ color?.colors_id?.title }}</span
											>
										</label>
									</div>
								</template>
							</div>

							<div
								class="flex flex-col max-tablet:gap-[0.75rem] tablet:gap-2"
								v-if="processedData.products_by_id.sizes?.length > 0"
							>
								<span class="max-tablet:text-[0.625rem] tablet:text-[0.75rem]"
									>Размер:</span
								>

								<!-- radio кнопки! -->
								<div class="flex max-tablet:gap-[0.75rem] tablet:gap-2">
									<label
										class="inline-flex cursor-pointer items-center"
										v-for="(size, idx) in processedData.products_by_id.sizes"
										:key="idx"
									>
										<input
											checked
											type="radio"
											name="size"
											:value="size?.sizes_id?.small_title"
											v-model="currentSize"
											class="hidden"
										/>

										<span
											class="rounded-full bg-white flex items-center justify-center border border-black text-black max-tablet:min-h-[1.25rem] max-tablet:min-w-[3.438rem] max-tablet:text-[0.625rem] tablet:min-h-[2rem] tablet:min-w-[5.938rem]"
											id="option-6"
										>
											{{ size?.sizes_id?.small_title }}
										</span>
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
								:disabled="isMatching"
								@click="handleAddToCart"
								class="w-full rounded-main bg-red2 text-primary transition-all hover:bg-red2-hover disabled:pointer-events-none disabled:opacity-70 max-tablet:min-h-[2rem] max-tablet:text-[0.625rem] tablet:min-h-[3.313rem]"
							>
								Добавить в корзину
							</button>
							<ClientOnly>
								<button
									@click="
										isOnWishlist
											? wishlistStore.removeItemFromWishlist(id as string)
											: wishlistStore.addItemToWishlist(id as string)
									"
									type="button"
									class="w-full rounded-main border-[1px] border-black transition-all hover:bg-black hover:text-primary max-tablet:min-h-[2rem] max-tablet:text-[0.625rem] tablet:min-h-[3.313rem]"
								>
									{{
										isOnWishlist
											? 'Удалить из избранного'
											: 'Добавить в избранное'
									}}
								</button>
							</ClientOnly>
						</div>
						<!-- /Кнопки "Добавить" -->

						<!-- Dropdown-ы -->
						<div
							class="flex flex-col max-tablet:gap-[0.75rem] tablet:gap-[1.25rem]"
						>
							<Accordion :multiple="true" v-if="product?.description">
								<AccordionTab class="p-0">
									<template #header class="p-0">
										<div class="font-normal">О продукте</div>
									</template>
									<p>{{ product?.description }}</p>
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
							:id="product?.id"
							:title="product?.title"
							:imgSrc="product?.main_image"
							:price="product?.price"
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
