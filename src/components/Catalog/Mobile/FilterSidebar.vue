<script lang="ts" setup>
	interface Category {
		id: number
		title: string
	}

	interface Props {
		currentSort: any
		sortOptions: any
		categories: Category[]
		filters: any
		data: any
		resetFilters: () => void
		minPrice: string
		maxPrice: string
	}
	const props = defineProps<Props>()
	const isSortOpen = ref(false)
	const isFilterOpen = useState('mobileFilterModal', () => ref(false))
	const emits = defineEmits(['update:currentSort', 'updateCollection'])

	const handleSortModal = () => {
		return (isSortOpen.value = !isSortOpen.value)
	}

	const handleFilterModal = () => {
		return (isFilterOpen.value = !isFilterOpen.value)
	}

	const router = useRouter()
	const route = useRoute()

	const minPriceValue = defineModel('minPrice', {default: ''})
	const maxPriceValue = defineModel('maxPrice', {default: ''})
</script>

<template>
	<div
		class="items-center justify-between gap-4 pb-[2.5rem] pt-[70] max-laptop:flex laptop:hidden"
	>
		<Dialog
			position="bottom"
			v-model:visible="isSortOpen"
			:pt="{
				root: 'w-full max-w-none m-0',
				content: 'pb-[3rem]',
				mask: 'backdrop-blur transition-all',
			}"
		>
			<div
				v-for="item in sortOptions"
				:key="item"
				:class="{'text-red': currentSort.code === item.code}"
				@click="
					$emit('update:currentSort', item),
						handleSortModal(),
						router.replace({
							query: {...route.query, sort: props.currentSort.code},
						})
				"
				class="py-2"
			>
				{{ item.name }}
			</div>
		</Dialog>
		<Dialog
			position="bottom"
			v-model:visible="isFilterOpen"
			:pt="{
				root: 'w-full max-w-none m-0',
				content: 'pb-[3rem]',
				mask: 'backdrop-blur transition-all',
			}"
		>
			<CatalogDesktopFilterSidebar
				:categories="categories"
				:filters="filters"
				:data="data"
				:resetFilters="resetFilters"
				:minPrice="minPrice"
				:maxPrice="maxPrice"
				@updateCollection="$event = $emit('updateCollection', $event)"
				v-model:min-price-value="minPriceValue"
				v-model:max-price-value="maxPriceValue"
			/>
		</Dialog>
		<button
			type="button"
			@click="handleSortModal()"
			class="flex h-[3.125rem] w-full items-center justify-center gap-[0.625rem] rounded-[12px] border-[1px] border-black text-[0.625rem] max-mobile:h-[38px]"
		>
			<IconsSelect />
			<span>Новое</span>
		</button>

		<button
			type="button"
			@click="handleFilterModal()"
			class="flex h-[3.125rem] w-full items-center justify-center gap-[0.625rem] rounded-[12px] border-[1px] border-black text-[0.625rem] max-mobile:h-[38px]"
		>
			<IconsFilters />
			<span>Фильтры</span>
		</button>
	</div>
</template>
