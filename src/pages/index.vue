<script setup lang="ts">
	const appConfig = useRuntimeConfig()
	definePageMeta({
		layout: 'default',
	})

	const config = useNuxtData('config').data

	const {data} = await useAsyncGql(
		'Homepage',
		{},
		{
			getCachedData(key, nuxtApp) {
				return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
			},
		},
	)

	const {data: categories} = await useAsyncGql(
		'Categories',
		{},
		{
			getCachedData(key, nuxtApp) {
				return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
			},
		},
	)

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

	const isMobile = useMediaQuery('(max-width:768px)')

	if (isMobile.value) {
		productsCards.value.splice(0, 1)
	}

	useSeoMeta({
		title: config?.value?.meta_title,
		ogTitle: config?.value?.meta_title,
		description: config?.value?.meta_description,
		ogDescription: config?.value?.meta_description,
		ogImage:
			appConfig.public.databaseUrl + 'assets/' + config?.value?.meta_thumbnail,
	})
</script>

<template>
	<div>
		<!-- Главный банер - слайдер -->
		<section
			class="relative flex h-[37.5rem] items-center justify-center max-tablet:h-[20rem] max-mobile:h-[15rem]"
		>
			<div
				class="relative h-full w-full"
				v-if="data.homepage?.slider_collection?.image?.id"
			>
				<NuxtImg
					provider="directus"
					:src="data.homepage?.slider_collection?.image?.id"
					class="h-full w-full object-cover"
					width="1440"
					height="600"
				/>
			</div>
			<div
				class="absolute z-10 flex translate-y-[-50%] flex-col items-center justify-center gap-[1.5rem] text-primary max-tablet:right-[0.75rem] max-tablet:top-[40%] tablet:left-2/4 tablet:top-2/4 tablet:translate-x-[-50%]"
			>
				<h1
					v-if="data.homepage?.slider_collection?.title"
					class="text-center text-h1 uppercase tracking-[0.375rem] max-tablet:text-right max-tablet:text-h1Mob max-tablet:font-light max-tablet:tracking-[2.5px]"
				>
					{{ data.homepage?.slider_collection?.title }}
				</h1>

				<NuxtLink
					:to="'/catalog?collection=' + data.homepage?.slider_collection?.title"
					class="flex h-11 w-full max-w-[10.625rem] items-center justify-center rounded-main bg-red2 font-montserrat text-[0.75rem] font-bold uppercase tracking-[3px] transition-colors hover:bg-red2-hover max-tablet:hidden"
				>
					Купить
				</NuxtLink>
			</div>
		</section>
		<!-- /Главный банер - слайдер -->

		<!-- Ряд кнопок -->
		<section
			class="container flex max-w-[84rem] flex-wrap items-center justify-center gap-4 gap-y-4 py-11 font-montserrat max-laptop:gap-x-3 max-tablet:mb-[2.5rem] max-tablet:pb-[1.25rem] max-tablet:pt-[2rem] max-mobile:grid max-mobile:grid-cols-[1fr_1fr] max-mobile:text-[0.875rem]"
		>
			<NuxtLink
				v-for="category in categories.categories"
				:key="category.id"
				:to="'/catalog?category=' + category.title"
				class="flex h-11 items-center justify-center rounded-main border-[1px] border-black px-6 text-center transition-colors hover:bg-black hover:text-primary"
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
						class="animation-duration-2000 pb-6 text-center text-h2 font-bold uppercase transition-all max-tablet:text-h2Mob max-mobile:tracking-[2.5px] mobile:tracking-[5.25px]"
					>
						Новинки
					</h2>

					<div
						class="no-scrollbar mx-[-1rem] flex scroll-px-3 gap-[45px] overflow-x-auto px-[1rem] max-tablet:gap-4"
					>
						<template v-for="product in data.products" :key="product.id">
							<ProductCard
								:id="product.id"
								:title="product.title"
								:imgSrc="product.main_image?.id"
								:price="product.price"
								class="animation-duration-2000 max-w-[18.31rem] flex-shrink-0 transition-all max-tablet:w-[150px]"
							/>
						</template>
					</div>
				</div>

				<div
					class="no-scrollbar mx-[-1rem] flex scroll-px-3 gap-[8px] overflow-x-auto px-[1rem] max-tablet:grid max-tablet:grid-cols-[1fr_1fr] max-tablet:gap-4 max-tablet:overflow-x-clip"
				>
					<div
						v-for="(slide, idx) in productsCards"
						:key="idx"
						class="h-[550px] max-w-[26.9rem] flex-shrink-0 max-tablet:h-[250px] max-tablet:w-full max-tablet:max-w-none"
					>
						<ProductCardSmall
							:title="slide.title"
							:image="slide.image"
							:link="slide.link"
							class="transition-duration-1000 transition-ease-in-out transition-all max-tablet:h-full"
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
					class="text-center text-h2 font-bold uppercase text-third max-tablet:text-h2Mob max-mobile:tracking-[2.5px] mobile:tracking-[5.25px]"
				>
					Купить образ
				</h2>

				<div
					class="relative grid grid-cols-buyImage items-start gap-4 pt-10 max-tablet:gap-[20px]"
				>
					<NuxtImg
						v-if="data.homepage?.look_image?.id"
						provider="directus"
						class="h-full w-full object-cover"
						:src="data.homepage?.look_image?.id"
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
						class="relative w-full max-w-[300px] max-tablet:max-w-[150px]"
						id="look-swiper"
					>
						<SwiperSlide
							v-for="product in data.homepage?.look_product"
							:key="product?.products_id?.id"
						>
							<HomePatternCard
								:title="product?.products_id?.title"
								:price="product?.products_id?.price"
								:image="product?.products_id?.main_image?.id"
								:link="product?.products_id?.id"
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
							class="text-h2 font-bold uppercase text-red2 max-tablet:text-h2Mob max-mobile:tracking-[2.5px] mobile:tracking-[5.25px]"
						>
							Фирменный магазин
						</h2>

						<p
							class="font-montserrat text-[0.8rem] max-mobile:pt-[12px] mobile:pt-[27px]"
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
							<span>{{ config?.current_address }}</span>

							<b>{{ config?.current_phone_number }}</b>
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
						<div class="relative" v-if="data.homepage?.uniq_product_image?.id">
							<NuxtImg
								provider="directus"
								:src="data.homepage?.uniq_product_image?.id"
								width="368"
								height="442"
							/>
						</div>

						<NuxtLink
							:to="'/catalog/' + data.homepage?.uniq_product_id?.id"
							class="flex w-full max-w-[10.625rem] items-center justify-center rounded-main bg-red2 py-2 font-montserrat text-[0.75rem] font-bold uppercase text-primary transition-colors hover:bg-red2-hover"
						>
							Купить
						</NuxtLink>
					</div>

					<div v-if="data.homepage?.uniq_product_image_2?.id">
						<NuxtImg
							provider="directus"
							:src="data.homepage?.uniq_product_image_2?.id"
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
