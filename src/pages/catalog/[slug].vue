<script setup lang="ts">
	const appConfig = useRuntimeConfig()

	const cartStore = useCartStore()
	const websiteStore = useWebsiteStore()
	const wishlistStore = useWishlistStore()
	const {slug} = useRoute().params
	const toast = useToast()

	definePageMeta({
		layout: 'default',
	})

	interface Product {
		id?: string
		title?: string
		slug?: string
		description?: string
		brand: {
			title: string
		}
		main_image?: {
			id?: string
		}
		product_variants?: [
			{
				id?: string
				color_id?: {title: string}
				size_id?: {small_title: string}
				availability?: string
				price?: number
			},
		]
	}

	const {$preview} = useNuxtApp()
	const keyPrfx = $preview.value ? `-preview-${slug}` : `-product-${slug}`

	const {data: product, status} = await useAsyncData(
		`catalog-data${keyPrfx}`,
		async () => {
			const data = ref<Product>()
			if ($preview.value) {
				refreshNuxtData()
				await GqlGetProductBySlugPreview({slug: slug as string}).then((res) => {
					data.value = res.products[0] as Product
				})
			} else {
				await GqlGetProductBySlug({
					slug: slug as string,
					status: 'published',
				}).then((res) => (data.value = res.products[0] as Product))
			}
			return data.value
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
		title: product?.value?.title + ' | MLFM',
		ogTitle: product?.value?.title + ' | MLFM',
		twitterTitle: product?.value?.title + ' | MLFM',
		description: product?.value?.description,
		ogDescription: product?.value?.description,
		ogUrl: 'https://www.mlfm.store' + useRoute().path,
		twitterDescription: product?.value?.description,
		ogImage:
			appConfig.public.databaseUrl + 'assets/' + product?.value?.main_image?.id,
		twitterImage:
			appConfig.public.databaseUrl + 'assets/' + product?.value?.main_image?.id,
		twitterCard: 'summary',
	})

	// Schema.org Product Schema
	useSchemaOrg([
		{
			'@type': 'Product',
			name: product?.value?.title,
			image: [
				appConfig.public.databaseUrl +
					'assets/' +
					product?.value?.main_image?.id,
			],
			description: product?.value?.description,
			brand: {
				'@type': 'Brand',
				name: product?.value?.brand?.title,
			},
			offers: {
				'@type': 'Offer',
				url: 'https://mlfm.store/catalog/' + product?.value?.slug,
				priceCurrency: 'RUB',
				price: product?.value?.product_variants[0].price,
				itemCondition: 'https://schema.org/NewCondition',
				availability: 'https://schema.org/InStock',
				seller: {
					'@type': 'Organization',
					name: 'MLFM',
				},
			},
		},
	])

	const isOnWishlist = computed(() =>
		wishlistStore.isOnWishlist(product?.value?.id as string),
	)
	const currentVariantId = ref(product?.value?.product_variants[0]?.id)
	const currentColor = ref(product?.value?.product_variants[0]?.color_id?.title)
	const currentSize = ref(
		product?.value?.product_variants[0]?.size_id?.small_title,
	)

	const handleAddToCart = async () => {
		const currentProduct = product?.value
		cartStore.addItem({
			product_id: currentProduct?.id,
			quantity: 1,
			variant_id: currentVariantId.value,
		})

		toast.add({
			severity: 'success',
			summary: 'Успешно',
			detail: 'Товар в корзине',
			life: 3000,
		})

		setTimeout(() => {
			websiteStore.handleVisibleCart()
			toast.removeAllGroups()
		}, 1000)
	}

	const processedData = ref({
		colors: [],
		sizes: [],
	})

	// Extract unique colors and sizes
	const colorSet = new Set()
	const sizeMap = new Map()

	watch(
		product,
		(newValue) => {
			if (newValue && newValue.product_variants) {
				processedData.value.colors = []
				processedData.value.sizes = []
				colorSet.clear()
				sizeMap.clear()

				newValue.product_variants.forEach((item: any) => {
					const {color_id, size_id} = item

					if (color_id && !colorSet.has(color_id.title)) {
						processedData.value.colors.push(color_id)
						colorSet.add(color_id.title)
					}

					if (size_id && !sizeMap.has(size_id.small_title)) {
						const id = sizeMap.size + 1
						processedData.value.sizes.push({...size_id, id})
						sizeMap.set(size_id.small_title, id)
					}
				})
			}
		},
		{immediate: true},
	)

	watch([currentColor, currentSize], () => {
		const variant = product?.value?.product_variants?.find(
			(variant: any) =>
				variant?.color_id?.title === currentColor.value &&
				variant?.size_id?.small_title === currentSize.value,
		)
		currentVariantId.value = variant ? variant.id : null
	})

	const isProductOutOfStock = computed(() => {
		const availability = product?.value?.product_variants?.find(
			(el: any) => el.id === currentVariantId.value,
		)
		if (availability) {
			return availability.availability
		}
		return 'out_of_stock'
	})

	const currentPrice = computed(() => {
		const price = product?.value?.product_variants?.find(
			(el: any) => el.id === currentVariantId.value,
		)
		if (price) {
			return usePrice(price?.price as number)
		}
		return '-'
	})

	const img = useImage()
	const currentImage = computed(() => {
		const cI = product?.value?.product_variants?.find(
			(el: any) => el.id === currentVariantId.value,
		)

		if (cI) {
			return img(cI.image?.id as string, {}, {provider: 'directus'})
		}
		return img(
			product?.value?.main_image?.id as string,
			{},
			{provider: 'directus'},
		)
	})
</script>

<template>
	<div>
		<Toast :position="'top-right'" />
		<!-- Карточка товара -->
		<section
			class="pt-[78px] max-tablet:pt-0"
			:class="product?.product_upsells.length > 0 ? '' : 'pb-[78px]'"
			v-if="status === 'success'"
		>
			<div class="mx-auto my-0 max-w-[1189px] px-[1rem]">
				<div class="flex gap-7 max-tablet:flex-col max-tablet:gap-4">
					<div
						class="!sticky top-40 max-h-[650px] max-w-[700px] max-laptop:!static max-laptop:w-full max-tablet:h-[500px]"
					>
						<Image
							preview
							:pt="{
								zoomoutbutton: 'text-primary',
								zoominbutton: 'text-primary',
								closebutton: 'text-primary',
								rotateleftbutton: 'hidden',
								rotaterightbutton: 'hidden',
								button: 'p-2 bg-black/10 transition-all',
							}"
							class="h-full w-full text-primary"
						>
							<template #image>
								<img class="h-full w-full object-cover" :src="currentImage" />
							</template>
							<template #preview="slotProps">
								<img
									:src="currentImage"
									alt="Превью"
									:style="slotProps.style"
									@click="slotProps.onClick"
								/>
							</template>
						</Image>
					</div>

					<div
						class="flex w-full max-w-[420px] flex-col max-tablet:max-w-none max-tablet:gap-[0.75rem] tablet:gap-[2rem]"
					>
						<h1
							class="text-h1 max-tablet:text-h1Mob max-tablet:font-light tablet:font-extralight"
						>
							{{ product?.title }}
						</h1>

						<span
							class="max-tablet:text-[0.625rem] tablet:text-[0.875rem]"
							v-if="currentPrice"
							>Цена: {{ currentPrice }}</span
						>

						<!-- Кнопки "Добавить" -->
						<div
							class="flex flex-col max-tablet:my-[1.25rem] max-tablet:gap-[1rem] tablet:gap-[1.313rem]"
						>
							<button
								type="button"
								:disabled="
									currentVariantId === null ||
									isProductOutOfStock === 'out_of_stock'
								"
								@click="handleAddToCart"
								class="w-full rounded-main bg-red2 text-primary transition-all hover:bg-red2-hover disabled:pointer-events-none disabled:opacity-70 max-tablet:min-h-[2rem] max-tablet:text-[0.625rem] tablet:min-h-[3.313rem]"
							>
								{{
									isProductOutOfStock === 'out_of_stock'
										? 'Нет в наличии'
										: 'Добавить в корзину'
								}}
							</button>
							<button
								@click="
									isOnWishlist
										? wishlistStore.removeItemFromWishlist(
												product?.id as string,
											)
										: wishlistStore.addItemToWishlist(product?.id as string)
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
						</div>
						<!-- /Кнопки "Добавить" -->

						<!-- Dropdown-ы -->
						<div
							class="flex flex-col max-tablet:gap-[0.75rem] tablet:gap-[1.25rem]"
						>
							<Accordion value="0">
								<AccordionPanel value="0" class="p-0">
									<AccordionHeader class="text-[.875rem] font-normal"
										>О продукте</AccordionHeader
									>
									<AccordionContent>
										<div class="flex flex-col max-tablet:gap-[0.75rem] tablet:gap-4">
											<div
												class="flex flex-col max-tablet:gap-[0.75rem] max-tablet:text-[0.625rem] tablet:gap-4 tablet:text-[0.75rem]"
											>
												<span v-if="product?.category">Категория: {{ product?.category?.title }}</span>
												<span v-if="product?.brand">Бренд: {{ product?.brand?.title }}</span>
											</div>
										</div>
										<p class="pt-3 text-[.75rem]" v-if="product?.description">
											{{ product?.description }}
										</p>
									</AccordionContent>
								</AccordionPanel>
								<AccordionPanel value="1" class="p-0">
									<AccordionHeader class="text-[.875rem] font-normal"
									>Размер и цвет</AccordionHeader
									>
									<AccordionContent>
										<p class="pt-3 text-[.75rem] flex flex-col gap-2" v-for="(item, idx) in product?.product_variants" :key="idx">
											<span v-if="item.color_id">Цвет: {{item.color_id.title}}</span>
											<span v-if="item.size_id">Размер: {{item.size_id.small_title}}</span>
										</p>
									</AccordionContent>
								</AccordionPanel>
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
			v-if="product?.product_upsells?.length > 0"
			class="max-laptop:pb-[3.75rem] max-tablet:pt-[2rem] tablet:pt-[7.25rem] laptop:pb-[12.5rem]"
		>
			<div class="container my-0 px-3">
				<h2
					class="pb-[2rem] text-center text-h2 font-bold uppercase tracking-[0.25rem] max-tablet:text-h2Mob"
				>
					Похожие товары
				</h2>
				<div
					class="no-scrollbar mx-[-1rem] flex scroll-px-3 gap-[45px] overflow-x-auto px-[1rem] max-tablet:gap-[20px]"
				>
					<template v-for="item in product?.product_upsells" :key="product.id">
						<ProductCard
							:id="item?.related_products_id?.id"
							:slug="item?.related_products_id?.slug"
							:title="item?.related_products_id?.title"
							:imgSrc="item?.related_products_id?.main_image?.id"
							:price="item?.related_products_id?.product_variants[0].price"
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
