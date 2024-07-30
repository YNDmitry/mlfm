<script setup lang="ts">
	const appConfig = useRuntimeConfig()

	definePageMeta({
		layout: 'default',
	})

	const {data} = await useAsyncGql(
		'ContactUs',
		{},
		{
			getCachedData(key, nuxtApp) {
				return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
			},
		},
	)

	useSeoMeta({
		title: data.value.contacts?.SEO?.meta_title,
		ogTitle: data.value.contacts?.SEO?.meta_title,
		description: data.value.contacts?.SEO?.meta_description,
		ogDescription: data.value.contacts?.SEO?.meta_description,
		ogImage:
			appConfig.public.databaseUrl +
			'assets/' +
			data.value.contacts?.SEO?.og_image?.id,
	})
</script>

<template>
	<section class="py-16 max-tablet:pt-[2rem]">
		<div class="container max-w-[680px]">
			<h1
				class="text-center text-h1 leading-[110%] max-laptop:text-[48px] max-tablet:text-[1.25rem] max-mobile:pb-[2rem]"
			>
				Свяжитесь с нами
			</h1>

			<p
				class="mt-4 text-center text-[1rem] max-tablet:text-[12px] max-mobile:text-[8px]"
			>
				Наша дружная команда будет рада услышать вас.
			</p>

			<div class="font-roboto flex flex-col gap-4 pt-[2rem]">
				<div
					v-for="(item, idx) in data.contacts?.blocks"
					:key="idx"
					class="flex items-center justify-center gap-4 font-light max-tablet:text-[12px] max-mobile:text-[0.625rem]"
				>
					<NuxtImg
						:src="item?.item?.icon?.id"
						width="25"
						height="25"
						provider="directus"
						placeholder
					/>

					<span>{{ item?.item?.text }}</span>
				</div>
			</div>
		</div>
	</section>
</template>
