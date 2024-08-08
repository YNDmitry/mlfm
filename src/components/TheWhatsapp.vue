<script setup lang="ts">
	const websiteStore = useWebsiteStore()
</script>

<template>
	<NuxtLink
		v-tooltip="{
			value: 'Есть вопрос?',
			showDelay: 300,
			pt: {
				text: 'text-[0.625rem] bg-red mr-2',
			},
		}"
		target="_blank"
		:to="websiteStore.siteSettings?.current_whatsapp"
		class="fixed bottom-3 right-3 z-50 flex h-[3.5rem] w-[3.5rem] items-center gap-3 transition-all hover:scale-110 max-tablet:bottom-2 max-tablet:right-2"
	>
		<IconsWhatsApp class="h-[3rem] w-[3rem] rounded-[100%] bg-red p-2" />
	</NuxtLink>
</template>
