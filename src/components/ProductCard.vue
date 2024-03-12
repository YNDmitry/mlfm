<template>
	<NuxtLink to="/product">
		<div class="relative">
			<NuxtImg
				class="w-full max-tablet:aspect-[136/165]"
				src="/img/newItems/1@2x.png"
				width="300"
				height="410"
			/>

			<IconsHearth class="absolute right-3 top-3 h-5 w-5 hover:fill-primary" />
		</div>

		<div
			class="flex flex-col gap-[0.5rem] pt-5 text-[14px] font-medium max-tablet:pt-[4px] max-tablet:text-[10px]"
		>
			<p>Жакет Red</p>

			<span>32,000 ₽</span>
		</div>
	</NuxtLink>
</template>
