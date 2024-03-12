<script setup>
	definePageMeta({
		layout: 'default',
	})
</script>

<template>
	<div>
		<!-- Карточка товара -->
		<section class="pt-[78px]">
			<div
				class="laptop:mx-auto laptop:my-0 laptop:max-w-[1189px] laptop:px-[1rem]"
			>
				<div
					class="max-laptop:flex max-laptop:flex-col max-tablet:gap-4 tablet:gap-7 laptop:grid laptop:grid-cols-catalogItem"
				>
					<Swiper
						class="w-[720px]"
						:slides-per-view="1"
						:effect="'creative'"
						:creative-effect="{
							prev: {
								shadow: false,
								translate: ['-20%', 0, -1],
							},
							next: {
								translate: ['100%', 0, 0],
							},
						}"
						:autoplay="{
							delay: 8000,
							disableOnInteraction: true,
						}"
						:loop="true"
					>
						<SwiperSlide v-for="slide in 3" :key="slide">
							<NuxtImg
								class="w-full"
								src="/img/catalogItem/1@2x.png"
								alt="1.png"
							/>
						</SwiperSlide>
					</Swiper>

					<div
						class="flex flex-col max-laptop:px-[1rem] max-tablet:gap-[0.75rem] tablet:gap-[2rem]"
					>
						<div
							class="gap-2 text-[0.625rem] text-primary max-tablet:flex tablet:hidden"
						>
							<span class="rounded-[17px] bg-red2 px-[0.313rem] py-[0.438rem]"
								>NEW</span
							>
						</div>

						<h3
							class="max-tablet:font-light tablet:text-[2rem] tablet:font-extralight"
						>
							SUSAN
						</h3>

						<div class="flex flex-col max-tablet:gap-[0.75rem] tablet:gap-4">
							<div
								class="flex flex-col max-tablet:gap-[0.75rem] max-tablet:text-[0.625rem] tablet:gap-4 tablet:text-[0.75rem]"
							>
								<span>Категория: Брошь</span>
								<span>Цвет: Золотой </span>
							</div>

							<div class="flex flex-col max-tablet:gap-[0.75rem] tablet:gap-2">
								<span class="max-tablet:text-[0.625rem] tablet:text-[0.75rem]"
									>Размер:</span
								>

								<!-- radio кнопки! -->
								<div class="flex max-tablet:gap-[0.75rem] tablet:gap-2">
									<label class="inline-flex cursor-pointer items-center">
										<input
											checked
											type="radio"
											name="size"
											value="6"
											class="hidden"
										/>

										<span
											class="rounded-full bg-white flex items-center justify-center border border-black text-black max-tablet:min-h-[1.25rem] max-tablet:min-w-[3.438rem] max-tablet:text-[0.625rem] tablet:min-h-[2rem] tablet:min-w-[5.938rem]"
											id="option-6"
											>6</span
										>
									</label>

									<label class="inline-flex cursor-pointer items-center">
										<input type="radio" name="size" value="7" class="hidden" />

										<span
											class="rounded-full bg-white flex items-center justify-center border border-black text-black max-tablet:min-h-[1.25rem] max-tablet:min-w-[3.438rem] max-tablet:text-[0.625rem] tablet:min-h-[2rem] tablet:min-w-[5.938rem]"
											id="option-7"
											>7</span
										>
									</label>
								</div>
								<!-- /radio кнопки! -->

								<a
									href="javascript:void(0)"
									class="text-[0.625rem] text-darkGray2 underline tablet:hidden"
									>Руководсто по размерам</a
								>
							</div>
						</div>

						<span class="max-tablet:text-[0.625rem] tablet:text-[0.875rem]"
							>Цена: ₽ 12,000</span
						>

						<!-- Кнопки "Добавить" -->
						<div
							class="flex flex-col max-tablet:my-[1.25rem] max-tablet:gap-[1rem] tablet:gap-[1.313rem]"
						>
							<button
								class="w-full rounded-main bg-red2 text-primary transition-all hover:bg-red2-hover max-tablet:min-h-[2rem] max-tablet:text-[0.625rem] tablet:min-h-[3.313rem]"
							>
								Добавить в корзину
							</button>
							<button
								class="w-full rounded-main border-[1px] border-black transition-all hover:bg-black hover:text-primary max-tablet:min-h-[2rem] max-tablet:text-[0.625rem] tablet:min-h-[3.313rem]"
							>
								Добавить в избранное
							</button>
						</div>
						<!-- /Кнопки "Добавить" -->

						<!-- Dropdown-ы -->
						<div
							class="flex flex-col max-tablet:gap-[0.75rem] tablet:gap-[1.25rem]"
						>
							<div
								data-dropdown
								class="flex flex-col items-start text-[0.625rem] max-tablet:gap-[1.25rem] tablet:gap-[0.625rem]"
							>
								<div class="flex w-full items-center justify-between">
									<button type="button">Доставка</button>

									<button data-dropdownBtn>
										<svg
											width="13"
											height="8"
											viewBox="0 0 13 8"
											fill="currentColor"
											class="transition-transform"
										>
											<path
												d="M6.09766 0.625C5.86523 0.625 5.66699 0.713867 5.48926 0.891602L0.273438 6.22363C0.123047 6.37402 0.0478516 6.55859 0.0478516 6.77734C0.0478516 7.22168 0.389648 7.57715 0.833984 7.57715C1.05273 7.57715 1.25098 7.48828 1.4082 7.33789L6.09766 2.52539L10.7871 7.33789C10.9375 7.48145 11.1357 7.57715 11.3545 7.57715C11.8057 7.57715 12.1475 7.22168 12.1475 6.77734C12.1475 6.55859 12.0723 6.37402 11.9219 6.22363L6.70605 0.891602C6.52832 0.707031 6.33008 0.625 6.09766 0.625Z"
											/>
										</svg>
									</button>
								</div>

								<div
									data-dropdownList
									class="max-h-0 overflow-hidden leading-[1rem] transition-all max-tablet:font-extralight tablet:font-light"
								>
									<p>
										SUSAN — это украшения для тех, кто любит моду. Каждый сезон
										дизайнеры бренда адаптируют подиумные и стритстайл-тренды в
										своих коллекциях.
									</p>
								</div>
							</div>

							<div
								data-dropdown
								class="flex flex-col items-start text-[0.625rem] max-tablet:gap-[1.25rem] tablet:gap-[0.625rem]"
							>
								<div class="flex w-full items-center justify-between">
									<button type="button">Доставка</button>

									<button data-dropdownBtn>
										<svg
											width="13"
											height="8"
											viewBox="0 0 13 8"
											fill="currentColor"
											class="transition-transform"
										>
											<path
												d="M6.09766 0.625C5.86523 0.625 5.66699 0.713867 5.48926 0.891602L0.273438 6.22363C0.123047 6.37402 0.0478516 6.55859 0.0478516 6.77734C0.0478516 7.22168 0.389648 7.57715 0.833984 7.57715C1.05273 7.57715 1.25098 7.48828 1.4082 7.33789L6.09766 2.52539L10.7871 7.33789C10.9375 7.48145 11.1357 7.57715 11.3545 7.57715C11.8057 7.57715 12.1475 7.22168 12.1475 6.77734C12.1475 6.55859 12.0723 6.37402 11.9219 6.22363L6.70605 0.891602C6.52832 0.707031 6.33008 0.625 6.09766 0.625Z"
											/>
										</svg>
									</button>
								</div>

								<div
									data-dropdownList
									class="max-h-0 overflow-hidden leading-[1rem] transition-all max-tablet:font-extralight tablet:font-light"
								>
									<p>
										SUSAN — это украшения для тех, кто любит моду. Каждый сезон
										дизайнеры бренда адаптируют подиумные и стритстайл-тренды в
										своих коллекциях.
									</p>
								</div>
							</div>
						</div>
						<!-- /Dropdown-ы -->
					</div>
				</div>
			</div>
		</section>
		<!-- /Карточка товара -->

		<!-- Похожие товары -->
		<section
			class="max-laptop:pb-[3.75rem] max-tablet:pt-[2rem] tablet:pt-[7.25rem] laptop:pb-[12.5rem]"
		>
			<div class="container my-0 px-3">
				<h4
					class="pb-[2rem] text-[0.875rem] max-mobile:text-[0.625rem] mobile:text-center mobile:font-bold mobile:tracking-[0.25rem]"
				>
					похожие товары
				</h4>

				<Swiper :slides-per-view="4" :space-between="30" id="related-products">
					<SwiperSlide v-for="slide in 4" :key="slide">
						<ProductCard />
					</SwiperSlide>
				</Swiper>
			</div>
		</section>
		<!-- /Похожие товары -->

		<!-- С этим товаром покупают -->
		<section class="max-laptop:pb-[3.75rem] laptop:pb-[12.5rem]">
			<div class="container">
				<h4
					class="pb-[2rem] text-[0.875rem] max-mobile:text-[0.625rem] mobile:text-center mobile:font-bold mobile:tracking-[0.25rem]"
				>
					с этим товаром покупают
				</h4>

				<Swiper
					:slides-per-view="4"
					:space-between="30"
					id="related-products-2"
				>
					<SwiperSlide v-for="slide in 4" :key="slide">
						<ProductCard />
					</SwiperSlide>
				</Swiper>
			</div>
		</section>
		<!-- /С этим товаром покупают -->
	</div>
</template>

<style scoped>
	#related-products,
	#related-products-2 {
		overflow: visible;
	}
</style>
