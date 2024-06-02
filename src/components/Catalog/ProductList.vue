<script lang="ts" setup>
	interface Product {
		id: string
		title: string
		main_image: {id: string}
		price: number
	}

	interface Props {
		products: Product[]
		data: any
		totalProducts: number
		currentPage: number
		currentLimit: number
		isMobile: boolean
	}

	const props = defineProps<Props>()
	const emit = defineEmits(['resetFilters', 'updateLimit', 'updatePage'])

	const initialLimit = ref(props.currentLimit)
	const newProductsLimit = ref(props.currentLimit)

	const displayedProducts = computed(() => props.products)

	const getBannerIndex = (overallIndex: number) => {
		if (props.isMobile) {
			return Math.floor(overallIndex / 6)
		} else {
			return Math.floor(overallIndex / 3)
		}
	}
</script>

<template>
	<div>
		<!-- Раздел с карточками -->
		<div
			class="grid grid-cols-[repeat(auto-fill,minmax(250px,_1fr))] gap-[1.875rem] pb-[3.75rem] max-tablet:grid-cols-[repeat(auto-fill,minmax(150px,_1fr))]"
		>
			<template v-for="(product, index) in displayedProducts" :key="product.id">
				<ProductCard
					:id="product.id"
					:title="product?.title"
					:imgSrc="product.main_image?.id"
					:price="product?.price"
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
							props.data.catalog.random_banners.length >
							getBannerIndex(index + props.currentPage * props.currentLimit)
						"
					>
						<NuxtImg
							provider="directus"
							:src="
								props.data.catalog.random_banners[
									getBannerIndex(index + props.currentPage * props.currentLimit)
								]?.directus_files_id.id
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
			v-if="props.products.length !== 0"
		>
			<Paginator
				id="pagination"
				@update:first="($event) => emit('updatePage', $event)"
				@update:rows="($event) => emit('updateLimit', $event)"
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
					root: 'px-0',
					paginator: 'w-full',
					previouspagebutton: 'mr-auto',
					nextpagebutton: 'ml-auto',
					rowPerPageDropdown: {
						trigger: 'h-3 w-3 text-black',
						root: 'items-center border border-[#AAAAAA] px-3 shadow-none !outline-none',
						input: 'pl-0 pr-2',
						panel: '!mt-[8px]',
					},
					jumpToPageDropdown: {
						trigger: 'h-3 w-3 text-black',
						root: 'items-center border border-[#AAAAAA] px-3 shadow-none !outline-none',
						input: 'pl-0 pr-2',
						panel: '!mt-[8px]',
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
	#pagination > .p-dropdown-item.p-highlight {
		@apply !bg-red !text-primary;
	}
</style>
