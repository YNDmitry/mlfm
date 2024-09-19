<script lang="ts" setup>
	interface Props {
		product_upsells: [
			{
				id: string
				slug: string
				title: string
				main_image: {
					id: string
				}
				product_variants: [
					{
						price: number
					},
				]
			},
		]
	}
	defineProps<Props>()
</script>

<template>
	<section
		class="max-laptop:pb-[3.75rem] max-tablet:pt-[2rem] tablet:pt-[7.25rem] laptop:pb-[12.5rem]"
	>
		<div class="container my-0 px-3">
			<h2
				class="pb-[2rem] text-center text-h2 font-bold uppercase tracking-[0.25rem] max-tablet:text-h2Mob"
			>
				Похожие товары
			</h2>
			<div
				class="no-scrollbar mx-[-1rem] flex scroll-px-3 gap-[45px] overflow-x-auto px-[1rem] max-tablet:gap-[20px]"
			>
				<template v-for="item in product_upsells" :key="item">
					<ProductCard
						:id="item?.id"
						:slug="item?.slug"
						:title="item?.title"
						:imgSrc="item?.main_image?.id"
						:price="item?.product_variants[0].price"
						class="animation-duration-2000 max-w-[18.31rem] flex-shrink-0 transition-all max-tablet:w-[150px]"
					/>
				</template>
			</div>
		</div>
	</section>
</template>
