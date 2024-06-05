<script setup lang="ts">
	const LenisOptions = ref({
		duration: 0.5,
		lerp: 0.1,
		syncTouchLerp: 0.075,
		smoothWheel: true,
		wheelMultiplier: 1,
		touchMultiplier: 1,
		autoResize: true,
	})

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
			<lenis :options="LenisOptions">
				<NuxtPage />
			</lenis>
		</NuxtLayout>
	</div>
</template>
