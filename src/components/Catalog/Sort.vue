<script lang="ts" setup>
	interface Props {
		sortOptions: any
	}

	const props = defineProps<Props>()
	const router = useRouter()
	const route = useRoute()

	const currentSort = defineModel('currentSort')

	watch(currentSort, (newValue: any) => {
		router.replace({
			query: {...route.query, sort: newValue.code},
		})
	})
</script>

<template>
	<div
		class="flex items-center justify-between pb-[3.125rem] pt-[8px] max-tablet:hidden"
	>
		<div class="text-[12px]">
			<NuxtLink to="/">Главная</NuxtLink>
			/
			<NuxtLink to="/catalog">Каталог</NuxtLink>
		</div>
		<div id="sort-wrapper" class="relative">
			<Select
				v-model="currentSort"
				:options="sortOptions"
				optionLabel="sort"
				:placeholder="currentSort.name"
				:pt="{
					root: 'shadow-none outline-none !max-h-none items-center gap-4',
					label: 'text-black p-0 text-black text-[12px]',
					wrapper: '!max-h-none',
					overlay: '!left-auto !right-0 !top-[30px]',
					dropdownicon: 'text-black',
					dropdown: 'w-[14px] h-[14px]',
				}"
				append-to="#sort-wrapper"
			>
				<template #value="slotProps">
					<div v-if="slotProps" class="align-items-center flex">
						<div>
							{{
								slotProps?.value?.name ? slotProps?.value?.name : 'Сортировка'
							}}
						</div>
					</div>
					<span v-else>
						{{ slotProps.placeholder }}
					</span>
				</template>
				<template #option="slotProps">
					<div class="align-items-center flex text-[12px]">
						<div>{{ slotProps.option.name }}</div>
					</div>
				</template>
			</Select>
		</div>
	</div>
</template>

<style>
	#sort-wrapper .p-select-option.p-select-option-selected {
		@apply bg-red2 text-primary;
	}

	[data-pc-section='listcontainer'] .p-select-option.p-select-option-selected {
		@apply bg-red2 text-primary;
	}
</style>
