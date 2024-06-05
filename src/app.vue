<script setup lang="ts">
	const websiteStore = useWebsiteStore()

	const {data: configData, error: configError} = await useAsyncData(
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

	const userStore = useUserStore()
	const wishlistStore = useWishlistStore()

	if (process.client) {
		await userStore.getUserInfo()
		await wishlistStore.initWishlist()
	}
</script>

<template>
	<div>
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</div>
</template>
