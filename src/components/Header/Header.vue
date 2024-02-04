<script setup>
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
			title: 'Доставка',
			href: '/delivery',
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
</script>
<template>
	<header class="sticky top-0 z-50">
		<div class="relative px-5 py-5 flex items-center justify-center bg-white">
			<div>
				<div class="flex items-center gap-2">
					<IconsSearch />
					<span class="text-[0.625rem]">Поиск</span>
				</div>
			</div>
			<div class="absolute left-auto right-auto">
				<HeaderLogo />
			</div>
			<div class="flex items-center gap-5 ml-auto">
				<div>
					<IconsHearth />
				</div>
				<div>
					<IconsCart />
				</div>
				<NuxtLink to="/profile">
					<IconsProfile />
				</NuxtLink>
			</div>
		</div>
		<div class="px-5 py-4 bg-black">
			<div class="flex items-center justify-center gap-4">
				<NuxtLink
					v-for="link in links"
					:key="link.href"
					:to="link.href"
					class="text-[0.625rem] font-medium text-white uppercase"
				>
					{{ link.title }}
				</NuxtLink>
			</div>
		</div>
	</header>
</template>
