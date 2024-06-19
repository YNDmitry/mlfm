<script setup lang="ts">
	const websiteStore = useWebsiteStore()

	await useAsyncData(
		'config',
		async () => {
			try {
				return await websiteStore.getConfig()
			} catch (error) {
				console.error('Failed to fetch config:', error)
				throw error
			}
		},
		{
			getCachedData(key, nuxtApp) {
				return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
			},
		},
	)

	if (process.client) {
		await useUserStore().getUserInfo()
		await useWishlistStore().initWishlist()
	}
</script>

<template>
	<div>
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</div>
</template>
