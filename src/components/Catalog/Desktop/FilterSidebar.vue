<script lang="ts" setup>
	interface Category {
		id: number
		title: string
	}

	interface Props {
		data: any
		resetFilters: () => void
		minPrice: number
		maxPrice: number
		totalProducts: string | number
	}

	const router = useRouter()
	const route = useRoute()
	const props = defineProps<Props>()
	const minPriceValue = defineModel('minPrice', {default: 0})
	const maxPriceValue = defineModel('maxPrice', {default: 0})
	const categories: any = useState('categories')
	const currentCategories = ref(route.query.category || [])

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
		<div class="relative">
			<p
				v-if="totalProducts"
				class="relative mb-[1.875rem] pb-[35px] text-[12px] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-gray2 after:content-['']"
			>
				{{ totalProducts }} Товаров
			</p>

			<!-- Чекбоксы -->
			<div
				class="relative pb-[1.25rem] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-gray2 after:content-['']"
				data-lenis-prevent
				v-if="categories.length"
			>
				<p class="pb-[1.25rem] text-[0.875rem]">Категория</p>

				<ScrollPanel style="width: 100%; height: 140px" class="overflow-hidden">
					<div class="flex flex-col gap-[0.625rem] text-[0.625rem]">
						<label
							class="flex cursor-pointer items-center gap-[0.625rem]"
							v-for="category in categories"
							:key="category.id"
							:for="category.id"
						>
							<Checkbox
								v-model="currentCategories"
								:inputId="category.id"
								:name="category.title"
								:value="category.title"
								@update:model-value="
									router.replace({
										query: {...route.query, category: currentCategories},
									})
								"
							/>

							<span>{{ category.title }}</span>
						</label>
					</div>
				</ScrollPanel>

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
			</div>
			<!-- /Чекбоксы -->

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

	.p-checkbox {
		@apply !shadow-none;
	}
</style>
