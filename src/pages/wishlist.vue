<script setup lang="ts">
	definePageMeta({
		layout: 'default',
	})

	useSeoMeta({
		title: 'Избранное | MLFM',
		ogTitle: 'Избранное | MLFM',
		lang: 'ru',
	})
</script>

<template>
	<section class="py-12">
		<div class="container">
			<h1
				class="text-center text-h1 leading-[110%] max-laptop:text-[48px] max-tablet:text-[1.25rem] max-mobile:pb-[2rem] mobile:pb-[24px]"
			>
				Избранное
			</h1>
			<div class="mt-8 grid grid-cols-[1fr_1fr_1fr_1fr] gap-6"></div>
			<div class="mx-auto mt-16 max-w-[432px] text-center">
				<div>Пока что ничего нет</div>
				<div class="mt-6">
					<NuxtLink
						to="/catalog"
						class="flex h-11 w-full items-center justify-center rounded-main bg-red2 font-montserrat text-[0.75rem] font-bold uppercase tracking-[3px] text-primary transition-colors hover:bg-red2-hover"
					>
						перейти в каталог
					</NuxtLink>
				</div>
			</div>
		</div>
	</section>
</template>
