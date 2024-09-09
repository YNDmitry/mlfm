<script setup lang="ts">
	const links = ref([
		{title: 'Главная', href: '/'},
		{title: 'Каталог', href: '/catalog'},
		{title: 'О нас', href: '/about'},
		{title: 'Подарочная карта', href: '/gift-card'},
		{title: 'Контакты', href: '/contact-us'},
	])

	const {isMobile} = useDevice()
	const isOpen = ref(false)

	const isDesktopMenuOpen = ref(false)

	const openMenu = () => {
		if (!isMobile) return
		isOpen.value = !isOpen.value
	}
	const tooltipStyles = {
		text: 'text-[0.5rem] p-[0.5rem] bg-red2 text-primary',
	}
</script>

<template>
	<header
		class="sticky top-0 z-[1000] translate-y-0 transition-all duration-500"
	>
		<div class="relative flex items-center justify-center bg-primary px-5 py-5">
			<div class="relative flex items-center max-tablet:hidden" v-auto-animate>
				<div @click="isDesktopMenuOpen = !isDesktopMenuOpen">
					<HeaderMenuBtn class="max-tablet:hidden" />
				</div>
				<div
					v-show="isDesktopMenuOpen"
					class="absolute left-8 flex items-center gap-3"
				>
					<NuxtLink
						to="/profile"
						class="h-5 w-5"
						v-tooltip.bottom="{value: 'Профиль', pt: tooltipStyles}"
					>
						<IconsProfile />
					</NuxtLink>
					<NuxtLink
						to="/wishlist"
						class="h-5 w-5"
						v-tooltip.bottom="{value: 'Избранное', pt: tooltipStyles}"
					>
						<IconsHearth class="text-primary" />
					</NuxtLink>
				</div>
			</div>
			<HeaderMenuBtn
				@click="openMenu"
				:is-open="isOpen"
				class="hidden max-tablet:mr-auto max-tablet:block"
			/>
			<HeaderLogo />
			<HeaderIcons :isMobile="isMobile" />
		</div>
		<HeaderMobileMenu :isOpen="isOpen" :links="links" @closeMenu="openMenu" />
		<PopupsTheCart />
		<PopupsSearch />
	</header>
</template>
