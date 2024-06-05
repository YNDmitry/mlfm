<script setup lang="ts">
	const props = defineProps({
		totalPrice: Number,
		discount: Number,
	})

	const priceFormated = computed(() =>
		Intl.NumberFormat('ru-RU', {
			style: 'currency',
			currency: 'RUB',
		}).format(props.totalPrice as number),
	)
</script>

<template>
	<div>
		<div
			class="relative mt-8 flex flex-col gap-2 border-t-[1px] border-gray2 pb-[1.25rem] pt-[1.25rem]"
		>
			<div class="flex justify-between">
				<span>Доставка</span>
				<span>500 ₽</span>
			</div>
			<div class="flex justify-between">
				<span>Скидка</span>
				<span>-360₽</span>
			</div>
			<div class="flex justify-between">
				<span>Итого</span>
				<span>{{ priceFormated }}</span>
			</div>
		</div>
	</div>
</template>
