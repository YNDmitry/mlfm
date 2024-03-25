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
			title: 'О нас',
			href: '/about',
		},
		{
			title: 'Подарочная карта',
			href: '/gift-cards',
		},
		{
			title: 'Контакты',
			href: '/contact-us',
		},
	]

	const config = useState('config')
	const websiteStore = useWebsiteStore()

	const isMobile = useMediaQuery('(max-width: 768px)')

	const isOpen = ref(false)

	const openMenu = () => {
		if (!isMobile) return
		isOpen.value = !isOpen.value
	}
</script>
<template>
	<div
		class="flex justify-between gap-2 bg-black px-5 py-3 text-primary max-tablet:hidden"
	>
		<div
			v-if="config?.current_phone_number"
			class="text-[0.625rem] font-semibold max-laptop:hidden"
		>
			{{ config.current_phone_number }}
		</div>
		<div v-if="config?.general_message" class="text-[0.625rem] uppercase">
			{{ config.general_message }}
		</div>
		<NuxtLink to="/contact-us" class="flex items-center gap-2 !text-primary">
			<IconsLocation />
			<span class="text-[0.625rem]">Магазины</span>
		</NuxtLink>
	</div>
	<header class="sticky top-0 z-50">
		<div class="relative flex items-center justify-center bg-primary px-5 py-5">
			<div class="max-tablet:hidden">
				<div class="flex items-center gap-2">
					<IconsSearch />
					<span class="text-[0.625rem]">Поиск</span>
				</div>
			</div>
			<NuxtLink
				to="/"
				class="absolute left-auto right-auto z-50 max-tablet:relative"
			>
				<HeaderLogo class="max-tablet:hidden" />
				<IconsFooterLogo class="h-7 w-7 tablet:hidden" />
			</NuxtLink>
			<button
				type="button"
				@click="openMenu"
				class="relative z-50 ml-auto tablet:hidden"
			>
				<div class="h-[1px] w-5 bg-black"></div>
				<div class="mt-[5px] h-[1px] w-5 bg-black"></div>
				<div class="mt-[5px] h-[1px] w-5 bg-black"></div>
			</button>
			<Teleport to="#mobile-links" :disabled="!isMobile">
				<ClientOnly>
					<div class="ml-auto flex items-center gap-5">
						<div
							class="flex items-start gap-5 max-tablet:mt-5 max-tablet:flex-col"
						>
							<NuxtLink to="/wishlist" @click="openMenu">
								<IconsHearth
									class="inline-block h-5 w-5 text-primary max-tablet:mr-2"
								/>
								<span class="tablet:hidden">Избранное</span>
							</NuxtLink>
							<button @click="websiteStore.handleVisibleCart">
								<IconsCart class="inline-block h-5 w-5 max-tablet:mr-2" />
								<span class="tablet:hidden">Корзина</span>
							</button>
							<NuxtLink to="/profile" @click="openMenu">
								<IconsProfile class="inline-block h-5 w-5 max-tablet:mr-2" />
								<span class="tablet:hidden">Профиль</span>
							</NuxtLink>
						</div>
					</div>
				</ClientOnly>
			</Teleport>
		</div>
		<div
			:class="{
				'max-tablet:hidden': !isOpen,
			}"
			class="bg-black px-5 py-4 max-tablet:fixed max-tablet:left-0 max-tablet:right-0 max-tablet:top-0 max-tablet:z-40 max-tablet:h-screen max-tablet:bg-primary max-tablet:pt-20 max-mobile:bottom-0"
		>
			<div
				class="flex items-center justify-center gap-4 max-tablet:flex-col max-tablet:items-start max-tablet:gap-5"
			>
				<NuxtLink
					v-for="link in links"
					:key="link.href"
					:to="link.href"
					@click="openMenu"
					class="text-[0.625rem] font-medium uppercase text-primary max-tablet:text-[1rem] max-tablet:text-black"
				>
					{{ link.title }}
				</NuxtLink>
				<div
					id="mobile-links"
					class="mt-5 flex flex-col items-start gap-5"
				></div>
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
