<script setup lang="ts">
	interface Props {
		filters: [
			{
				title: string
				sub_categories: [{title: string}]
			},
		]
		currentFilter: any
		title: string
		routeTitle: string
	}
	const props = defineProps<Props>()

	const emit = defineEmits(['update:currentFilter'])

	const route = useRoute()
	const router = useRouter()

	const update = (value: string) => {
		router.replace({query: {...route.query, [props.routeTitle]: value}})
		useState('mobileFilterModal').value = false
	}

	const pt = ref({
		root: 'outline-none mb-2',
		label: 'outline-none pl-0 text-black',
		listcontainer: 'bg-primary overflow-y-scroll rounded-[6px] p-[4px]',
		option:
			'text-[0.625rem] !m-0 flex items-center px-[4px] text-black h-[2rem] w-full cursor-pointer transition-all hover:bg-grayLight',
		input: 'outline-none',
		overlay: '!top-[26px] !left-0 !right-0 shadow-lg',
		nodetogglebutton: '!order-[2]',
		clearicon: 'text-black w-[13px] h-[13px]',
		dropdownicon: 'text-black w-[13px] h-[13px]',
	})
</script>

<template>
	<div v-if="filters" class="relative flex flex-col gap-[0.7rem] pt-[1.25rem]">
		<span class="text-[0.875rem]">{{ title }}</span>

		<div
			:id="'filter-wrapper-' + title"
			class="relative border-b-2 border-b-gray2"
			data-lenis-prevent
		>
			<Select
				v-if="title !== 'Категория'"
				@update:modelValue="(value: any) => update(value)"
				:modelValue="currentFilter"
				:options="filters.map((filter) => filter.title)"
				:placeholder="title"
				:showClear="currentFilter !== null"
				:aria-label="title"
				:pt="pt"
				:append-to="'self'"
				class="flex cursor-pointer justify-between border-0 text-[0.625rem] shadow-none outline-none"
			>
			</Select>
			<TreeSelect
				v-if="title === 'Категория'"
				:options="
					filters.map((filters, filterIdx) => ({
						key: filterIdx + '',
						label: filters.title,
						children: filters.sub_categories.map(
							(sub_category, sub_category_idx) => ({
								key: sub_category_idx + '',
								label: sub_category.title,
							}),
						),
					}))
				"
				:pt="pt"
				@node-select="
					(value: any) => {
						update(value.label)
						console.log(currentFilter)
					}
				"
				:placeholder="title"
				:append-to="'self'"
				class="flex cursor-pointer justify-between border-0 text-[0.625rem] shadow-none outline-none"
			>
			</TreeSelect>
		</div>
	</div>
</template>

<style>
	[data-pc-section='node'] {
		@apply outline-none;
	}

	[data-pc-section='nodetogglebutton'] {
		@apply h-5 w-5;
	}

	[data-pc-section='nodechildren'] {
		@apply ml-2;
	}

	[data-pc-section='nodetogglebutton'] {
		@apply p-1 hover:bg-darkGray2 hover:text-primary;
	}
</style>
