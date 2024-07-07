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
		title: data.value.contacts?.meta_title,
		ogTitle: data.value.contacts?.meta_title,
		description: data.value.contacts?.meta_description,
		ogDescription: data.value.contacts?.meta_description,
		ogImage:
			appConfig.public.databaseUrl +
			'assets/' +
			data.value.contacts?.og_image?.id,
	})

	const websiteStore = useWebsiteStore()
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
					class="flex items-center justify-center gap-4 font-light max-tablet:text-[12px] max-mobile:text-[0.625rem]"
				>
					<IconsEmail />

					<NuxtLink :to="'mail:' + websiteStore.siteSettings?.current_email">{{
						websiteStore.siteSettings?.current_email
					}}</NuxtLink>
				</div>

				<div
					class="flex items-center justify-center gap-4 font-light max-tablet:text-[12px] max-mobile:text-[0.625rem]"
				>
					<IconsPhone />

					<NuxtLink
						:to="'tel:' + websiteStore.siteSettings?.current_phone_number"
						>{{ websiteStore.siteSettings?.current_phone_number }}</NuxtLink
					>
				</div>

				<div
					class="flex items-center justify-center gap-4 font-light max-tablet:text-[12px] max-mobile:text-[0.625rem]"
				>
					<IconsMap />

					<div>{{ websiteStore.siteSettings?.current_address }}</div>
				</div>
			</div>
		</div>
	</section>
</template>
