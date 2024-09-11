<script lang="ts" setup>
	interface Category {
		id: number
		title: string
	}

	interface Props {
		data: any
		categories: Category[]
		resetFilters: () => void
		minPrice: number
		maxPrice: number
		totalProducts: number | null | undefined
	}

	const {activeFiltersCount} = useProducts()

	const router = useRouter()
	const route = useRoute()
	const props = defineProps<Props>()
	const emit = defineEmits(['update:categories'])
	const minPriceValue = defineModel('minPrice', {default: 0})
	const maxPriceValue = defineModel('maxPrice', {default: 0})
	// const categories: any = useState('categories')
	const currentCategories = ref(
		route.query.category ? route.query.category : [],
	)

	watch(
		() => route.query.minPrice,
		() => {
			if (!route.query.minPrice) minPriceValue.value = props.minPrice
		},
	)

	watch(
		() => route.query.maxPrice,
		() => {
			if (!route.query.maxPrice) maxPriceValue.value = props.maxPrice
		},
	)

	watch(
		() => route.query.category,
		(newVal) => {
			if (newVal === undefined || null) currentCategories.value = []
		},
	)

	const changeCollection = (collectionName: string) => {
		return router.push({
			query: {
				...route.query,
				collectionId: collectionName,
			},
		})
	}
</script>

<template>
	<aside class="pb-[4.375rem]">
		<Tag
			v-if="activeFiltersCount"
			:value="
				activeFiltersCount === 1
					? activeFiltersCount + ' активный фильтр'
					: activeFiltersCount + ' активных фильтров'
			"
			:pt="{root: 'bg-red2 text-primary'}"
			class="mb-4 text-[0.4rem] font-normal uppercase"
		></Tag>

		<div class="relative">
			<p
				v-if="totalProducts"
				class="relative mb-4 pb-4 text-[12px] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-gray2 after:content-['']"
			>
				{{ totalProducts }} Товаров
			</p>

			<!-- Категория -->
			<CatalogFilter
				:filters="categories"
				:title="`Категория`"
				:routeTitle="'category'"
				:currentFilter="route.query.category"
				@update:currentFilter="route.query.category = $event"
			/>
			<!-- /Категория -->

			<!-- Коллекция -->
			<CatalogFilter
				:filters="props.data?.collection"
				:title="`Коллекция`"
				:routeTitle="'collectionId'"
				:currentFilter="route.query.collectionId"
				@update:currentFilter="route.query.collectionId = $event"
			/>
			<!-- /Коллекция -->

			<!-- Цвет -->
			<CatalogFilter
				:filters="props.data?.colors"
				:title="`Цвет`"
				:routeTitle="'color'"
				:currentFilter="route.query.color"
				@update:currentFilter="route.query.color = $event"
			/>
			<!-- /Цвет -->

			<!-- Камень -->
			<CatalogFilter
				:filters="props.data?.stone"
				:title="`Камень`"
				:routeTitle="'stone'"
				:currentFilter="route.query.stone"
				@update:currentFilter="route.query.stone = $event"
			/>
			<!-- /Камень -->

			<!-- Материал -->
			<CatalogFilter
				:filters="props.data?.material"
				:title="`Материал`"
				:routeTitle="'material'"
				:currentFilter="route.query.material"
				@update:currentFilter="route.query.material = $event"
			/>
			<!-- /Материал -->

			<!-- Размер -->
			<CatalogFilter
				:filters="props.data?.sizes.map((el: any) => ({title: el.small_title}))"
				:title="`Размер`"
				:routeTitle="'size'"
				:currentFilter="route.query.size"
				@update:currentFilter="route.query.size = $event"
			/>
			<!-- /Размер -->

			<!-- Бренды -->
			<CatalogFilter
				:filters="props.data?.brands"
				:title="`Бренд`"
				:routeTitle="'brand'"
				:currentFilter="route.query.brand"
				@update:currentFilter="route.query.brand = $event"
			/>
			<!-- /Бренды -->

			<!-- Цена -->
			<div
				class="relative flex flex-col gap-[1.25rem] pb-[25px] pt-[25px] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-gray2 after:content-['']"
			>
				<span class="text-[0.875rem]">Цена</span>

				<div class="flex justify-between gap-[0.625rem] text-[0.625rem]">
					<label
						class="rounded-full flex min-h-[46px] w-full cursor-pointer items-center justify-center gap-[2px] border px-3"
					>
						<span class="pointer-events-none whitespace-nowrap text-nowrap"
							>От -</span
						>

						<InputNumber
							v-model="minPriceValue"
							fluid
							mode="currency"
							:min="minPrice"
							:max="maxPrice"
							:max-fraction-digits="0"
							currency="RUB"
							unstyled
							locale="ru-RU"
							:placeholder="String(minPrice)"
							aria-label="Минимальная цена"
							:class="'inputnumber'"
							v-on:update:model-value="
								router.push({query: {...route.query, minPrice: minPriceValue}})
							"
						/>
					</label>

					<label
						class="rounded-full flex min-h-[46px] w-full cursor-pointer items-center justify-center gap-[2px] border"
					>
						<span class="pointer-events-none whitespace-nowrap text-nowrap"
							>До -</span
						>

						<InputNumber
							v-model="maxPriceValue"
							fluid
							mode="currency"
							:min="minPrice"
							:max="maxPrice"
							:max-fraction-digits="0"
							currency="RUB"
							unstyled
							locale="ru-RU"
							:placeholder="String(maxPrice)"
							aria-label="Максимальная цена"
							:class="'inputnumber'"
							v-on:update:model-value="
								router.push({query: {...route.query, maxPrice: maxPriceValue}})
							"
						/>
					</label>
				</div>
			</div>
			<!-- /Цена -->

			<!-- Reset button -->
			<div class="flex items-center gap-[5px] pt-[1.25rem]">
				<IconsReset />
				<button
					@click="props.resetFilters"
					class="text-[8px] leading-[1.188rem] underline hover:no-underline"
				>
					Сбросить параметры
				</button>
			</div>
			<!-- /Reset button -->

			<!-- Баннер -->
			<div class="pt-[25px]" v-if="props.data?.catalog?.main_banner?.id">
				<button
					class="max-tablet:w-full"
					type="button"
					@click="
						changeCollection(props.data?.catalog?.main_banner_collection?.title)
					"
				>
					<NuxtImg
						provider="directus"
						:src="props.data?.catalog?.main_banner?.id"
						width="275"
						height="485"
						format="webp"
						class="max-tablet:w-full"
						placeholder
					/>
				</button>
			</div>
			<!-- /Баннер -->
		</div>
	</aside>
</template>

<style>
	.inputnumber input {
		@apply max-w-[85px] outline-none;
	}

	/* .p-checkbox-input {
		@apply !shadow-none;
	} */
</style>
