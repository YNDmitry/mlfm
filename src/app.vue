<script setup lang="ts">
	const LenisOptions = ref({
		duration: 0.2,
		lerp: 0.1,
		syncTouchLerp: 0.075,
		smoothWheel: true,
		wheelMultiplier: 1,
		touchMultiplier: 1,
		autoResize: true,
	})

	const websiteStore = useWebsiteStore()

	await useAsyncData(
		'config',
		async () => {
			return await websiteStore.getConfig()
		},
		{
			getCachedData(key, nuxtApp) {
				return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
			},
		},
	)

	if (process.client) {
		const userStore = useUserStore()
		const wishlistStore = useWishlistStore()
		wishlistStore.initWishlist()
		userStore.getUserInfo()
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
