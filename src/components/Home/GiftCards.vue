<template>
	<section class="relative w-full bg-third">
		<div class="container max-w-[1127px] max-tablet:py-[20px] tablet:py-[50px]">
			<div
				class="items-center justify-items-center gap-5 max-laptop:flex max-mobile:flex-col laptop:grid laptop:grid-cols-giftCart"
			>
				<div>
					<NuxtImg
						class="h-full w-full"
						provider="directus"
						src="c4304427-57a3-49cf-b14a-86ea7182e0c3"
						loading="lazy"
					/>
				</div>

				<div
					class="max-w-[245px] text-red2 max-tablet:mr-auto max-tablet:max-w-none"
				>
					<h2
						class="text-h2 max-tablet:text-h2Mob font-bold uppercase max-laptop:text-[1rem] max-laptop:tracking-[0.25rem] max-tablet:mb-[0.625rem] max-mobile:tracking-[2px] tablet:mb-[1.313rem] laptop:tracking-[5.25px]"
					>
						Подарочные карты
					</h2>

					<p
						class="font-montserrat text-[0.8rem] max-tablet:mb-[0.625rem] tablet:mb-[2.5rem]"
					>
						Идеальный подарок на любой праздник!
					</p>

					<NuxtLink
						to="/gift-card"
						class="flex max-w-[10.625rem] items-center justify-center rounded-main border border-red2 py-2 font-montserrat text-[1rem] uppercase transition-colors hover:bg-red2-hover hover:text-primary max-tablet:h-[1.5rem] max-tablet:w-[7.5rem] max-tablet:border-[0.5px] max-tablet:text-[0.8rem] max-tablet:font-light"
					>
						подарить
					</NuxtLink>
				</div>
			</div>
		</div>
	</section>
</template>
