<script setup lang="ts">
	const {getItems} = useDirectusItems()
	const websiteStore = useWebsiteStore()
	const useCart = useCartStore()

	const {data: products} = await useLazyAsyncData('cartRelatedProducts', () => {
		return getItems({
			collection: 'products',
			params: {
				fields: ['title', 'price', 'main_image', 'id'],
				limit: 3,
			},
		})
	})

	// useCart.initCart()
</script>

<template>
	<Sidebar
		v-model:visible="websiteStore.isVisibleCart"
		@show="useCart.initCart()"
		:modal="true"
		position="right"
		class="z-10 h-full w-full overflow-scroll bg-primary pb-9 pt-12 tablet:max-w-[505px]"
		data-lenis-prevent
	>
		<template #container>
			<div>
				<div
					class="flex w-full items-center justify-between border-b-[1px] border-b-gray2 px-10 pb-[1.25rem]"
				>
					<div class="max-tablet:text-[0.875rem]">Корзина</div>
					<button type="button" @click="websiteStore.isVisibleCart = false">
						<IconsClose class="h-3 w-3" />
					</button>
				</div>
				<div class="px-10" v-if="useCart.items.length > 0">
					<!--  Товары -->
					<div
						class="flex flex-col font-montserrat max-tablet:gap-[1.875rem] max-tablet:py-[1.875rem] tablet:gap-[1.25rem] tablet:pb-[55px] tablet:pt-[45px]"
					>
						<article
							v-for="item in useCart.items"
							:key="item.id"
							class="flex max-mobile:gap-[0.625rem] mobile:gap-[0.938rem]"
						>
							<NuxtImg
								:src="'https://admin.mlfm.store/assets/' + item.main_image"
								width="130"
								class="object-cover max-mobile:h-[6.25rem] max-mobile:w-[3.813rem] mobile:h-[6.25rem]"
							/>

							<div class="flex w-full items-center justify-between">
								<div class="flex flex-col gap-1">
									<span class="text-[0.625rem]">{{ item.category }}</span>

									<p class="text-[0.625rem] font-medium">{{ item.title }}</p>

									<span class="text-[8px] opacity-50"
										>{{ item.quantity }} шт</span
									>
								</div>

								<span class="text-[0.625rem]">{{ item.price }} ₽</span>
							</div>
						</article>
					</div>
					<!--  /Товары -->

					<!--  Промокод -->
					<div
						class="font-roboto relative flex items-center gap-4 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-gray2 after:content-[''] max-tablet:pb-[1.875rem] tablet:pb-[25px]"
					>
						<input
							class="w-full border-[1px] border-black px-[12px] font-light max-tablet:h-[1.875rem] max-tablet:rounded-[1.25rem] max-tablet:py-[5px] max-tablet:text-[0.625rem] tablet:h-[48px] tablet:rounded-[1.875rem] tablet:text-[0.875rem]"
							type="text"
							placeholder="Промокод"
						/>

						<button
							class="border-[1px] border-black px-[1rem] transition-colors hover:bg-black hover:text-primary max-tablet:h-[1.875rem] max-tablet:rounded-[1.25rem] max-tablet:py-[5px] max-tablet:text-[0.625rem] tablet:h-[48px] tablet:rounded-[1.875rem]"
						>
							Применить
						</button>
					</div>
					<!--  /Промокод -->

					<!--  Скидка/Итого -->
					<div
						class="relative flex flex-col gap-[0.875rem] max-tablet:pt-[1.875rem] tablet:pt-[1rem]"
					>
						<div class="flex justify-between text-[0.625rem] text-darkGray">
							<span>Скидка</span>

							<span>-360₽</span>
						</div>

						<div class="flex justify-between text-[0.625rem] font-medium">
							<span>Итого</span>

							<span>{{ useCart.totalPrice }} ₽</span>
						</div>
					</div>
					<!--  /Скидка/Итого -->

					<!--  Кнопка - Перейти к оплате -->
					<NuxtLink
						to="/checkout"
						class="flex w-full items-center justify-center bg-red2 text-[0.625rem] text-primary transition-colors hover:bg-red2-hover max-tablet:mt-[1.875rem] max-tablet:min-h-[1.875rem] max-tablet:rounded-[1.25rem] tablet:mt-[1.25rem] tablet:min-h-[37px] tablet:rounded-[1.875rem] tablet:font-medium"
					>
						Перейти к оплате
					</NuxtLink>
					<!--  /Кнопка - Перейти к оплате -->
				</div>

				<div class="mt-10 px-10" v-else>Корзина пустая</div>

				<!--  Вас могут заинтересовать -->
				<div
					class="pr-5 max-tablet:pl-4 max-tablet:pt-[1.875rem] tablet:pl-[42px] tablet:pt-[55px]"
				>
					<h4 class="max-tablet:pb-[1.875rem] tablet:pb-[18px]">
						Вас могут заинтересовать
					</h4>

					<Swiper
						:slidesPerView="3"
						:spaceBetween="10"
						class="overflow-visible"
					>
						<SwiperSlide v-for="product in products" :key="product.id">
							<NuxtLink
								:to="'/catalog/' + product.id"
								@click="websiteStore.isVisibleCart = false"
							>
								<div class="relative flex w-full flex-col justify-center">
									<NuxtImg
										provider="directus"
										class="h-32 object-cover"
										:src="product.main_image"
										width="200"
									/>
									<div class="inset-0 mt-2 overflow-hidden whitespace-nowrap">
										<div class="overflow-hidden overflow-ellipsis font-medium">
											{{ product.title }}
										</div>
										<div class="overflow-ellipsis text-[10px]">
											₽ {{ product.price }}
										</div>
									</div>
								</div>
							</NuxtLink>
						</SwiperSlide>
					</Swiper>
				</div>
				<!--  /Вас могут заинтересовать -->
			</div>
		</template>
	</Sidebar>
</template>
