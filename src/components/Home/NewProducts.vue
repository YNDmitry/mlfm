<script lang="ts" setup>
	interface Props {
		products: [
			{
				id: string
				title: string
				main_image: {
					id: string
				}
				price: number
			},
		]
		productBanners?: [
			{
				title: string
				image: {
					id: string
				}
				collection: {title: string; id: string}
				category: {title: string; id: string}
			},
		]
	}

	defineProps<Props>()

	const isMobile = useMediaQuery('(max-width: 479px)')
</script>

<template>
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
					<template v-for="product in products" :key="product.id">
						<ProductCard
							:id="product.id"
							:title="product.title"
							:imgSrc="product.main_image.id"
							:price="product.price"
							class="animation-duration-2000 max-w-[18.31rem] flex-shrink-0 transition-all max-tablet:w-[171px]"
						/>
					</template>
				</div>
			</div>

			<div
				v-if="productBanners"
				class="no-scrollbar mx-[-1rem] flex scroll-px-3 gap-[8px] overflow-x-auto px-[1rem] max-tablet:grid max-tablet:grid-cols-[1fr_1fr] max-tablet:gap-4 max-tablet:overflow-x-clip"
			>
				<div
					v-for="(slide, idx) in isMobile
						? productBanners.slice(0, 2)
						: productBanners"
					:key="idx"
					class="h-[550px] max-w-[26.9rem] flex-shrink-0 max-tablet:h-[250px] max-tablet:w-full max-tablet:max-w-none"
				>
					<ProductCardSmall
						:title="slide.title"
						:image="slide.image.id"
						:collection="slide.collection"
						:category="slide.category"
						class="transition-duration-1000 transition-ease-in-out transition-all max-tablet:h-full"
						:class="idx % 2 != 0 ? 'col-span-3' : ''"
					/>
				</div>
			</div>
		</div>
	</section>
</template>
