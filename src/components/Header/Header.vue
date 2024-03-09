<script setup lang="ts">
	const links = [
		{
			title: 'Главная',
			href: '/',
		},
		{
			title: 'Каталог',
			href: '/catalog',
		},
		{
			title: 'Подарочная карта',
			href: '/gift-cards',
		},
		{
			title: 'Скидки',
			href: '/discounts',
		},
		{
			title: 'Контакты',
			href: '/contacts',
		},
	]

	const websiteStore = useWebsiteStore()
</script>
<template>
	<header class="sticky top-0 z-50">
		<div class="relative flex items-center justify-center bg-primary px-5 py-5">
			<div>
				<div class="flex items-center gap-2">
					<IconsSearch />
					<span class="text-[0.625rem]">Поиск</span>
				</div>
			</div>
			<div class="absolute left-auto right-auto">
				<HeaderLogo />
			</div>
			<div class="ml-auto flex items-center gap-5">
				<NuxtLink>
					<IconsHearth />
				</NuxtLink>
				<button @click="websiteStore.handleVisibleCart()">
					<IconsCart />
				</button>
				<NuxtLink to="/profile">
					<IconsProfile />
				</NuxtLink>
			</div>
		</div>
		<div class="bg-black px-5 py-4">
			<div class="flex items-center justify-center gap-4">
				<NuxtLink
					v-for="link in links"
					:key="link.href"
					:to="link.href"
					class="text-[0.625rem] font-medium uppercase text-primary"
				>
					{{ link.title }}
				</NuxtLink>
			</div>
		</div>
		<PopupsTheCart />
	</header>
</template>
