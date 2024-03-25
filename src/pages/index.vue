<script setup>
	const appConfig = useRuntimeConfig()
	const {getItems} = useDirectusItems()
	const {getItemById} = useDirectusItems()

	definePageMeta({
		layout: 'default',
	})

	const config = useState('config')

	const {data: page} = await useAsyncData(() => {
		return getItems({
			collection: 'homepage',
			params: {
				fields: [
					'slider_collection',
					'new_products',
					'look_image',
					'look_product',
					'uniq_product_image',
					'uniq_product_image_2',
					'uniq_product_id',
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
				sort: ['-date_created'],
				limit: 4,
			},
		})
	})

	const {data: lookProductsIds} = await useAsyncData('lookProductsIds', () => {
		return getItems({
			collection: 'homepage_products_1',
			params: {
				fields: ['products_id'],
			},
		})
	})

	const {data: lookProducts} = await useAsyncData('lookProducts', () => {
		return getItems({
			collection: 'products',
			params: {
				fields: ['title', 'price', 'main_image', 'id'],
				filter: {
					id: {
						_in: lookProductsIds.value.map((item) => item.products_id),
					},
				},
			},
		})
	})

	const {data: categories} = await useLazyAsyncData('categories', () => {
		return getItems({
			collection: 'categories',
			params: {
				fields: ['title', 'title_eng', 'id'],
			},
		})
	})

	const productsCards = ref([
		{
			title: 'Кольца на любой случай',
			image: '0be9b81f-8385-4825-b3db-40fa578090b8',
			link: '/catalog',
		},
		{
			title: 'Оригинальные сумки',
			image: '566bc5b9-76ca-42a9-83f7-fd06f3134cea',
			link: '/catalog',
		},
		{
			title: 'Кольца на любой случай',
			image: '6316da09-e197-4baf-a8dc-7e74d1cf7252',
			link: '/catalog',
		},
	])

	useSeoMeta({
		title: config.value.meta_title,
		ogTitle: config.value.meta_title,
		description: config.value.meta_description,
		ogDescription: config.value.meta_description,
		ogImage:
			appConfig.public.databaseUrl + 'assets/' + config.value.meta_thumbnail,
		lang: 'ru',
	})

	// const route = useRoute()
</script>

<template>
	<div>
		<!-- Главный банер - слайдер -->
		<section
			class="relative flex h-[37.5rem] items-center justify-center max-tablet:h-[20rem] max-mobile:h-[15rem]"
		>
			<Swiper
				id="collection-swiper"
				class="swiper h-full w-full"
				:pagination="{clickable: true}"
				:modules="[SwiperAutoplay, SwiperEffectFade, SwiperPagination]"
				:speed="700"
				:autoplay="{
					delay: 3000,
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
		</section>
		<!-- /Главный банер - слайдер -->

		<!-- Ряд кнопок -->
		<section
			class="container flex max-w-[84rem] flex-wrap items-center justify-center gap-y-4 py-11 font-montserrat max-laptop:gap-x-3 max-tablet:mb-[2.5rem] max-tablet:grid max-tablet:grid-cols-[1fr_1fr] max-tablet:pb-[1.25rem] max-tablet:pt-[2rem] max-mobile:text-[0.875rem] laptop:gap-x-6"
		>
			<NuxtLink
				v-for="category in categories"
				:key="category.id"
				:to="'/catalog'"
				class="flex h-11 min-w-[10.625rem] items-center justify-center rounded-main border-[1px] border-black px-2 transition-colors hover:bg-black hover:text-primary max-laptop:mr-4 max-tablet:mr-[0.5rem] max-tablet:min-w-full"
			>
				{{ category.title }}
			</NuxtLink>
		</section>
		<!-- /Ряд кнопок -->

		<!-- Новинки -->
		<section class="pb-[70px] max-tablet:pb-[45px]">
			<div class="container mx-auto my-0">
				<div class="pb-[65px] max-tablet:pb-[74px]">
					<h2
						class="animation-duration-2000 pb-6 text-center font-bold transition-all max-tablet:text-[18px] max-mobile:text-[10px] max-mobile:tracking-[2.5px] mobile:tracking-[5.25px] tablet:text-[21px]"
					>
						новинки
					</h2>

					<div
						class="no-scrollbar mx-[-1rem] flex scroll-px-3 gap-[45px] overflow-x-auto px-[1rem] max-tablet:gap-[20px]"
					>
						<template v-for="product in products" :key="product.id">
							<ProductCard
								:id="product.id"
								:title="product.title"
								:imgSrc="product.main_image"
								:price="product.price"
								class="animation-duration-2000 max-w-[18.31rem] flex-shrink-0 transition-all"
							/>
						</template>
					</div>
				</div>

				<div
					class="no-scrollbar mx-[-1rem] flex scroll-px-3 gap-[8px] overflow-x-auto px-[1rem]"
				>
					<div
						v-for="(slide, idx) in productsCards"
						:key="idx"
						class="max-w-[26.9rem] flex-shrink-0"
					>
						<ProductCardSmall
							:title="slide.title"
							:image="slide.image"
							:link="slide.link"
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
						provider="directus"
						class="h-full w-full object-cover"
						:src="page.look_image"
						width="678"
					/>

					<Swiper
						:modules="[SwiperAutoplay, SwiperPagination]"
						:pagination="{clickable: true}"
						:slidesPerView="1"
						:spaceBetween="20"
						:speed="700"
						:autoplay="{
							delay: 3000,
							disableOnInteraction: true,
						}"
						:loop="true"
						class="relative w-full max-w-[300px] max-tablet:max-w-[600px]"
						id="look-swiper"
					>
						<SwiperSlide v-for="product in lookProducts" :key="product.id">
							<HomePatternCard
								:title="product.title"
								:price="product.price"
								:image="product.main_image"
								:link="product.id"
							/>
						</SwiperSlide>
					</Swiper>
				</div>
			</div>
		</section>
		<!-- /Купить образ -->

		<!-- фирменный магазин -->
		<section class="max-mobile:py-[58px] mobile:py-[77px]">
			<div class="mx-auto my-0 max-w-[1095px] px-4">
				<div
					class="flex items-center justify-between max-tablet:flex-col max-mobile:gap-[8px] mobile:gap-5"
				>
					<div
						class="max-tablet:max-w-none max-mobile:mb-4 max-mobile:max-w-none tablet:max-w-[370px]"
					>
						<h2
							class="font-bold uppercase text-red2 max-tablet:text-[18px] max-mobile:text-[10px] max-mobile:tracking-[2.5px] mobile:tracking-[5.25px] tablet:text-[21px]"
						>
							фирменный магазин
						</h2>

						<p
							class="font-montserrat max-mobile:pt-[12px] max-mobile:text-[8px] max-mobile:leading-[14px] mobile:pt-[27px] mobile:text-[11px] mobile:leading-[20px]"
						>
							MLFM - это эксклюзивный магазин, основанный в 2014 году, который
							специализируется на продаже уникальных винтажных украшений и
							одежды. Мы предлагаем нашим клиентам только самые изысканные и
							стильные аксессуары, которые подчеркнут вашу индивидуальность и
							сделают ваш образ неповторимым.
						</p>

						<div
							class="flex flex-col gap-[15px] font-montserrat text-[14px] leading-[20px] max-mobile:hidden max-mobile:pt-[12px] mobile:pt-[27px]"
						>
							<span>{{ config.current_address }}</span>

							<b>{{ config.current_phone_number }}</b>
						</div>
					</div>

					<div class="max-tablet:mt-3 max-tablet:w-full">
						<NuxtImg
							provider="directus"
							src="744ac27e-c809-4bcf-8062-fadfda74377b"
							width="623"
							height="461"
							class="max-tablet:w-full"
						/>
					</div>
				</div>
			</div>
		</section>
		<!-- /фирменный магазин -->

		<!-- Подарочные карты -->
		<HomeGiftCards />
		<!-- /Подарочные карты -->

		<!-- Выбор стилиста -->
		<section class="pb-[55px] pt-[31px]">
			<div class="mx-auto my-0 max-w-[955px] px-4">
				<div class="flex justify-between gap-3">
					<div
						class="flex flex-col items-center gap-[35px] max-mobile:gap-[15px] max-mobile:px-[35px]"
					>
						<div class="relative">
							<NuxtImg
								provider="directus"
								:src="page.uniq_product_image"
								width="368"
								height="442"
							/>
						</div>

						<NuxtLink
							:to="'/catalog/' + page.uniq_product_id"
							class="flex max-w-[10.625rem] items-center justify-center rounded-main bg-red2 font-montserrat text-[0.75rem] font-bold uppercase text-primary transition-colors hover:bg-red2-hover max-mobile:h-[1.125rem] max-mobile:w-[3.75rem] max-mobile:text-[0.5rem] max-mobile:font-light max-mobile:tracking-[0.5px] mobile:h-11 mobile:w-full mobile:tracking-[3px]"
						>
							Купить
						</NuxtLink>
					</div>

					<div>
						<NuxtImg
							provider="directus"
							:src="page.uniq_product_image_2"
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

<style>
	#collection-swiper .swiper-wrapper {
		@apply h-full;
	}

	#collection-swiper .swiper-pagination-bullet {
		background: #838383 !important;
		opacity: 0.85 !important;
		transition: all 200ms ease;
	}

	#look-swiper .swiper-pagination {
		position: static;
		margin-top: 2rem;
	}

	#look-swiper .swiper-pagination-bullet {
		transition: all 200ms ease;
	}

	#look-swiper .swiper-pagination-bullet.swiper-pagination-bullet-active {
		background: #f3eacc;
	}

	#collection-swiper .swiper-pagination-bullet.swiper-pagination-bullet-active {
		width: 2rem !important;
		opacity: 1 !important;
		background: #ffffff !important;
		border-radius: 10px;
	}
</style>
