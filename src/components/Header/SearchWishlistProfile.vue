<template>
	<div class="flex items-start gap-5 max-tablet:mt-5 max-tablet:flex-col">
		<NuxtLink
			to="/wishlist"
			class="hidden max-tablet:block"
			@click="$emit('iconClick', 'wishlist'), $emit('closeMenu')"
		>
			<IconsHearth class="inline-block h-5 w-5 text-primary max-tablet:mr-2" />
			<span class="tablet:hidden">Избранное</span>
		</NuxtLink>
		<button
			@click="$emit('iconClick', 'search'), $emit('closeMenu')"
			type="button"
		>
			<IconsSearch class="inline-block h-[18px] w-[18px] max-tablet:mr-2" />
			<span class="tablet:hidden">Поиск</span>
		</button>
		<button @click="$emit('iconClick', 'cart'), $emit('closeMenu')">
			<IconsCart class="inline-block h-5 w-5 max-tablet:mr-2" />
			<span class="tablet:hidden">Корзина</span>
		</button>
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
