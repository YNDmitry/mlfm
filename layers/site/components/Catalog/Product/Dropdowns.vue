<script lang="ts" setup>
	interface Props {
		product_variants?: [
			{
				color_id: {
					title: string
				}
				size_id: {
					small_title: string
				}
			},
		]
		stone?: string
		material?: string
		description?: string
		category?: string
		brand?: string
	}
	const props = defineProps<Props>()
	console.log(props)
</script>

<template>
	<div class="flex flex-col max-tablet:gap-[0.75rem] tablet:gap-[1.25rem]">
		<Accordion :value="description || product_variants ? '0' : '1'">
			<AccordionPanel
				value="0"
				class="p-0"
				v-if="description || product_variants"
			>
				<AccordionHeader class="text-[.875rem] font-normal"
					><span class="py-2">О продукте</span></AccordionHeader
				>
				<AccordionContent>
					<p
						class="flex flex-col gap-2 pt-3 text-[.75rem]"
						v-for="(item, idx) in product_variants"
						:key="idx"
					>
						<span v-if="item.color_id">Цвет: {{ item.color_id.title }}</span>
						<span v-if="item.size_id"
							>Размер: {{ item.size_id.small_title }}</span
						>
					</p>
					<p class="pt-3 text-[.75rem]" v-if="description">
						{{ description }}
					</p>
					<span v-if="stone" class="pt-3 text-[.75rem]"
						>Камень: {{ stone }}</span
					>
					<span v-if="material" class="pt-3 text-[.75rem]"
						>Материал: {{ material }}</span
					>
				</AccordionContent>
			</AccordionPanel>
			<AccordionPanel value="1" class="p-0">
				<AccordionHeader class="text-[.875rem] font-normal"
					><span class="py-2">Категория и бренд</span></AccordionHeader
				>
				<AccordionContent>
					<div
						class="flex flex-col gap-2 pt-3 max-tablet:text-[0.625rem] tablet:text-[0.75rem]"
					>
						<span v-if="category">Категория: {{ category }}</span>
						<span v-if="brand">Бренд: {{ brand }}</span>
					</div>
				</AccordionContent>
			</AccordionPanel>
		</Accordion>
	</div>
</template>
