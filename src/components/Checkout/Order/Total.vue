<script setup lang="ts">
	const props = defineProps({
		totalPrice: Number,
		discount: Number,
	})
</script>

<template>
	<div>
		<div
			class="relative flex flex-col gap-[1.875rem] max-laptop:pt-[45px] laptop:pb-[1.25rem] laptop:pt-[1.25rem] laptop:after:absolute laptop:after:bottom-0 laptop:after:left-0 laptop:after:h-[2px] laptop:after:w-full laptop:after:bg-gray2 laptop:after:content-[’’]"
		>
			Доставка 500₽ Скидка -360₽ Итого
			{{ totalPrice }}
		</div>
	</div>
</template>
