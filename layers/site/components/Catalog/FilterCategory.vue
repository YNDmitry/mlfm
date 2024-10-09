<script setup lang="ts">
	interface Props {
		filters: [
			{
				title: string
				sub_categories: [{title: string}]
			},
		]
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

	const value = defineModel()
</script>

<template>
	<div v-if="filters" class="relative flex flex-col gap-[0.7rem] pt-[1.25rem]">
		<span class="text-[0.875rem]">{{ title }}</span>

		<div
			:id="'filter-wrapper-' + title"
			class="relative border-b-2 border-b-gray2"
			data-lenis-prevent
		>
			<TreeSelect
				:options="
					filters.map((filters, filterIdx) => ({
						key: filterIdx + '',
						label: filters.title,
						children: filters.sub_categories.map(
							(sub_category, sub_category_idx) => ({
								key: `${filterIdx}-${sub_category_idx}`,
								label: sub_category.title,
							}),
						),
					}))
				"
				v-model="value"
				@node-select="(value: any) => update(value.label)"
				:pt="{
					label: 'outline-none pl-0 text-black',
					clearicon: 'text-black w-[13px] h-[13px]',
					dropdownicon: 'text-black w-[13px] h-[13px]',
					nodelabel: 'text-[0.625rem]',
				}"
				:placeholder="title"
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

	[data-pc-section='nodelabel'] {
		@apply text-[0.625rem];
	}

	.p-tree-node-content.p-tree-node-selectable.p-tree-node-selected {
		@apply bg-red2 text-primary;
	}
</style>
