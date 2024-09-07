<script setup lang="ts">
	import {useWebsiteStore} from './core/src/stores'
	import {useUserStore} from './core/src/stores/user'
	import {useWishlistStore} from './core/src/stores/wishlist'

	const websiteStore = useWebsiteStore()

	await websiteStore.getConfig()

	if (process.client) {
		await useUserStore().getUserInfo()
		await useWishlistStore().initWishlist()
	}
</script>

<template>
	<NuxtLayout>
		<Toast />
		<NuxtPage />
	</NuxtLayout>
</template>
