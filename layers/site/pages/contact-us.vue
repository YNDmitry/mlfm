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

	useSeoMetaUtil(data.value.contacts?.SEO, appConfig)
</script>

<template>
	<section class="py-16 max-tablet:pt-[2rem]">
		<div class="container max-w-[680px]">
			<h1
				class="text-center text-h1 leading-[110%] max-laptop:text-[48px] max-tablet:text-[1.25rem]"
			>
				Свяжитесь с нами
			</h1>

			<p class="mt-4 text-center text-[1rem] max-tablet:text-[0.75rem]">
				Наша дружная команда будет рада услышать вас.
			</p>

			<div class="font-roboto flex flex-col gap-4 pt-[2rem]">
				<div
					v-for="(item, idx) in data.contacts?.blocks"
					:key="idx"
					class="flex items-center justify-center gap-4 font-light max-tablet:gap-2 max-tablet:text-[12px] max-mobile:text-[0.625rem]"
				>
					<NuxtImg
						:src="item?.item?.icon?.id"
						width="25"
						height="25"
						provider="directus"
						class="max-tablet:w-5"
						placeholder
					/>

					<span>{{ item?.item?.text }}</span>
				</div>
			</div>
		</div>
	</section>
</template>
