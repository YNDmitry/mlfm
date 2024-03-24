<template>
	<section class="relative w-full bg-third">
		<div class="container max-w-[1127px] max-tablet:py-[20px] tablet:py-[50px]">
			<div
				class="items-center justify-items-center gap-5 max-laptop:flex laptop:grid laptop:grid-cols-giftCart"
			>
				<div>
					<NuxtImg
						class="h-full w-full"
						provider="directus"
						src="c4304427-57a3-49cf-b14a-86ea7182e0c3"
						loading="lazy"
					/>
				</div>

				<div class="max-w-[245px] text-red2">
					<h2
						class="font-bold uppercase max-laptop:text-[1rem] max-laptop:tracking-[0.25rem] max-tablet:mb-[0.625rem] max-mobile:text-[0.5rem] max-mobile:tracking-[2px] tablet:mb-[1.313rem] laptop:text-[1.313rem] laptop:tracking-[5.25px]"
					>
						Подарочные карты
					</h2>

					<p
						class="font-montserrat max-laptop:text-[0.875rem] max-tablet:mb-[0.625rem] max-mobile:text-[0.5rem] tablet:mb-[2.5rem]"
					>
						Идеальный подарок на любой праздник!
					</p>

					<NuxtLink
						to="/gift-cards"
						class="flex max-w-[10.625rem] items-center justify-center rounded-main border-red2 font-montserrat uppercase transition-colors hover:bg-red2-hover hover:text-primary max-tablet:h-[1rem] max-tablet:w-[4.5rem] max-tablet:border-[0.5px] max-tablet:text-[0.5rem] max-tablet:font-light tablet:h-11 tablet:w-full tablet:border-[1px] tablet:text-[0.75rem] tablet:font-bold tablet:tracking-[3px]"
					>
						подарить
					</NuxtLink>
				</div>
			</div>
		</div>
	</section>
</template>
