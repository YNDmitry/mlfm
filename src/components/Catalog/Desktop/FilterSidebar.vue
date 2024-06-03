<!-- components/FilterSidebar.vue -->
<script lang="ts" setup>
	interface Category {
		id: number
		title: string
	}

	interface Props {
		totalProducts: number
		categories: Category[]
		filters: any
		data: any
		resetFilters: () => void
		minPrice: string
		maxPrice: string
	}

	const props = defineProps<Props>()
	const emit = defineEmits(['updateCollection'])
</script>

<template>
	<aside class="pb-[4.375rem] max-laptop:hidden">
		<div class="relative">
			<p
				v-if="props.totalProducts"
				class="relative mb-[1.875rem] pb-[35px] text-[12px] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-gray2 after:content-['']"
			>
				{{ props.totalProducts }} Товаров
			</p>

			<!-- Чекбоксы -->
			<div
				class="relative pb-[1.25rem] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-gray2 after:content-['']"
				data-lenis-prevent
				v-if="props.categories.length"
			>
				<p class="pb-[1.25rem] text-[0.875rem]">Категория</p>

				<ScrollPanel style="width: 100%; height: 140px">
					<div class="flex flex-col gap-[0.625rem] text-[0.625rem]">
						<label
							class="flex cursor-pointer items-center gap-[0.625rem]"
							v-for="category in props.categories"
							:key="category.id"
						>
							<input
								type="checkbox"
								class="absolute h-5 w-5 cursor-pointer opacity-0"
								:value="category.title"
								v-model="props.filters.categories"
							/>

							<div
								class="flex h-5 w-5 cursor-pointer items-center justify-center border-[1px] border-grayLight"
							>
								<IconsCheckbox />
							</div>

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
				:currentFilter="props.filters.collectionId"
				@update:currentFilter="props.filters.collectionId = $event"
			/>
			<!-- /Коллекция -->

			<!-- Цвет -->
			<CatalogFilter
				:filters="props.data?.colors"
				:title="`Цвет`"
				:currentFilter="props.filters.colors"
				@update:currentFilter="props.filters.colors = $event"
			/>
			<!-- /Цвет -->

			<!-- Размер -->
			<CatalogFilter
				:filters="props.data?.sizes.map((el: any) => ({title: el.small_title}))"
				:title="`Размер`"
				:currentFilter="props.filters.size"
				@update:currentFilter="props.filters.size = $event"
			/>
			<!-- /Размер -->

			<!-- Бренды -->
			<CatalogFilter
				:filters="props.data?.brands"
				:title="`Бренд`"
				:currentFilter="props.filters.brandTitle"
				@update:currentFilter="props.filters.brandTitle = $event"
			/>
			<!-- /Бренды -->

			<!-- Цена -->
			<div
				class="relative flex flex-col gap-[1.25rem] pb-[25px] pt-[25px] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-gray2 after:content-['']"
			>
				<span class="text-[0.875rem]">Цена</span>

				<div class="flex justify-between gap-[0.625rem] text-[0.625rem]">
					<label
						class="rounded-full flex min-h-[46px] w-full cursor-pointer items-center justify-center gap-[2px] border"
					>
						<span class="pointer-events-none whitespace-nowrap text-nowrap"
							>От -</span
						>

						<input
							class="w-[72px] focus:outline-none"
							type="number"
							:placeholder="props.minPrice"
							:min="props.minPrice"
							:max="props.maxPrice"
							v-model="props.filters.minPrice"
						/>
					</label>

					<label
						class="rounded-full flex min-h-[46px] w-full cursor-pointer items-center justify-center gap-[2px] border"
					>
						<span class="pointer-events-none whitespace-nowrap text-nowrap"
							>До -</span
						>

						<input
							class="w-[72px] focus:outline-none"
							type="number"
							:placeholder="props.maxPrice"
							:min="props.minPrice"
							:max="props.maxPrice"
							v-model="props.filters.maxPrice"
						/>
					</label>
				</div>
			</div>
			<!-- /Цена -->

			<!-- Баннер -->
			<div class="pt-[25px]" v-if="props.data?.catalog?.main_banner?.id">
				<button
					type="button"
					@click="
						$emit(
							'updateCollection',
							props.data?.catalog?.main_banner_collection?.title,
						)
					"
				>
					<NuxtImg
						provider="directus"
						:src="props.data?.catalog?.main_banner?.id"
						width="275"
						height="485"
						format="webp"
					/>
				</button>
			</div>
			<!-- /Баннер -->
		</div>
	</aside>
</template>
