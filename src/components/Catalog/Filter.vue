<script setup lang="ts">
	interface Props {
		filters: [
			{
				title: string
			},
		]
		currentFilter: any
		title: string
	}
	defineProps<Props>()

	const emit = defineEmits(['update:currentFilter'])
</script>

<template>
	<div v-if="filters" class="relative flex flex-col gap-[1.25rem] pt-[1.25rem]">
		<span class="text-[0.875rem]">{{ title }}</span>

		<div
			:id="'filter-wrapper-' + title"
			class="relative border-b-2 border-b-gray2 pb-[0.625rem]"
			data-lenis-prevent
		>
			<Select
				@update:modelValue="
					(value: any) => {
						emit('update:currentFilter', value)
						useState('mobileFilterModal').value = false
					}
				"
				:modelValue="currentFilter"
				:options="filters.map((filter) => filter.title)"
				:placeholder="title"
				:showClear="currentFilter !== null"
				:aria-label="title"
				:pt="{
					dropdownicon: 'w-[10px]',
					clearicon: 'w-[10px] ml-auto mr-2',
					listcontainer: 'bg-primary h-[140px] overflow-y-scroll pb-4',
					option:
						'text-[0.625rem] flex items-center px-2 rounded-main text-black h-[2rem] w-full cursor-pointer my-[0.5rem] transition-all hover:bg-grayLight',
					input: 'outline-none',
					overlay: '!top-[23px] !left-0 !right-0',
				}"
				:append-to="'self'"
				unstyled
				class="flex cursor-pointer justify-between border-0 text-[0.625rem] shadow-none outline-none"
			>
			</Select>
		</div>
	</div>
</template>
