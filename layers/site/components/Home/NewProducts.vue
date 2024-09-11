<script lang="ts" setup>
	interface Props {
		products: [
			{
				id: string
				slug: string
				title: string
				main_image: {
					id: string
				}
				price: number
			},
		][]
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

	const props = defineProps<Props>()

	console.log(props.productBanners)
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
					v-if="products.length > 0"
					class="no-scrollbar mx-[-1rem] flex scroll-px-3 gap-[45px] overflow-x-auto px-[1rem] max-tablet:gap-4"
				>
					<template v-for="product in products" :key="product?.id">
						<ProductCard
							:id="product?.id"
							:slug="product?.slug"
							:title="product?.title"
							:imgSrc="product?.main_image?.id"
							:price="product?.product_variants[0]?.price"
							class="animation-duration-2000 max-w-[18.31rem] flex-shrink-0 transition-all max-tablet:w-[171px]"
						/>
					</template>
				</div>
			</div>

			<div
				v-if="productBanners"
				class="no-scrollbar mx-[-1rem] grid scroll-px-3 grid-cols-[1fr_1fr] gap-[8px] overflow-x-clip px-[1rem] max-tablet:gap-4"
			>
				<div
					v-for="(slide, idx) in productBanners"
					:key="idx"
					class="h-[550px] w-full flex-shrink-0 max-tablet:h-[250px]"
				>
					<ProductCardSmall
						:title="slide.title"
						:image="slide.image.id"
						:item="slide.item"
						:collection="slide.collection"
						class="transition-duration-1000 transition-ease-in-out transition-all max-tablet:h-full"
					/>
				</div>
			</div>
		</div>
	</section>
</template>
