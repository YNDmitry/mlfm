<script setup lang="ts">
	const websiteStore = useWebsiteStore()
</script>

<template>
	<Sidebar
		v-model:visible="websiteStore.isVisibleCart"
		:modal="true"
		position="right"
		class="z-10 h-full w-full overflow-scroll bg-primary pb-9 pt-12 tablet:max-w-[505px]"
		data-lenis-prevent
	>
		<template #container>
			<div>
				<div class="px-10">
					<h3
						class="relative pb-[1.25rem] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-gray2 after:content-[''] max-tablet:text-[0.875rem]"
					>
						Корзина / 2 шт.
					</h3>

					<!--  Товары -->
					<div
						class="flex flex-col font-montserrat max-tablet:gap-[1.875rem] max-tablet:py-[1.875rem] tablet:gap-[1.25rem] tablet:pb-[55px] tablet:pt-[45px]"
					>
						<article
							class="flex max-mobile:gap-[0.625rem] mobile:gap-[0.938rem]"
						>
							<NuxtImg
								src="/img/delivery/1@2x.png"
								class="object-cover max-mobile:h-[6.25rem] max-mobile:w-[3.813rem] mobile:h-[6.25rem]"
							/>

							<div class="flex w-full items-center justify-between">
								<div class="flex flex-col gap-1">
									<span class="text-[0.625rem]">Подвеска</span>

									<p class="text-[0.625rem] font-medium">Undi</p>

									<span class="text-[8px] opacity-50">1 шт</span>
								</div>

								<span class="text-[0.625rem]">12,000 ₽</span>
							</div>
						</article>

						<article
							class="flex max-mobile:gap-[0.625rem] mobile:gap-[0.938rem]"
						>
							<NuxtImg
								src="/img/delivery/1@2x.png"
								class="object-cover max-mobile:h-[6.25rem] max-mobile:w-[3.813rem] mobile:h-[6.25rem]"
							/>

							<div class="flex w-full items-center justify-between">
								<div class="flex flex-col gap-1">
									<span class="text-[0.625rem]">Подвеска</span>

									<p class="text-[0.625rem] font-medium">Undi</p>

									<span class="text-[8px] opacity-50">1 шт</span>
								</div>

								<span class="text-[0.625rem]">12,000 ₽</span>
							</div>
						</article>
					</div>
					<!--  /Товары -->

					<!--  Промокод -->
					<div
						class="font-roboto relative flex items-center gap-4 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-gray2 after:content-[''] max-tablet:pb-[1.875rem] tablet:pb-[25px]"
					>
						<input
							class="w-full border-[1px] border-black px-[12px] font-light max-tablet:h-[1.875rem] max-tablet:rounded-[1.25rem] max-tablet:py-[5px] max-tablet:text-[0.625rem] tablet:h-[48px] tablet:rounded-[1.875rem] tablet:text-[0.875rem]"
							type="text"
							placeholder="Промокод"
						/>

						<button
							class="border-[1px] border-black px-[1rem] transition-colors hover:bg-black hover:text-primary max-tablet:h-[1.875rem] max-tablet:rounded-[1.25rem] max-tablet:py-[5px] max-tablet:text-[0.625rem] tablet:h-[48px] tablet:rounded-[1.875rem]"
						>
							Применить
						</button>
					</div>
					<!--  /Промокод -->

					<!--  Скидка/Итого -->
					<div
						class="relative flex flex-col gap-[0.875rem] max-tablet:pt-[1.875rem] tablet:pt-[1rem]"
					>
						<div class="flex justify-between text-[0.625rem] text-darkGray">
							<span>Скидка</span>

							<span>-360₽</span>
						</div>

						<div class="flex justify-between text-[0.625rem] font-medium">
							<span>Итого</span>

							<span>24,140₽</span>
						</div>
					</div>
					<!--  /Скидка/Итого -->

					<!--  Кнопка - Перейти к оплате -->
					<button
						class="w-full bg-red2 text-[0.625rem] text-primary transition-colors hover:bg-red2-hover max-tablet:mt-[1.875rem] max-tablet:min-h-[1.875rem] max-tablet:rounded-[1.25rem] tablet:mt-[1.25rem] tablet:min-h-[37px] tablet:rounded-[1.875rem] tablet:font-medium"
					>
						Перейти к оплате
					</button>
					<!--  /Кнопка - Перейти к оплате -->
				</div>

				<!--  Вас могут заинтересовать -->
				<div
					class="max-tablet:pl-4 max-tablet:pt-[1.875rem] tablet:pl-[42px] tablet:pt-[55px]"
				>
					<h4 class="text-[12px] max-tablet:pb-[1.875rem] tablet:pb-[18px]">
						Вас могут заинтересовать
					</h4>

					<Swiper
						:slidesPerView="3"
						:spaceBetween="24"
						class="overflow-visible"
					>
						<SwiperSlide v-for="slide in 6" :key="slide">
							<NuxtLink>
								<NuxtImg class="w-full" src="/img/basket/1@2x.png" />
							</NuxtLink>
						</SwiperSlide>
					</Swiper>
				</div>
				<!--  /Вас могут заинтересовать -->
			</div>
		</template>
	</Sidebar>
</template>
