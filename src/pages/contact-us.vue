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

	const config = useNuxtData('config').data
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

					<NuxtLink :to="'mail:' + config.current_email">{{
						config.current_email
					}}</NuxtLink>
				</div>

				<div
					class="flex items-center justify-center gap-4 font-light max-tablet:text-[12px] max-mobile:text-[0.625rem]"
				>
					<IconsPhone />

					<NuxtLink :to="'tel:' + config.current_phone_number">{{
						config.current_phone_number
					}}</NuxtLink>
				</div>

				<div
					class="flex items-center justify-center gap-4 font-light max-tablet:text-[12px] max-mobile:text-[0.625rem]"
				>
					<IconsMap />

					<div>{{ config.current_address }}</div>
				</div>
			</div>
		</div>

		<!-- <div
			id="map"
			class="mx-auto max-tablet:w-full max-tablet:pt-[1rem] max-mobile:h-[250px] mobile:h-[405px] tablet:w-[635px] tablet:pt-[35px]"
		>
			<NuxtImg
				provider="directus"
				src="8a3d173d-d1f6-4f31-b792-8e15baa93d7d"
				width="635"
				height="405"
				class="h-full w-full object-cover"
			/>
		</div> -->
	</section>
</template>
