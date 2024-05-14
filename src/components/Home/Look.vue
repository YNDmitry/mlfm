<script lang="ts" setup>
	interface Props {
		image: string
		products: [
			{
				products_id: {
					id: string
					title: string
					price: number
					main_image: {
						id: string
					}
				}
			},
		]
	}

	defineProps<Props>()
</script>

<template>
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
					v-if="image"
					provider="directus"
					class="h-full w-full object-cover"
					:src="image"
					width="678"
					format="webp"
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
						v-for="product in products"
						:key="product.products_id.id"
					>
						<HomePatternCard
							:title="product.products_id.title"
							:price="product.products_id.price"
							:image="product.products_id.main_image.id"
							:link="product.products_id.id"
						/>
					</SwiperSlide>
				</Swiper>
			</div>
		</div>
	</section>
</template>

<style>
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
</style>
