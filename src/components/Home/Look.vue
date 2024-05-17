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
	<section class="bg-red pb-16 pt-10 max-tablet:pb-9 max-tablet:pt-9">
		<div class="mx-auto my-0 max-w-[1095px] px-3">
			<h2
				class="text-center text-h2 font-bold uppercase text-third max-tablet:text-h2Mob max-mobile:tracking-[2.5px] mobile:tracking-[5.25px]"
			>
				Купить образ
			</h2>

			<div
				class="relative grid w-full grid-cols-buyImage items-start gap-4 pt-10 max-tablet:gap-0"
			>
				<NuxtImg
					v-if="image"
					provider="directus"
					class="h-full object-cover max-tablet:max-w-[195px]"
					:src="image"
					width="678"
					format="webp"
				/>

				<div>
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
						class="relative w-full max-w-[350px] max-tablet:w-auto max-tablet:max-w-[150px]"
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
