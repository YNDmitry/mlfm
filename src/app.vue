<script setup>
	const {getItems} = useDirectusItems()

	const LenisOptions = ref({
		duration: 0.2,
		lerp: 0.1,
		syncTouchLerp: 0.075,
		smoothWheel: true,
		wheelMultiplier: 1,
		touchMultiplier: 1,
		autoResize: true,
	})

	const config = useState('config')
	const {data: webConfig} = await useAsyncData('config', () => {
		return getItems({
			collection: 'site',
			params: {
				fields: [
					'meta_title',
					'meta_description',
					'meta_thumbnail',
					'general_message',
					'current_phone_number',
					'current_address',
					'current_email',
					'current_whatsapp',
				],
			},
		})
	})
	config.value = webConfig
	const userStore = useUserStore()
	await callOnce(() => {
		return userStore.getUserInfo()
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

<style>
	.page-enter-active,
	.page-leave-active {
		transition: all 0.4s;
	}
	.page-enter-from,
	.page-leave-to {
		opacity: 0;
		filter: blur(1rem);
	}
</style>
