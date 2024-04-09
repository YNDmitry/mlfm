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

	const userStore = useUserStore()
	const websiteStore = useWebsiteStore()
	const cartStore = useCartStore()

	const config = useState('config')
	const {data: webConfig} = await useAsyncData(
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
	config.value = webConfig

	await callOnce(async () => {
		await userStore.getUserInfo()
		// await cartStore.initCart()
	})
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
