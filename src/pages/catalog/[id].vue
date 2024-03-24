<script setup>
	const appConfig = useRuntimeConfig()
	const {getItems, getItemById} = useDirectusItems()

	definePageMeta({
		layout: 'default',
	})

	const {id} = useRoute().params

	const {data: product, error} = await useAsyncData(() => {
		return getItemById({
			collection: 'products',
			id: id,
		})
	})

	if (!product.value) {
		throw createError({
			statusCode: 404,
			statusMessage: 'Продукт не найден',
		})
	}

	useSeoMeta({
		title: product.value.title + ' | MLFM',
		ogTitle: product.value.title + ' | MLFM',
		description: product.value.description,
		ogDescription: product.value.description,
		ogImage:
			appConfig.public.databaseUrl + 'assets/' + product.value.main_image,
		twitterImage:
			appConfig.public.databaseUrl + 'assets/' + product.value.main_image,
		lang: 'ru',
	})

	const {data: randomProducts} = await useLazyAsyncData(
		'randomProducts',
		() => {
			return getItems({
				collection: 'products',
				params: {
					fields: ['title', 'price', 'main_image', 'id'],
					filter: {
						id: {
							_neq: id,
						},
					},
					limit: 4,
				},
			})
		},
	)
</script>

<template>
	<div>
		<!-- Карточка товара -->
		<section class="pt-[78px] max-laptop:pt-0">
			<div
				class="laptop:mx-auto laptop:my-0 laptop:max-w-[1189px] laptop:px-[1rem]"
			>
				<div
					class="max-laptop:flex max-laptop:flex-col max-tablet:gap-4 tablet:gap-7 laptop:grid laptop:grid-cols-catalogItem"
				>
					<Swiper
						class="!sticky top-40 h-[650px] w-[720px] max-laptop:!static max-laptop:w-full"
						:slides-per-view="1"
						:autoplay="{
							delay: 8000,
							disableOnInteraction: true,
						}"
						:loop="true"
					>
						<SwiperSlide v-for="slide in 3" :key="slide">
							<Image preview class="h-full w-full text-primary">
								<template #image>
									<NuxtImg
										provider="directus"
										class="h-full w-full object-cover"
										:src="product.main_image"
									/>
								</template>
								<template #preview="slotProps">
									<NuxtImg
										provider="directus"
										class="h-full w-full object-cover"
										width="720"
										:src="product.main_image"
										:style="slotProps.style"
										@click="slotProps.onClick"
									/>
								</template>
							</Image>
						</SwiperSlide>
					</Swiper>

					<div
						class="flex flex-col max-laptop:px-[1rem] max-tablet:gap-[0.75rem] tablet:gap-[2rem]"
					>
						<div
							class="gap-2 text-[0.625rem] text-primary max-tablet:flex tablet:hidden"
						>
							<span class="rounded-[17px] bg-red2 px-[0.313rem] py-[0.438rem]"
								>NEW</span
							>
						</div>

						<h3
							class="max-tablet:font-light tablet:text-[2rem] tablet:font-extralight"
						>
							{{ product.title }}
						</h3>

						<div class="flex flex-col max-tablet:gap-[0.75rem] tablet:gap-4">
							<div
								class="flex flex-col max-tablet:gap-[0.75rem] max-tablet:text-[0.625rem] tablet:gap-4 tablet:text-[0.75rem]"
							>
								<span>Категория: Брошь</span>
								<span>Цвет: Золотой </span>
							</div>

							<div class="flex flex-col max-tablet:gap-[0.75rem] tablet:gap-2">
								<span class="max-tablet:text-[0.625rem] tablet:text-[0.75rem]"
									>Размер:</span
								>

								<!-- radio кнопки! -->
								<div class="flex max-tablet:gap-[0.75rem] tablet:gap-2">
									<label class="inline-flex cursor-pointer items-center">
										<input
											checked
											type="radio"
											name="size"
											value="6"
											class="hidden"
										/>

										<span
											class="rounded-full bg-white flex items-center justify-center border border-black text-black max-tablet:min-h-[1.25rem] max-tablet:min-w-[3.438rem] max-tablet:text-[0.625rem] tablet:min-h-[2rem] tablet:min-w-[5.938rem]"
											id="option-6"
											>6</span
										>
									</label>

									<label class="inline-flex cursor-pointer items-center">
										<input type="radio" name="size" value="7" class="hidden" />

										<span
											class="rounded-full bg-white flex items-center justify-center border border-black text-black max-tablet:min-h-[1.25rem] max-tablet:min-w-[3.438rem] max-tablet:text-[0.625rem] tablet:min-h-[2rem] tablet:min-w-[5.938rem]"
											id="option-7"
											>7</span
										>
									</label>
								</div>
								<!-- /radio кнопки! -->

								<a
									href="javascript:void(0)"
									class="text-[0.625rem] text-darkGray2 underline tablet:hidden"
									>Руководсто по размерам</a
								>
							</div>
						</div>

						<span class="max-tablet:text-[0.625rem] tablet:text-[0.875rem]"
							>Цена: ₽ {{ product.price }}</span
						>

						<!-- Кнопки "Добавить" -->
						<div
							class="flex flex-col max-tablet:my-[1.25rem] max-tablet:gap-[1rem] tablet:gap-[1.313rem]"
						>
							<button
								class="w-full rounded-main bg-red2 text-primary transition-all hover:bg-red2-hover max-tablet:min-h-[2rem] max-tablet:text-[0.625rem] tablet:min-h-[3.313rem]"
							>
								Добавить в корзину
							</button>
							<button
								class="w-full rounded-main border-[1px] border-black transition-all hover:bg-black hover:text-primary max-tablet:min-h-[2rem] max-tablet:text-[0.625rem] tablet:min-h-[3.313rem]"
							>
								Добавить в избранное
							</button>
						</div>
						<!-- /Кнопки "Добавить" -->

						<!-- Dropdown-ы -->
						<div
							class="flex flex-col max-tablet:gap-[0.75rem] tablet:gap-[1.25rem]"
						>
							<Accordion :multiple="true" v-if="product.description">
								<AccordionTab class="p-0">
									<template #header class="p-0">
										<div class="font-normal">О продукте</div>
									</template>
									<p>{{ product.description }}</p>
								</AccordionTab>
								<AccordionTab class="p-0">
									<template #header>
										<div class="font-normal">Доставка</div>
									</template>
									<p>
										Lorem ipsum dolor sit amet consectetur, adipisicing elit.
										Fuga illo ex architecto distinctio esse dolorum, quis totam
										deserunt! Harum saepe alias veniam ex iusto accusamus sunt
										commodi officia sit blanditiis?
									</p>
								</AccordionTab>
							</Accordion>
						</div>
						<!-- /Dropdown-ы -->
					</div>
				</div>
			</div>
		</section>
		<!-- /Карточка товара -->

		<!-- Похожие товары -->
		<section
			class="max-laptop:pb-[3.75rem] max-tablet:pt-[2rem] tablet:pt-[7.25rem] laptop:pb-[12.5rem]"
		>
			<div class="container my-0 px-3">
				<h4
					class="pb-[2rem] text-[0.875rem] max-mobile:text-[0.625rem] mobile:text-center mobile:font-bold mobile:tracking-[0.25rem]"
				>
					похожие товары
				</h4>

				<Swiper :slides-per-view="4" :space-between="30" id="related-products">
					<SwiperSlide v-for="product in randomProducts" :key="product.id">
						<ProductCard
							:id="product.id"
							:title="product.title"
							:imgSrc="product.main_image"
							:price="product.price"
							class="animation-duration-2000 max-w-[18.5rem] flex-shrink-0 transition-all"
						/>
					</SwiperSlide>
				</Swiper>
			</div>
		</section>
		<!-- /Похожие товары -->

		<!-- С этим товаром покупают -->
		<!-- <section class="max-laptop:pb-[3.75rem] laptop:pb-[12.5rem]">
			<div class="container">
				<h4
					class="pb-[2rem] text-[0.875rem] max-mobile:text-[0.625rem] mobile:text-center mobile:font-bold mobile:tracking-[0.25rem]"
				>
					с этим товаром покупают
				</h4>

				<Swiper
					:slides-per-view="4"
					:space-between="30"
					id="related-products-2"
				>
					<SwiperSlide v-for="slide in 4" :key="slide">
						<ProductCard />
					</SwiperSlide>
				</Swiper>
			</div>
		</section> -->
		<!-- /С этим товаром покупают -->
	</div>
</template>

<style>
	#related-products,
	#related-products-2 {
		overflow: visible;
	}

	.p-accordion .p-accordion-header .p-accordion-header-link {
		@apply pl-0 pr-0;
	}
</style>
