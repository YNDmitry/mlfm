<script lang="ts" setup></script>

<template>
	<div
		class="items-center justify-between gap-4 pb-[2.5rem] pt-[70] max-laptop:flex laptop:hidden"
	>
		<button
			type="button"
			class="flex h-[3.125rem] w-full items-center justify-center gap-[0.625rem] rounded-[12px] border-[1px] border-black text-[0.625rem] max-mobile:h-[38px]"
		>
			<IconsSelect />
			<span>Новое</span>
		</button>

		<button
			type="button"
			class="flex h-[3.125rem] w-full items-center justify-center gap-[0.625rem] rounded-[12px] border-[1px] border-black text-[0.625rem] max-mobile:h-[38px]"
		>
			<IconsFilters />
			<span>Фильтры</span>
		</button>
	</div>
</template>
