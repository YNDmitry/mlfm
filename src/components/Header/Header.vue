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

	const isMobile = useMediaQuery('(max-width: 768px)')
</script>
<template>
	<div
		v-if="!isMobile"
		class="flex justify-between gap-2 bg-black px-5 py-3 text-primary"
	>
		<div class="text-[0.625rem] font-semibold max-laptop:hidden">
			{{ websiteStore?.siteSettings?.current_phone_number }}
		</div>
		<div class="text-[0.625rem] uppercase">
			{{ websiteStore?.siteSettings?.general_message }}
		</div>
		<NuxtLink to="/contacts" class="flex items-center gap-2 !text-primary">
			<IconsLocation />
			<span class="text-[0.625rem]">Магазины</span>
		</NuxtLink>
	</div>
	<header class="sticky top-0 z-50">
		<div class="relative flex items-center justify-center bg-primary px-5 py-5">
			<div v-if="!isMobile">
				<div class="flex items-center gap-2">
					<IconsSearch />
					<span class="text-[0.625rem]">Поиск</span>
				</div>
			</div>
			<div class="absolute left-auto right-auto z-50 max-tablet:relative">
				<HeaderLogo v-if="!isMobile" />
				<IconsFooterLogo v-else class="h-7 w-7" />
			</div>
			<div v-if="isMobile" class="relative z-50 ml-auto">
				<div class="h-[1px] w-5 bg-black"></div>
				<div class="mt-[5px] h-[1px] w-5 bg-black"></div>
				<div class="mt-[5px] h-[1px] w-5 bg-black"></div>
			</div>
			<div class="ml-auto flex items-center gap-5" v-if="!isMobile">
				<NuxtLink to="/wishlist" class="h-5 w-5">
					<IconsHearth />
				</NuxtLink>
				<button @click="websiteStore.handleVisibleCart" class="h-5 w-5">
					<IconsCart />
				</button>
				<NuxtLink to="/profile" class="h-5 w-5">
					<IconsProfile />
				</NuxtLink>
			</div>
		</div>
		<div
			class="bg-black px-5 py-4 max-tablet:fixed max-tablet:left-0 max-tablet:right-0 max-tablet:top-0 max-tablet:z-40 max-tablet:hidden max-tablet:h-screen max-tablet:bg-primary max-tablet:pt-20 max-mobile:bottom-0"
		>
			<div
				class="flex items-center justify-center gap-4 max-tablet:flex-col max-tablet:items-start max-tablet:gap-5"
			>
				<NuxtLink
					v-for="link in links"
					:key="link.href"
					:to="link.href"
					class="text-[0.625rem] font-medium uppercase text-primary max-tablet:text-[1rem] max-tablet:text-black"
				>
					{{ link.title }}
				</NuxtLink>
				<div class="mt-5 flex flex-col items-start gap-5" v-if="isMobile">
					<NuxtLink to="/wishlist">
						<IconsHearth class="mr-2 inline-block h-5 w-5" />
						<span>Избранное</span>
					</NuxtLink>
					<button @click="websiteStore.handleVisibleCart">
						<IconsCart class="mr-2 inline-block h-5 w-5" />
						<span>Корзина</span>
					</button>
					<NuxtLink to="/profile">
						<IconsProfile class="mr-2 inline-block h-5 w-5" />
						<span>Профиль</span>
					</NuxtLink>
				</div>
			</div>
		</div>
		<PopupsTheCart />
	</header>
</template>

<style scoped>
	.router-link-active.router-link-exact-active {
		@apply text-red;
	}
</style>
