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

		const {scrollState} = useLenis()

		const header = ref<HTMLElement | null>(null)
		const lastScrollY = ref(0)
		const router = useRouter()

		const handleScroll = (currentScrollY: any) => {
			if (header.value) {
				if (
					currentScrollY.animate.to > lastScrollY.value &&
					currentScrollY.animate.to > 200
				) {
					// Scrolling down
					header.value.classList.add('translate-y-[-100%]')
				} else if (currentScrollY.animate.to < lastScrollY.value) {
					// Scrolling up
					header.value.classList.remove('translate-y-[-100%]')
				}
				lastScrollY.value = currentScrollY.animate.to
			}
		}

		watch(scrollState, handleScroll, {deep: true})

		onMounted(() => {
			header.value = document.querySelector('header')
		})

		router.beforeEach(() => {
			if (header.value) {
				header.value.classList.remove('translate-y-[-100%]')
			}
		})
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
