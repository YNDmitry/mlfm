<script setup lang="ts">
	definePageMeta({
		layout: 'default',
	})

	const {params} = useRoute()

	const {data} = useAsyncGql(
		'Doc',
		{slug: params.slug as string},
		{
			getCachedData(key, nuxtApp) {
				return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
			},
		},
	)

	console.log(data)
</script>

<template>
	<section
		class="font-roboto max-tablet:pb-[3.125rem] max-tablet:pt-[2.5rem] tablet:pb-[112px] tablet:pt-[72px]"
	>
		<div class="container max-w-[800px]">
			<div
				class="flex flex-col items-center justify-center max-tablet:gap-4 tablet:gap-6"
			>
				<h1
					class="text-center text-h1 max-laptop:text-[2.5rem] max-tablet:text-h1Mob"
				>
					{{ data.docs[0].title }}
				</h1>

				<p class="max-mobile:text-[0.875rem] mobile:text-[18px]">
					Дата вступления в силу:
					{{ new Date(data.docs[0].date_updated).getDay() }}.{{
						new Date(data.docs[0].date_updated).getMonth()
					}}.{{ new Date(data.docs[0].date_updated).getFullYear() }}
				</p>
			</div>

			<div
				v-html="data.docs[0].body"
				class="mt-9 flex flex-col max-tablet:gap-3 max-tablet:pt-[2.5rem] tablet:gap-4"
			></div>
		</div>
	</section>
</template>
