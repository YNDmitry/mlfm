<script lang="ts" setup>
	import Skeleton from 'primevue/skeleton'

	interface Product {
		id: string
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
		products: Product[]
		data: any
		totalProducts: number
		currentPage: number
		currentLimit: number
		isMobile: boolean
		isLoading: boolean
	}

	const props = defineProps<Props>()
	const emit = defineEmits([
		'resetFilters',
		'updateLimit',
		'updatePage',
		'updateCollection',
	])

	const router = useRouter()
	const route = useRoute()

	const initialLimit = ref(props.currentLimit || route.query.limit)
	const newProductsLimit = ref(props.currentLimit || route.query.limit)

	const displayedProducts = computed(() => props.products)

	const getBannerIndex = (overallIndex: number) => {
		if (props.isMobile) {
			return Math.floor(overallIndex / 6)
		} else {
			return Math.floor(overallIndex / 3)
		}
	}

	const changeCollection = (collectionName: string) => {
		router.push({query: {...route.query, collectionId: collectionName}})
	}
</script>

<template>
	<div>
		<!-- Раздел с карточками -->
		<div
			class="grid grid-cols-[repeat(auto-fill,minmax(250px,_1fr))] gap-[1.875rem] pb-[3.75rem] max-tablet:grid-cols-[repeat(auto-fill,minmax(150px,_1fr))]"
		>
			<template v-if="isLoading" v-for="(item, idx) in 6" :key="idx">
				<div>
					 <Skeleton
						width="100%"
						:height="$device.isMobile ? '12rem' : '25rem'"
					/>
					<div class="mt-5">
						<Skeleton />
						<Skeleton class="mt-2" width="5rem" />
					</div>
				</div>
			</template>
			<template
				v-else
				v-for="(product, index) in displayedProducts"
				:key="product.id"
			>
				<ProductCard
					:id="product.id"
					:title="product?.title"
					:imgSrc="
						product?.main_image?.id || product?.product_variants[0]?.image?.id
					"
					:price="product?.product_variants[0]?.price"
					:class="{
						'max-tablet:col-span-full':
							index === displayedProducts.length - 1 &&
							displayedProducts.length % 2 !== 0,
					}"
					class="animation-duration-2000 flex-shrink-0 transition-all"
				/>

				<!-- изображение -->
				<template
					v-if="
						(props.isMobile &&
							(index + props.currentPage * props.currentLimit + 1) % 6 === 0) ||
						(!props.isMobile &&
							(index + props.currentPage * props.currentLimit + 1) % 3 === 0)
					"
				>
					<div
						class="col-span-full w-full overflow-hidden"
						v-if="
							props.data.catalog.random_banners_collection.length >
							getBannerIndex(index + props.currentPage * props.currentLimit)
						"
					>
						<button
							type="button"
							@click="
								changeCollection(
									props.data.catalog.random_banners_collection[
										getBannerIndex(
											index + props.currentPage * props.currentLimit,
										)
									]?.collection_id.title,
								)
							"
						>
							<NuxtImg
								provider="directus"
								:src="
									props.data.catalog.random_banners_collection[
										getBannerIndex(
											index + props.currentPage * props.currentLimit,
										)
									]?.image.id
								"
								class="h-auto max-w-full"
								width="955"
								format="webp"
							/>
						</button>
					</div>
				</template>
			</template>
		</div>
		<!-- /Раздел с карточками -->

		<!-- Пагинация -->
		<div
			class="w-ful relative border-t-[1px] border-[#AAAAAA]"
			v-if="props.products.length !== 0"
		>
			<Paginator
				id="pagination"
				@page="
					($event: any) => {
						$emit('updatePage', $event)
					}
				"
				@update:rows="
					($event: any) => {
						$emit('updateLimit', $event)
					}
				"
				:rows="props.currentLimit"
				:totalRecords="props.totalProducts"
				template="PrevPageLink CurrentPageReport JumpToPageDropdown RowsPerPageDropdown NextPageLink"
				:rowsPerPageOptions="[
					initialLimit,
					newProductsLimit * 2,
					newProductsLimit * 3,
				]"
				:alwaysShow="false"
				:currentPageReportTemplate="
					!props.isMobile
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
			></Paginator>
		</div>
		<!-- /Пагинация -->
		<div
			v-if="props.products.length === 0"
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
