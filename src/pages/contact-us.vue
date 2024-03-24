<script setup>
	const appConfig = useRuntimeConfig()

	definePageMeta({
		layout: 'default',
	})

	const {data: page} = await useAsyncData(() => {
		return getItems({
			collection: 'contacts',
			params: {
				fields: ['meta_title', 'meta_description', 'og_image'],
			},
		})
	})

	useSeoMeta({
		title: page.meta_title,
		ogTitle: page.meta_title,
		description: page.meta_description,
		ogDescription: page.meta_description,
		ogImage: appConfig.public.databaseUrl + 'assets/' + page.og_image,
		lang: 'ru',
	})

	const config = useState('config')
</script>

<template>
	<section class="pb-[95px] pt-[95px] max-tablet:pt-[2rem]">
		<div class="container max-w-[680px]">
			<h1
				class="leading-[110%] max-laptop:text-[48px] max-tablet:text-[1.25rem] max-mobile:pb-[2rem] mobile:pb-[24px] laptop:text-[55px]"
			>
				Свяжитесь с нами
			</h1>

			<p class="text-[1.25rem] max-tablet:text-[12px] max-mobile:text-[8px]">
				Наша дружная команда будет рада услышать вас.
			</p>

			<div class="font-roboto flex flex-col gap-4 pt-[2rem]">
				<div
					class="flex items-center gap-4 font-light max-tablet:text-[12px] max-mobile:text-[0.625rem]"
				>
					<IconsEmail />

					<NuxtLink :to="'mail:' + config.current_email">{{
						config.current_email
					}}</NuxtLink>
				</div>

				<div
					class="flex items-center gap-4 font-light max-tablet:text-[12px] max-mobile:text-[0.625rem]"
				>
					<IconsPhone />

					<NuxtLink :to="'tel:' + config.current_phone_number">{{
						config.current_phone_number
					}}</NuxtLink>
				</div>

				<div
					class="flex items-center gap-4 font-light max-tablet:text-[12px] max-mobile:text-[0.625rem]"
				>
					<IconsMap />

					<div>{{ config.current_address }}</div>
				</div>
			</div>
		</div>

		<div
			id="map"
			class="mx-auto max-tablet:w-full max-tablet:pt-[1rem] max-mobile:h-[250px] mobile:h-[405px] tablet:w-[635px] tablet:pt-[35px]"
		>
			<NuxtImg
				provider="directus"
				src="8a3d173d-d1f6-4f31-b792-8e15baa93d7d"
				width="635"
				height="405"
				class="h-full"
			/>
		</div>
	</section>
</template>
