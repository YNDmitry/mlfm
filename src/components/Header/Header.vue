<script setup lang="ts">
	const links = ref([
		{title: 'Главная', href: '/'},
		{title: 'Каталог', href: '/catalog'},
		{title: 'О нас', href: '/about'},
		{title: 'Подарочная карта', href: '/gift-card'},
		{title: 'Контакты', href: '/contact-us'},
	])

	const items = ref([
		{
			label: 'Профиль',
			path: '/profile',
		},
		{
			label: 'Избранное',
			path: '/wishlist',
		},
	])

	const isMobile = useMediaQuery('(max-width: 768px)')
	const isOpen = ref(false)

	const openMenu = () => {
		if (!isMobile.value) return
		isOpen.value = !isOpen.value
	}
</script>

<template>
	<header
		class="sticky top-0 z-[1002] translate-y-0 transition-all duration-500"
	>
		<div class="relative flex items-center justify-center bg-primary px-5 py-5">
			<SpeedDial
				:model="items"
				direction="right"
				:rotate-animation="false"
				:pt="{
					root: 'left-4 max-tablet:hidden',
				}"
			>
				<template #icon>
					<HeaderMenuBtn />
				</template>
				<template #item="slotParams">
					<NuxtLink :to="slotParams.item.path">
						{{ slotParams.item.label }}
					</NuxtLink>
				</template>
			</SpeedDial>
			<HeaderLogo />
			<HeaderMenuBtn @click="openMenu" />
			<HeaderIcons :isMobile="isMobile" />
		</div>
		<HeaderMobileMenu :isOpen="isOpen" :links="links" @closeMenu="openMenu" />
		<PopupsTheCart />
		<PopupsSearch />
	</header>
</template>
