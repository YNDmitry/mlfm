<script setup lang="ts">
	const websiteStore = useWebsiteStore()

	const handleIconClick = (action: string) => {
		if (action === 'search') {
			websiteStore.handleVisibleSearch()
		} else if (action === 'cart') {
			websiteStore.handleVisibleCart()
		}
	}
</script>

<template>
	<div class="ml-auto flex items-center gap-5 max-tablet:hidden">
		<button
			@click="$emit('iconClick', 'search'), $emit('closeMenu')"
			type="button"
		>
			<IconsSearch class="inline-block h-[18px] w-[18px] max-tablet:mr-2" />
			<span class="tablet:hidden">Поиск</span>
		</button>
		<button @click="$emit('iconClick', 'cart'), $emit('closeMenu')">
			<IconsCart class="inline-block h-5 w-5 max-tablet:mr-2" />
			<span class="tablet:hidden">Корзина</span>
		</button>
	</div>
</template>
