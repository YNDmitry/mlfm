<script lang="ts" setup>
	interface Product {
		id: string
		slug: string
		title: string
		main_image: {id: string}
		product_variants: [
			{
				price: number
				id: string
				image: {id: string}
			},
		]
	}

	interface Props {
		products: any
		data: any
		totalProducts: number
		currentPage: number
		currentLimit: number
		isLoading: boolean
	}

	const {isMobile} = useDevice()

	const props = defineProps<Props>()
	const emit = defineEmits(['resetFilters', 'updatePage', 'updateCollection'])

	const router = useRouter()
	const route = useRoute()

	const initialLimit = ref(props.currentLimit)

	const changeCollection = (collectionName: string) => {
		router.push({query: {...route.query, collectionId: collectionName}})
		window.scrollTo(0, 0)
	}

	const totalBanners = props.data?.catalog?.random_banners_collection.length

	// Вычисляем интервал между баннерами
	const bannerInterval = isMobile ? 3 : 2 // Показываем баннер после каждых 3 продуктов

	// Вычисляем количество баннеров, которые должны быть показаны на текущей странице
	const bannersOnPage = Math.floor(props.currentLimit / (bannerInterval + 1))

	// Проверка, показываем ли мы баннер на текущем продукте
	const shouldShowBanner = (index: number) => {
		const globalIndex = props.currentPage * props.currentLimit + index
		return (
			(globalIndex + 1) % (bannerInterval + 1) === 0 &&
			globalIndex / (bannerInterval + 1) < totalBanners
		)
	}

	// Вычисляем индекс баннера, который нужно показать
	const getBannerIndex = (index: number) => {
		const globalIndex = props.currentPage * props.currentLimit + index
		return Math.floor(globalIndex / (bannerInterval + 1))
	}
</script>

<template>
	<div>
		<!-- Раздел с карточками -->
		<div
			class="grid grid-flow-row-dense grid-cols-[repeat(auto-fill,minmax(250px,_1fr))] gap-[1.875rem] pb-[3.75rem] max-tablet:grid-cols-[repeat(auto-fill,minmax(150px,_1fr))] max-tablet:gap-4"
		>
			<template v-if="isLoading">
				<template v-for="(item, idx) in 6" :key="idx">
					<div>
						<Skeleton width="100%" :height="isMobile ? '12rem' : '25rem'" />
						<div class="mt-5">
							<Skeleton />
							<Skeleton class="mt-2" width="5rem" />
						</div>
					</div>
				</template>
			</template>
			<template v-else>
				<template v-for="(product, index) in products" :key="product.id">
					<ProductCard
						:id="product?.id"
						:slug="product?.slug"
						:title="product?.title"
						:imgSrc="
							product?.main_image?.id || product?.product_variants[0]?.image?.id
						"
						:price="product?.product_variants[0]?.price"
						:class="{
							'max-tablet:col-span-full':
								index === products.length - 1 && products.length % 2 !== 0,
						}"
						class="animation-duration-2000 flex-shrink-0 transition-all"
					/>

					<!-- изображение -->
					<template v-if="shouldShowBanner(index)">
						<div
							class="col-span-full w-full overflow-hidden"
							v-if="getBannerIndex(index) < totalBanners"
						>
							<button
								type="button"
								@click="
									changeCollection(
										props.data.catalog.random_banners_collection[
											getBannerIndex(index)
										]?.collection_id.title,
									)
								"
							>
								<NuxtImg
									provider="directus"
									:src="
										props.data.catalog.random_banners_collection[
											getBannerIndex(index)
										]?.image.id
									"
									class="h-auto max-w-full"
									width="955"
									format="webp"
									placeholder
								/>
							</button>
						</div>
					</template>
				</template>
			</template>
		</div>
		<!-- /Раздел с карточками -->

		<!-- Пагинация -->
		<div
			class="w-ful relative border-t-[1px] border-[#AAAAAA]"
			v-if="products.length"
		>
			<Paginator
				id="pagination"
				@page="
					($event: any) => {
						$emit('updatePage', $event)
					}
				"
				:first="currentPage * props.currentLimit"
				:rows="props.currentLimit"
				:totalRecords="props.totalProducts"
				template="PrevPageLink CurrentPageReport JumpToPageDropdown RowsPerPageDropdown NextPageLink"
				:rowsPerPageOptions="[9, 18, 27]"
				:alwaysShow="false"
				:currentPageReportTemplate="
					!isMobile
						? '{currentPage} из {totalPages}'
						: '{currentPage} из {totalPages}'
				"
				:pt="{
					root: 'px-0 w-full',
					paginatorcontainer: 'w-full',
					content: 'w-full',
					prev: 'mr-auto',
					next: 'ml-auto',
					current: 'text-black text-[0.7rem] mr-2',
					pcrowperpagedropdown: {
						label: 'text-black p-1 text-[0.7rem]',
						option: 'text-black text-[0.7rem]',
						dropdown: 'w-4 text-black ml-4',
						root: 'items-center border border-[#AAAAAA] px-3 shadow-none !outline-none',
						input: 'pl-0 pr-2',
						listcontainer: '!mt-[8px]',
					},
					pcjumptopagedropdown: {
						label: 'text-black p-1 text-[0.7rem]',
						option: 'text-black text-[0.7rem]',
						dropdown: 'w-4 text-black ml-4',
						root: 'items-center border border-[#AAAAAA] px-3 shadow-none !outline-none',
						input: 'pl-0 pr-2',
						listcontainer: '!mt-[8px]',
					},
				}"
			>
			</Paginator>
		</div>
		<!-- /Пагинация -->
		<div
			v-if="products?.length === 0"
			class="mx-auto flex w-full max-w-[500px] flex-col justify-center gap-5 text-center"
		>
			<div>Продуктов по данным фильтрам не найдено</div>
			<button
				@click="$emit('resetFilters')"
				type="button"
				class="relative flex w-full items-center justify-center bg-red2 text-primary transition-colors hover:bg-red2-hover disabled:pointer-events-none disabled:opacity-70 max-tablet:min-h-[1.875rem] max-tablet:rounded-[1.25rem] max-tablet:text-[0.625rem] tablet:min-h-[45px] tablet:rounded-[1.875rem]"
			>
				Сбросить фильтры
			</button>
		</div>
	</div>
</template>

<style>
	#pagination [data-p-selected='true'] {
		@apply bg-red2 text-primary;
	}
</style>
