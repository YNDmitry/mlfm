<!-- <script setup lang="ts">
	const websiteStore = useWebsiteStore()

	await websiteStore.getConfig()

	if (process.client) {
		await useUserStore().getUserInfo()
		await useWishlistStore().initWishlist()
	}
</script> -->

<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>
