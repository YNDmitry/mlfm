<template>
	<div
		class="hidden items-start gap-5 max-tablet:mt-5 max-tablet:flex max-tablet:flex-col"
	>
		<NuxtLink
			to="/wishlist"
			@click="$emit('iconClick', 'wishlist'), $emit('closeMenu')"
		>
			<IconsHearth class="inline-block h-5 w-5 text-primary max-tablet:mr-2" />
			<span class="tablet:hidden">Избранное</span>
		</NuxtLink>
		<NuxtLink
			to="/profile"
			class="hidden max-tablet:block"
			@click="$emit('iconClick', 'profile'), $emit('closeMenu')"
		>
			<IconsProfile class="inline-block h-5 w-5 max-tablet:mr-2" />
			<span class="tablet:hidden">Профиль</span>
		</NuxtLink>
	</div>
</template>
