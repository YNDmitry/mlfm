<script lang="ts" setup>
	defineProps({
		uniq_image: {
			type: String,
		},
		uniq_product_id: {
			type: String,
		},
		uniq_product_slug: {
			type: String,
		},
		uniq_product_image_2: {
			type: String,
		},
	})
</script>

<template>
	<section class="pb-[55px] pt-[31px]">
		<div class="mx-auto my-0 max-w-[955px] px-4">
			<div class="flex justify-between gap-3">
				<div
					class="flex flex-col items-center gap-[35px] max-mobile:gap-[15px] max-mobile:px-[35px]"
				>
					<div class="relative" v-if="uniq_image">
						<NuxtImg
							provider="directus"
							:src="uniq_image"
							width="368"
							height="442"
							format="webp"
							placeholder
						/>
					</div>

					<NuxtLink
						:to="'/catalog/' + uniq_product_slug"
						class="flex w-full max-w-[10.625rem] items-center justify-center rounded-main bg-red2 py-2 font-montserrat text-[0.75rem] font-bold uppercase text-primary transition-colors hover:bg-red2-hover"
					>
						Купить
					</NuxtLink>
				</div>

				<div v-if="uniq_product_image_2">
					<NuxtImg
						provider="directus"
						:src="uniq_product_image_2"
						width="486"
						height="602"
						format="webp"
					/>
				</div>
			</div>
		</div>
	</section>
</template>
