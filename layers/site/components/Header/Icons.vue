<script setup lang="ts">
	import {useWebsiteStore} from '~~/core/src/stores'

	const websiteStore = useWebsiteStore()

	const handleIconClick = (action: string) => {
		if (action === 'search') {
			websiteStore.handleVisibleSearch()
		} else if (action === 'cart') {
			websiteStore.handleVisibleCart()
		}
	}

	const tooltipStyles = {
		text: 'text-[0.5rem] p-[0.5rem] bg-red2 text-primary',
	}
</script>

<template>
	<div class="z-50 ml-auto flex items-center gap-5 max-tablet:gap-3">
		<button
			@click="handleIconClick('search')"
			type="button"
			v-tooltip.bottom="{value: 'Поиск', pt: tooltipStyles}"
		>
			<IconsSearch class="inline-block h-[18px] w-[18px]" />
		</button>
		<button
			@click="handleIconClick('cart')"
			v-tooltip.bottom="{value: 'Корзина', pt: tooltipStyles}"
		>
			<IconsCart class="inline-block h-5 w-5" />
		</button>
	</div>
</template>
