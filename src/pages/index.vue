<script setup>
	const {getThumbnail: img} = useDirectusFiles()
	const {getItems} = useDirectusItems()
	const {getItemById} = useDirectusItems()

	definePageMeta({
		layout: 'default',
	})

	const config = useState('config')

	useSeoMeta({
		title: config.meta_title,
		description: config.meta_description,
		ogImage: img(config.meta_thumbnail),
	})

	const {data: page} = await useAsyncData(() => {
		return getItems({
			collection: 'homepage',
			params: {
				fields: [
					'slider_collection',
					'new_products',
					'look_image',
					'look_product',
				],
			},
		})
	})

	const {data: mainSlider} = await useAsyncData(() => {
		return getItemById({
			collection: 'collection',
			id: page.value.slider_collection,
		})
	})

	const {data: mainSliderImages} = await useAsyncData(() => {
		return getItems({
			collection: 'collection_files_1',
		})
	})

	const {data: products} = await useAsyncData('newProducts', () => {
		return getItems({
			collection: 'products',
			params: {
				fields: ['title', 'price', 'main_image', 'id'],
				limit: 4,
			},
		})
	})

	const {data: categories} = await useLazyAsyncData('categories', () => {
		return getItems({
			collection: 'categories',
			params: {
				fields: ['title', 'id'],
			},
		})
	})
</script>

<template>
	<div>
		<section
			class="relative flex h-[37.5rem] items-center justify-center max-tablet:h-[20rem] max-mobile:h-[15rem]"
		>
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
				<SwiperSlide
					class="h-full"
					v-for="slide in mainSliderImages"
					:key="slide.id"
				>
					<div class="relative h-full w-full">
						<NuxtImg
							provider="directus"
							:src="slide.directus_files_id"
							class="h-full w-full object-cover"
							width="1440"
							height="600"
						/>
					</div>
				</SwiperSlide>
			</Swiper>
			<div
				class="absolute z-10 flex translate-y-[-50%] flex-col items-center justify-center gap-[1.5rem] text-primary max-tablet:right-[0.75rem] max-tablet:top-[40%] tablet:left-2/4 tablet:top-2/4 tablet:translate-x-[-50%]"
			>
				<h1
					v-if="mainSlider"
					class="tablet:text-2xl uppercase max-tablet:max-w-[7.563rem] max-tablet:text-right max-tablet:text-[0.625rem] max-tablet:font-light max-tablet:leading-[0.75rem] max-tablet:tracking-[2.5px] tablet:max-w-[15.625rem] tablet:text-center tablet:font-bold tablet:tracking-[0.375rem]"
				>
					Новая коллекция <br /><br />{{ mainSlider.title }}
				</h1>

				<NuxtLink
					to="/catalog"
					class="flex h-11 w-full max-w-[10.625rem] items-center justify-center rounded-main bg-red2 font-montserrat text-[0.75rem] font-bold uppercase tracking-[3px] transition-colors hover:bg-red2-hover max-tablet:hidden"
				>
					Купить
				</NuxtLink>
			</div>

			<div
				class="swiper-pagination swiper-mainBanner-pagination max-tablet:hidden"
			></div>
		</section>
		<!-- /Главный банер - слайдер -->

		<!-- Ряд кнопок -->
		<section
			class="container flex max-w-[84rem] flex-wrap items-center justify-center gap-y-4 py-11 font-montserrat max-laptop:gap-x-3 max-tablet:mb-[2.5rem] max-tablet:pb-[1.25rem] max-tablet:pt-[2rem] max-mobile:text-[0.875rem] laptop:gap-x-6"
		>
			<button
				v-for="category in categories"
				:key="category.id"
				class="h-11 min-w-[10.625rem] rounded-main border-[1px] border-black px-2 transition-colors hover:bg-black hover:text-primary max-laptop:mr-4 max-tablet:mr-[0.5rem]"
			>
				{{ category.title }}
			</button>
		</section>
		<!-- /Ряд кнопок -->

		<!-- Новинки -->
		<section class="pb-[70px] max-tablet:pb-[45px]">
			<div class="container mx-auto my-0">
				<div class="pb-[65px] max-tablet:pb-[74px]">
					<h2
						v-animateonscroll="{
							enterClass: 'fadein',
						}"
						class="animation-duration-2000 pb-6 text-center font-bold transition-all max-tablet:text-[18px] max-mobile:text-[10px] max-mobile:tracking-[2.5px] mobile:tracking-[5.25px] tablet:text-[21px]"
					>
						новинки
					</h2>

					<div
						class="no-scrollbar flex scroll-px-3 gap-[45px] overflow-x-auto"
						v-animateonscroll="{
							enterClass: 'fadein',
						}"
					>
						<template v-for="product in products" :key="product.id">
							<ProductCard
								:id="product.id"
								:title="product.title"
								:imgSrc="product.main_image"
								:price="product.price"
								class="animation-duration-2000 max-w-[18.5rem] flex-shrink-0 transition-all"
							/>
						</template>
					</div>
				</div>

				<div class="no-scrollbar flex scroll-px-3 gap-[8px] overflow-x-auto">
					<div
						v-for="slide in 3"
						:key="slide"
						class="max-w-[27rem] flex-shrink-0"
						v-animateonscroll="{
							enterClass: 'fadein',
						}"
					>
						<ProductCardSmall
							class="transition-duration-1000 transition-ease-in-out transition-all"
						/>
					</div>
				</div>
			</div>
		</section>
		<!-- /Новинки -->

		<!-- Купить образ -->
		<section class="bg-red pb-16 pt-10">
			<div class="mx-auto my-0 max-w-[1095px] px-3">
				<h2
					class="text-center font-bold uppercase text-third max-tablet:text-[18px] max-mobile:text-[10px] max-mobile:tracking-[2.5px] mobile:tracking-[5.25px] tablet:text-[21px]"
				>
					купить образ
				</h2>

				<div
					class="relative grid grid-cols-buyImage gap-4 pt-10 max-tablet:flex max-tablet:flex-col max-tablet:gap-[20px]"
				>
					<NuxtImg
						class="h-full w-full object-cover"
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
					class="flex items-center justify-between max-mobile:flex-col max-mobile:gap-[8px] mobile:gap-5"
				>
					<div
						class="max-tablet:max-w-[200px] max-mobile:mb-4 max-mobile:max-w-[125px] max-mobile:max-w-none tablet:max-w-[270px]"
					>
						<h2
							class="font-bold uppercase text-red2 max-tablet:text-[18px] max-mobile:text-[10px] max-mobile:tracking-[2.5px] mobile:tracking-[5.25px] tablet:text-[21px]"
						>
							фирменный магазин
						</h2>

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
							<span>{{ config.current_address }}</span>

							<b>{{ config.current_phone_number }}</b>
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

						<NuxtLink
							to="/"
							class="flex max-w-[10.625rem] items-center justify-center rounded-main bg-red2 font-montserrat text-[0.75rem] font-bold uppercase text-primary transition-colors hover:bg-red2-hover max-mobile:h-[1.125rem] max-mobile:w-[3.75rem] max-mobile:text-[0.5rem] max-mobile:font-light max-mobile:tracking-[0.5px] mobile:h-11 mobile:w-full mobile:tracking-[3px]"
						>
							Купить
						</NuxtLink>
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
