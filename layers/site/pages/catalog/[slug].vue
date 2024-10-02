<script setup lang="ts">
	import {useWebsiteStore} from '~~/core/src/stores'
	import {useCartStore} from '~~/core/src/stores/cart'
	import {useWishlistStore} from '~~/core/src/stores/wishlist'

	const appConfig = useRuntimeConfig()

	const cartStore = useCartStore()
	const websiteStore = useWebsiteStore()
	const wishlistStore = useWishlistStore()
	const {slug} = useRoute().params

	definePageMeta({
		layout: 'default',
	})

	const {data: product, status} = await useProductData(slug as string)

	const firstVariant = product.value?.product_variants?.[0]
	if (!firstVariant) {
		throw createError({
			statusCode: 404,
			statusMessage: 'Продукт не найден',
		})
	}

	const currentVariantId = ref(firstVariant.id)
	const currentColor = ref(firstVariant.color_id?.title)
	const currentSize = ref(firstVariant.size_id?.small_title)

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
			sku: 'N/A',
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
				availability: `https://schema.org/${product.value?.product_variants[0].availability === 'out_of_stock' ? 'OutOfStock' : 'InStock'}`, // Динамическая доступность
				seller: {
					'@type': 'Organization',
					name: 'MLFM',
				},
			},
			material: product?.value?.material?.title || 'N/A',
			color: firstVariant.color_id?.title || 'N/A',
			size: firstVariant.size_id?.small_title || 'N/A',
			stone: product?.value?.stone?.title || 'N/A',
			category: product?.value?.category?.title || 'N/A',
		},
	])

	const isOnWishlist = computed(() =>
		wishlistStore.isOnWishlist(product?.value?.id as string),
	)

	const handleAddToCart = async () => {
		const currentProduct = product?.value
		cartStore.addItem({
			product_id: currentProduct?.id,
			quantity: 1,
			variant_id: currentVariantId.value,
		})

		websiteStore.showToast({
			severity: 'success',
			summary: 'Успешно',
			detail: 'Товар в корзине',
		})

		setTimeout(() => {
			websiteStore.handleVisibleCart()
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
	const imageUrls = computed(() => {
		const variant = product.value?.product_variants?.find(
			(el) => el.id === currentVariantId.value,
		)

		const imageIds: string[] = []

		// Add the variant's image if it exists
		if (variant?.image?.id) {
			imageIds.push(variant.image.id)
		} else if (product.value?.main_image?.id) {
			// Fallback to main_image if variant image doesn't exist
			imageIds.push(product.value.main_image.id)
		}

		// Add images from product.images
		if (product.value?.images?.length) {
			product.value.images.forEach((imageObj) => {
				if (imageObj?.directus_files_id?.id) {
					imageIds.push(imageObj.directus_files_id.id)
				}
			})
		}

		// Remove duplicates
		const uniqueImageIds = Array.from(new Set(imageIds))

		// Convert image IDs to URLs using your `img` function
		return uniqueImageIds.map((id) => img(id, {}, {provider: 'directus'}))
	})

	const isShowSizeTable = ref(false)
</script>

<template>
	<div>
		<Dialog
			:pt="{
				root: 'max-w-[1000px] w-[95%]',
			}"
			:modal="true"
			v-model:visible="isShowSizeTable"
			:block-scroll="true"
			:close-on-escape="true"
			v-if="product?.category?.size_table?.id"
		>
			<template #header>
				<div>Таблица размеров</div>
			</template>
			<div class="flex w-full justify-start overflow-auto">
				<NuxtImg
					placeholder
					:src="product?.category?.size_table?.id"
					provider="directus"
					width="1000"
					class="w-full min-w-[1000px]"
				/>
			</div>
		</Dialog>
		<!-- Карточка товара -->
		<section
			class="pt-[78px] max-tablet:pt-0"
			:class="product?.product_upsells.length > 0 ? '' : 'pb-[78px]'"
			v-if="status === 'success'"
		>
			<div class="mx-auto my-0 max-w-[1189px] px-[1rem]">
				<div
					class="flex justify-center gap-7 max-tablet:flex-col max-tablet:gap-4"
				>
					<div
						class="!sticky top-40 h-[600px] max-w-[700px] overflow-hidden max-laptop:!static max-laptop:w-full max-tablet:h-[500px]"
					>
						<Carousel
							:value="imageUrls"
							:numVisible="1"
							:pt="{indicatorlist: 'hidden'}"
						>
							<template #item="carouselProps">
								<Image
									preview
									:pt="{
										zoomoutbutton: 'text-primary',
										zoominbutton: 'text-primary',
										closebutton: 'text-primary',
										rotateleftbutton: 'hidden',
										rotaterightbutton: 'hidden',
										button: 'p-2 bg-black/10 transition-all',
										toolbar: 'bg-black/50',
										root: 'h-[600px] max-tablet:h-[500px] flex items-center max-w-[700px] text-primary',
										previewIcon:
											'w-[40px] h-[40px] p-2 rounded-[100%] bg-black/30 transition-all',
									}"
								>
									<template #image>
										<NuxtImg
											class="h-[600px] w-full object-cover max-tablet:h-[500px]"
											:src="carouselProps.data"
											width="700"
											height="600"
										/>
									</template>
									<template #preview="slotProps">
										<NuxtImg
											:src="carouselProps.data"
											alt="Превью"
											width="600"
											:style="slotProps.style"
											@click="slotProps.onClick"
										/>
									</template>
								</Image>
							</template>
						</Carousel>
					</div>

					<div
						class="flex w-full max-w-[420px] flex-col max-tablet:max-w-none max-tablet:gap-[0.75rem] tablet:gap-[2rem]"
					>
						<h1
							class="text-h1 max-tablet:text-h1Mob max-tablet:font-light tablet:font-extralight"
						>
							{{ product?.title }}
						</h1>

						<div class="flex items-center justify-between gap-4">
							<Message
								severity="success"
								v-if="product?.is_preorder"
								:pt="{
									root: 'text-[0.75rem] bg-black/80 text-primary outline-black',
									text: 'flex items-center justify-center px-4',
								}"
								><span class="text-[0.75rem]">Предзаказ</span></Message
							>
							<span
								class="max-tablet:text-[0.625rem] tablet:text-[0.875rem]"
								v-if="currentPrice"
							>
								Цена: {{ currentPrice }}
							</span>
							<button
								type="button"
								aria-label="Таблица размеров"
								class="text-gray underline transition-all hover:text-black max-tablet:text-[0.625rem] tablet:text-[0.875rem]"
								@click="isShowSizeTable = !isShowSizeTable"
								v-if="product?.category?.size_table?.id"
							>
								Таблица размеров
							</button>
						</div>

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
						<CatalogProductDropdowns
							:brand="product?.brand?.title"
							:category="product?.category?.title"
							:description="product?.description"
							:material="product?.material?.title"
							:stone="product?.stone?.title"
						/>
						<!-- /Dropdown-ы -->
					</div>
				</div>
			</div>
		</section>
		<!-- /Карточка товара -->

		<!-- Похожие товары -->
		<CatalogProductUpsells
			v-if="product?.product_upsells.length > 0"
			:product_upsells="
				product?.product_upsells.map((el) => el.related_products_id)
			"
		/>
		<!-- /Похожие товары -->
	</div>
</template>

<style>
	.p-accordion .p-accordion-header .p-accordion-header-link {
		@apply pl-0 pr-0;
	}

	.p-button.p-component.p-button-icon-only.p-button-secondary.p-button-rounded.p-button-text.p-carousel-prev-button.p-disabled,
	.p-button.p-component.p-button-icon-only.p-button-secondary.p-button-rounded.p-button-text.p-carousel-next-button.p-disabled {
		@apply hidden;
	}

	.p-button.p-component.p-button-icon-only.p-button-secondary.p-button-rounded.p-button-text.p-carousel-prev-button,
	.p-button.p-component.p-button-icon-only.p-button-secondary.p-button-rounded.p-button-text.p-carousel-next-button {
		@apply absolute bottom-0 top-0 z-50 h-full rounded-[0px] bg-primary/30 opacity-0 backdrop-blur-md transition-all max-tablet:opacity-100;
	}

	.p-button.p-component.p-button-icon-only.p-button-secondary.p-button-rounded.p-button-text.p-carousel-prev-button {
		@apply left-0;
	}
	.p-button.p-component.p-button-icon-only.p-button-secondary.p-button-rounded.p-button-text.p-carousel-next-button {
		@apply right-0;
	}

	.p-carousel-content-container {
		@apply relative;
	}

	.p-carousel-content-container:hover
		.p-button.p-component.p-button-icon-only.p-button-secondary.p-button-rounded.p-button-text.p-carousel-prev-button {
		@apply opacity-100;
	}

	.p-carousel-content-container:hover
		.p-button.p-component.p-button-icon-only.p-button-secondary.p-button-rounded.p-button-text.p-carousel-next-button {
		@apply opacity-100;
	}
</style>
