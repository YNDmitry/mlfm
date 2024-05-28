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
		<HeaderSearchWishlistProfile @iconClick="handleIconClick" />
	</div>
</template>
