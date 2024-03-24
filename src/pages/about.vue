<script setup>
	const appConfig = useRuntimeConfig()
	const {getItems} = useDirectusItems()
	const {data: page} = await useAsyncData(() => {
		return getItems({
			collection: 'about_us',
			params: {
				fields: ['meta_title', 'meta_description', 'og_image', 'body'],
			},
		})
	})

	useSeoMeta({
		title: page.value.meta_title,
		ogTitle: page.value.meta_title,
		description: page.value.meta_description,
		ogDescription: page.value.meta_description,
		ogImage: appConfig.public.databaseUrl + 'assets/' + page.value.og_image,
		twitterImage:
			appConfig.public.databaseUrl + 'assets/' + page.value.og_image,
		lang: 'ru',
	})
</script>

<template>
	<section
		class="pb-[7rem] pt-16 max-laptop:pt-[6.25rem] max-tablet:pb-[6.25rem] max-tablet:pt-[3.125rem] max-mobile:pt-[2rem]"
	>
		<div class="container max-w-[732px]">
			<article class="wysiwyg" v-html="page.body"></article>
		</div>
	</section>
</template>

<style>
	.wysiwyg h1 {
		@apply mb-8 text-[2rem] font-medium uppercase;
	}

	.wysiwyg img {
		@apply my-6 w-full;
	}
</style>
