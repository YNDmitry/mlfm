<script setup lang="ts">
	if (process.client) {
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
	<div id="page-wrapper" class="flex min-h-screen flex-col overflow-x-clip">
		<Header />
		<main id="main-wrapper">
			<slot />
		</main>
		<Footer />
		<TheWhatsapp />
		<PopupsTheNewsletter />
	</div>
</template>
