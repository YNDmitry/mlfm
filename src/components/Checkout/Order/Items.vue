<script setup lang="ts">
	const props = defineProps({
		items: Array,
	})

	const formattedPrice = (price: number) => {
		return Intl.NumberFormat('ru-RU', {
			style: 'currency',
			currency: 'RUB',
		}).format(price)
	}
</script>

<template>
	<div class="flex flex-col gap-[1.25rem]">
		<article
			v-for="item in items"
			:key="item.id"
			class="flex max-mobile:gap-[0.625rem] mobile:gap-[0.938rem]"
		>
			<NuxtImg
				provider="directus"
				v-if="item?.main_image"
				:src="item?.main_image.id"
				format="webp"
				class="max-mobile:h-[3.75rem] max-mobile:w-[6.563rem] mobile:h-[6.25rem]"
			/>
			<div class="flex w-full items-center justify-between">
				<div class="flex flex-col gap-1">
					<span class="text-[0.625rem]">{{ item.category }}</span>
					<p class="text-[0.625rem] font-medium">{{ item.title }}</p>
					<span class="text-[8px] opacity-50">{{ item.quantity }} шт</span>
				</div>
				<span class="text-[0.625rem]">{{ formattedPrice(item.price) }}</span>
			</div>
		</article>
	</div>
</template>
