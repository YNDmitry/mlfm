<script setup lang="ts">
	const {getItems} = useDirectusItems()
	const {getThumbnail: img} = useDirectusFiles()

	definePageMeta({
		layout: 'default',
	})

	const {data: siteSettings} = await useAsyncData('siteSettings', () => {
		return getItems({
			collection: 'site',
		})
	})

	const websiteStore = useWebsiteStore()

	websiteStore.siteSettings = siteSettings

	useSeoMeta({
		title: websiteStore?.siteSettings?.meta_title,
		description: websiteStore?.siteSettings?.meta_description,
		ogImage: img(websiteStore?.siteSettings?.meta_thumbnail),
	})
</script>

<template>
	<div>
		<section class="relative flex h-[37.5rem] items-center justify-center">
			<Swiper
				id="collection-swiper"
				class="swiper h-full w-full"
				:speed="700"
				:autoplay="{
					delay: 5000,
					disableOnInteraction: true,
				}"
				:loop="true"
				:effect="'fade'"
			>
				<SwiperSlide class="h-full">
					<div class="relative w-full">
						<NuxtImg
							src="/img/mainSlider/1.png"
							class="h-full w-full object-cover max-tablet:aspect-[320/138]"
							width="1440"
							height="600"
							loading="lazy"
							decoding="auto"
							placeholder
						/>
					</div>
				</SwiperSlide>

				<SwiperSlide class="h-full">
					<div class="relative">
						<NuxtImg
							src="/img/mainSlider/1.png"
							class="w-full max-tablet:aspect-[320/138]"
							width="1440"
							height="600"
							loading="lazy"
							decoding="auto"
						/>
					</div>
				</SwiperSlide>

				<SwiperSlide class="h-full">
					<div class="relative">
						<NuxtImg
							src="/img/mainSlider/1.png"
							class="w-full max-tablet:aspect-[320/138]"
							width="1440"
							height="600"
							loading="lazy"
							decoding="auto"
						/>
					</div>
				</SwiperSlide>
			</Swiper>
			<div
				class="absolute z-10 flex translate-y-[-50%] flex-col items-center justify-center gap-[1.5rem] text-primary max-tablet:right-[0.75rem] max-tablet:top-[40%] tablet:left-2/4 tablet:top-2/4 tablet:translate-x-[-50%]"
			>
				<h3
					class="tablet:text-2xl uppercase max-tablet:max-w-[7.563rem] max-tablet:text-right max-tablet:text-[0.625rem] max-tablet:font-light max-tablet:leading-[0.75rem] max-tablet:tracking-[2.5px] tablet:max-w-[15.625rem] tablet:text-center tablet:font-bold tablet:tracking-[0.375rem]"
				>
					новая коллекция
				</h3>

				<NuxtLink
					to="/catalog"
					class="flex h-11 w-full max-w-[10.625rem] items-center justify-center rounded-main bg-red2 font-montserrat text-[0.75rem] font-bold uppercase tracking-[3px] transition-colors hover:bg-red2-hover max-tablet:hidden"
				>
					Купить
				</NuxtLink>
			</div>

			<div
				class="swiper-btn swiper-button-next h-[19.5px] text-primary max-tablet:top-[62%] max-mobile:top-[73%]"
			>
				<IconsSliderArrow />
			</div>
			<div
				class="swiper-btn swiper-button-prev h-[19.5px] text-primary max-tablet:top-[62%] max-mobile:top-[73%]"
			>
				<IconsSliderArrow />
			</div>

			<div
				class="swiper-pagination swiper-mainBanner-pagination max-tablet:hidden"
			></div>
		</section>
		<!-- /Главный банер - слайдер -->

		<!-- Ряд кнопок -->
		<section
			class="container flex max-w-[84rem] flex-wrap items-center justify-center gap-y-2 py-11 font-montserrat max-laptop:gap-x-3 max-laptop:text-[0.875rem] max-laptop:tracking-[0.15px] max-tablet:mb-[2.5rem] max-tablet:pb-[1.25rem] max-tablet:pt-[2rem] max-tablet:text-[0.5rem] laptop:gap-x-6 laptop:tracking-[2px]"
		>
			<button
				class="h-11 w-full rounded-main border-[1px] border-black transition-colors hover:bg-black hover:text-primary max-laptop:mr-4 max-laptop:max-w-[7.5rem] max-tablet:mr-[0.5rem] max-tablet:h-5 max-tablet:max-w-[4.25rem] laptop:max-w-[10.625rem]"
			>
				кольца
			</button>
			<button
				class="h-11 w-full rounded-main border-[1px] border-black transition-colors hover:bg-black hover:text-primary max-laptop:mr-4 max-laptop:max-w-[7.5rem] max-tablet:mr-[0.5rem] max-tablet:h-5 max-tablet:max-w-[4.25rem] laptop:max-w-[10.625rem]"
			>
				серьги
			</button>
			<button
				class="h-11 w-full rounded-main border-[1px] border-black transition-colors hover:bg-black hover:text-primary max-laptop:mr-4 max-laptop:max-w-[7.5rem] max-tablet:mr-[0.5rem] max-tablet:h-5 max-tablet:max-w-[4.25rem] laptop:max-w-[10.625rem]"
			>
				подвески
			</button>
			<button
				class="h-11 w-full rounded-main border-[1px] border-black transition-colors hover:bg-black hover:text-primary max-laptop:mr-4 max-laptop:max-w-[7.5rem] max-tablet:mr-[0.5rem] max-tablet:h-5 max-tablet:max-w-[4.25rem] laptop:max-w-[10.625rem]"
			>
				броши
			</button>
			<button
				class="h-11 w-full rounded-main border-[1px] border-black transition-colors hover:bg-black hover:text-primary max-laptop:mr-4 max-laptop:max-w-[7.5rem] max-tablet:mr-[0.5rem] max-tablet:h-5 max-tablet:max-w-[4.25rem] laptop:max-w-[10.625rem]"
			>
				сумки
			</button>
			<button
				class="h-11 w-full rounded-main border-[1px] border-black transition-colors hover:bg-black hover:text-primary max-laptop:mr-4 max-laptop:max-w-[7.5rem] max-tablet:mr-[0.5rem] max-tablet:h-5 max-tablet:max-w-[4.25rem] laptop:max-w-[10.625rem]"
			>
				сертификаты
			</button>
		</section>
		<!-- /Ряд кнопок -->

		<!-- Новинки -->
		<section class="pb-[70px] max-tablet:pb-[45px]">
			<div class="container mx-auto my-0 px-3">
				<div class="pb-[65px] max-tablet:pb-[74px]">
					<h4
						v-animateonscroll="{
							enterClass: 'fadein',
						}"
						class="animation-duration-2000 pb-6 text-center text-[0.875rem] font-bold tracking-[0.25rem] transition-all"
					>
						новинки
					</h4>

					<Swiper :slidesPerView="4" :spaceBetween="45" class="swiper-newItems">
						<SwiperSlide v-for="slide in 8" :key="slide">
							<ProductCard
								v-animateonscroll="{
									enterClass: 'fadein',
								}"
								class="animation-duration-2000 transition-all"
							/>
						</SwiperSlide>
					</Swiper>
				</div>

				<Swiper
					:slidesPerView="3"
					:spaceBetween="8"
					class="swiper-newItemsBottom"
				>
					<SwiperSlide v-for="slide in 3" :key="slide">
						<ProductCardSmall
							v-animateonscroll="{
								enterClass: 'fadein',
							}"
							class="transition-duration-1000 transition-ease-in-out transition-all"
						/>
					</SwiperSlide>
				</Swiper>
			</div>
		</section>
		<!-- /Новинки -->

		<!-- Купить образ -->
		<section class="bg-red max-mobile:pb-[40px] mobile:pb-[65px]">
			<div
				class="mx-auto my-0 max-w-[1095px] px-3 max-tablet:pl-[20px] max-tablet:pr-8"
			>
				<h4
					class="text-center text-third max-mobile:pb-[10px] max-mobile:pt-2 max-mobile:text-[10px] mobile:py-[41px]"
				>
					купить образ
				</h4>

				<div
					class="grid-cols-2 relative grid gap-4 max-tablet:gap-[20px] max-mobile:grid-cols-buyImageMobile mobile:grid-cols-buyImage"
				>
					<NuxtPicture
						class="h-full w-full object-cover max-mobile:max-h-[165px]"
						src="/img/buyImage/1.png"
						width="678"
						height="579"
					/>

					<Swiper
						:slidesPerView="1"
						:spaceBetween="20"
						class="relative max-w-[300px]"
					>
						<SwiperSlide v-for="slide in 3" :key="slide">
							<HomePatternCard />
						</SwiperSlide>
					</Swiper>
				</div>

				<div
					class="grid-cols-2 relative grid gap-4 max-tablet:gap-[20px] max-mobile:grid-cols-buyImageMobile mobile:grid-cols-buyImage"
				>
					<div class="swiper-pagination swiper-buyImage-pagination"></div>
				</div>
			</div>
		</section>
		<!-- /Купить образ -->

		<!-- фирменный магазин -->
		<section class="max-mobile:py-[58px] mobile:py-[77px]">
			<div class="mx-auto my-0 max-w-[1095px] px-4">
				<div
					class="flex items-center justify-between max-mobile:gap-[8px] mobile:gap-5"
				>
					<div
						class="max-tablet:max-w-[200px] max-mobile:max-w-[125px] tablet:max-w-[270px]"
					>
						<h3
							class="font-bold uppercase text-red2 max-tablet:text-[18px] max-mobile:text-[10px] max-mobile:tracking-[2.5px] mobile:tracking-[5.25px] tablet:text-[21px]"
						>
							фирменный магазин
						</h3>

						<p
							class="font-montserrat max-mobile:pt-[12px] max-mobile:text-[8px] max-mobile:leading-[14px] mobile:pt-[27px] mobile:text-[11px] mobile:leading-[20px]"
						>
							Многие думают, что Lorem Ipsum - взятый с потолка псевдо-латинский
							набор слов, но это не совсем так. Его корни уходят в один фрагмент
							классической латыни 45 года н.э., то есть более двух тысячелетий
							назад. Ричард МакКлинток, профессор латыни из колледжа
							Hampden-Sydney.
						</p>

						<div
							class="flex flex-col gap-[15px] font-montserrat text-[14px] leading-[20px] max-mobile:hidden max-mobile:pt-[12px] mobile:pt-[27px]"
						>
							<span>Малая Бронная 24с3</span>

							<b>+7(499)755-74-27</b>
						</div>
					</div>

					<div>
						<NuxtPicture
							src="/img/brandStore/1@2x.png"
							width="623"
							height="461"
						/>
					</div>
				</div>
			</div>
		</section>
		<!-- /фирменный магазин -->

		<!-- Подарочные карты -->
		<section class="relative w-full bg-third">
			<div
				class="container max-w-[1127px] max-tablet:py-[20px] tablet:py-[50px]"
			>
				<div
					class="items-center justify-items-center gap-5 max-laptop:flex laptop:grid laptop:grid-cols-giftCart"
				>
					<div>
						<NuxtImg class="h-full w-full" src="/gift.png" loading="lazy" />
					</div>

					<div class="max-w-[245px] text-red2">
						<h3
							class="font-bold uppercase max-laptop:text-[1rem] max-laptop:tracking-[0.25rem] max-tablet:mb-[0.625rem] max-mobile:text-[0.5rem] max-mobile:tracking-[2px] tablet:mb-[1.313rem] laptop:text-[1.313rem] laptop:tracking-[5.25px]"
						>
							Подарочные карты
						</h3>

						<p
							class="font-montserrat max-laptop:text-[0.875rem] max-tablet:mb-[0.625rem] max-mobile:text-[0.5rem] tablet:mb-[2.5rem]"
						>
							Идеальный подарок на любой праздник!
						</p>

						<button
							class="max-w-[10.625rem] rounded-main border-red2 font-montserrat uppercase transition-colors hover:bg-red2-hover hover:text-primary max-tablet:h-[1rem] max-tablet:w-[4.5rem] max-tablet:border-[0.5px] max-tablet:text-[0.5rem] max-tablet:font-light tablet:h-11 tablet:w-full tablet:border-[1px] tablet:text-[0.75rem] tablet:font-bold tablet:tracking-[3px]"
						>
							подарить
						</button>
					</div>
				</div>
			</div>
		</section>
		<!-- /Подарочные карты -->

		<!-- Выбор стилиста -->
		<section class="pb-[55px] pt-[31px]">
			<div class="mx-auto my-0 max-w-[955px] px-4">
				<div class="flex justify-between gap-3">
					<div
						class="flex flex-col items-center gap-[35px] max-mobile:gap-[15px] max-mobile:px-[35px]"
					>
						<div class="relative">
							<NuxtPicture
								src="/img/choiceStylist/2@2x.png"
								width="368"
								height="442"
							/>

							<span
								class="absolute left-1/2 top-1/2 block translate-x-[-50%] translate-y-[-50%] text-center font-extrabold uppercase text-red max-tablet:max-w-[50px] max-tablet:text-[10px] max-tablet:leading-[16px] max-mobile:max-w-[34px] max-mobile:text-[5px] max-mobile:leading-[10px] tablet:max-w-[95px] tablet:leading-[26px]"
								>choice of stylist</span
							>
						</div>

						<button
							class="max-w-[10.625rem] rounded-main bg-red2 font-montserrat text-[0.75rem] font-bold uppercase text-primary transition-colors hover:bg-red2-hover max-mobile:h-[1.125rem] max-mobile:w-[3.75rem] max-mobile:text-[0.5rem] max-mobile:font-light max-mobile:tracking-[0.5px] mobile:h-11 mobile:w-full mobile:tracking-[3px]"
						>
							Купить
						</button>
					</div>

					<div>
						<NuxtPicture
							src="/img/choiceStylist/1@2x.png"
							width="486"
							height="602"
						/>
					</div>
				</div>
			</div>
		</section>
		<!-- /Выбор стилиста -->
	</div>
</template>

<style scoped>
	#collection-swiper .swiper-wrapper {
		@apply h-full;
	}
</style>
