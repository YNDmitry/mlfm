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
		</div>
	</div>
</template>
