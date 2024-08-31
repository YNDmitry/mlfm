<script setup lang="ts">
	const appConfig = useRuntimeConfig()
	const {data} = await useAsyncGql(
		'AboutUs',
		{},
		{
			getCachedData(key, nuxtApp) {
				return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
			},
		},
	)

	useSeoMetaUtil(data.value.about_us?.SEO, appConfig)
</script>

<template>
	<section
		class="pb-[7rem] pt-16 max-laptop:pt-[6.25rem] max-tablet:pb-[6.25rem] max-tablet:pt-[3.125rem] max-mobile:pt-[2rem]"
	>
		<div class="container max-w-[732px]">
			<article class="wysiwyg" v-html="data.about_us?.body"></article>
		</div>
	</section>
</template>

<style>
	.wysiwyg h1 {
		@apply mb-8 text-center text-h1 font-medium uppercase max-tablet:text-h1Mob;
	}

	.wysiwyg img {
		@apply my-6 w-full;
	}
</style>
