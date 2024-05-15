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
		const fetchUserInfo = async () => {
			try {
				await userStore.getUserInfo()
			} catch (error) {
				console.error('Failed to fetch user info:', error)
			}
		}

		const initWishlist = () => {
			try {
				wishlistStore.initWishlist()
			} catch (error) {
				console.error('Failed to initialize wishlist:', error)
			}
		}

		await fetchUserInfo()
		initWishlist()

		const {scrollState, lenis, setScrollState} = useLenis()

		useRouter().afterEach(() => {
			return setScrollState(0, 0)
		})

		const header = ref<HTMLElement | null>(null)
		const lastScrollY = ref(0)

		watch(
			lenis.value,
			(currentScrollY) => {
				console.log(currentScrollY)
				if (header.value) {
					// if (currentScrollY > lastScrollY.value && currentScrollY > 200) {
					// 	// Scrolling down
					// 	header.value.classList.add('translate-y-[-100%]')
					// } else if (currentScrollY < lastScrollY.value) {
					// 	// Scrolling up
					// 	header.value.classList.remove('translate-y-[-100%]')
					// }
					// lastScrollY.value = currentScrollY
				}
			},
			{deep: true},
		)

		onMounted(() => {
			header.value = document.querySelector('header')
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
