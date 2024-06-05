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
	<div class="z-50 ml-auto flex items-center gap-5 max-tablet:gap-3">
		<button @click="handleIconClick('search')" type="button">
			<IconsSearch class="inline-block h-[18px] w-[18px]" />
		</button>
		<button @click="handleIconClick('cart')">
			<IconsCart class="inline-block h-5 w-5" />
		</button>
	</div>
</template>
