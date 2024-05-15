<script setup lang="ts">
	interface Props {
		filters: [
			{
				title: string
			},
		]
		currentFilter: string
		title: string
	}
	defineProps<Props>()

	const emit = defineEmits(['update:currentFilter'])
</script>

<template>
	<div
		v-if="filters"
		class="relative flex flex-col gap-[1.25rem] pb-[0.625rem] pt-[1.25rem] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-gray2 after:content-['']"
	>
		<span class="text-[0.875rem]">{{ title }}</span>

		<div :id="'filter-wrapper-' + title" class="relative">
			<Dropdown
				@update:modelValue="(value) => emit('update:currentFilter', value)"
				:modelValue="currentFilter"
				:options="filters.map((filter) => filter.title)"
				:placeholder="title"
				unstyled
				:showClear="true"
				:aria-label="title"
				:pt="{
					dropdownicon: 'w-[10px]',
					clearicon: 'w-[10px] ml-auto mr-2',
					wrapper: 'bg-primary py-2 overflow-y-scroll py-4',
					list: 'h-[140px]',
					item: 'text-[0.625rem] flex items-center px-2 rounded-main text-black h-[2rem] w-full cursor-pointer my-[0.5rem] transition-all hover:bg-grayLight',
					input: 'outline-none',
					panel: '!top-[23px] !left-0',
				}"
				class="flex cursor-pointer justify-between border-0 text-[0.625rem] shadow-none outline-none"
				:append-to="'#filter-wrapper-' + title"
			>
			</Dropdown>
		</div>
	</div>
</template>
