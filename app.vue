<script setup lang="ts">
	import {useWebsiteStore} from './core/src/stores'
	import {useUserStore} from './core/src/stores/user'
	import {useWishlistStore} from './core/src/stores/wishlist'

	const websiteStore = useWebsiteStore()

	await websiteStore.getConfig()

	if (process.client) {
		await useUserStore().getUserInfo()
		await useWishlistStore().initWishlist()
		const toast = useToast()
		websiteStore.setToastInstance(toast)
	}
</script>

<template>
	<NuxtLayout>
		<ClientOnly>
			<Toast
				position="top-right"
				:pt="{
					summary: 'text-[0.8rem] font-normal',
					detail: 'text-[0.6rem] font-normal',
				}"
			/>
		</ClientOnly>
		<NuxtPage />
	</NuxtLayout>
</template>
