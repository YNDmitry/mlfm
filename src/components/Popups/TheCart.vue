<script setup lang="ts">
	const websiteStore = useWebsiteStore()
	const useCart = useCartStore()

	const config = useRuntimeConfig()
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
							:key="item?.id"
							class="flex max-mobile:gap-[0.625rem] mobile:gap-[0.938rem]"
						>
							<NuxtImg
								:src="config.public.databaseUrl + 'assets/' + item?.image_id"
								width="130"
								class="object-cover max-mobile:h-[6.25rem] max-mobile:w-[3.813rem] mobile:h-[6.25rem]"
							/>

							<div class="relative flex w-full items-center justify-between">
								<button
									@click="useCart.removeItem(item.id)"
									type="button"
									:aria-label="'Удалить товар ' + item?.title"
									class="absolute right-0 top-0"
								>
									<IconsClose class="w-2" />
								</button>
								<div class="flex flex-col gap-1">
									<span class="text-[0.625rem]">{{ item.category }}</span>

									<p class="text-[0.625rem] font-medium">{{ item.title }}</p>

									<div class="flex gap-2">
										<span class="text-[8px] opacity-50">
											{{ item.quantity }} шт
										</span>

										<span class="text-[8px] opacity-50" v-if="item.color_id">
											{{ item.color_id }} цвет
										</span>

										<span class="text-[8px] opacity-50" v-if="item.color_id">
											{{ item.size_id }} размер
										</span>
									</div>
								</div>

								<span class="text-[0.625rem]">{{
									Intl.NumberFormat('ru-RU', {
										style: 'currency',
										currency: 'RUB',
									}).format(item.price)
								}}</span>
							</div>
						</article>

						<button
							v-if="useCart.items.length > 0"
							@click="useCart.removeCart()"
							class="flex items-center gap-3 text-[1rem]"
						>
							Очистить корзину <IconsClose class="w-[10px]" />
						</button>
					</div>
					<!--  /Товары -->

					<!--  Промокод -->
					<form
						@submit.prevent="useCart.getDiscount(useCart.discount)"
						class="relative flex items-center gap-4 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-gray2 after:content-[''] max-tablet:pb-[1.875rem] tablet:pb-[25px]"
					>
						<input
							class="w-full border-[1px] border-black px-[12px] font-light max-tablet:h-[1.875rem] max-tablet:rounded-[1.25rem] max-tablet:py-[5px] max-tablet:text-[0.625rem] tablet:h-[48px] tablet:rounded-[1.875rem] tablet:text-[0.875rem]"
							type="text"
							placeholder="Промокод"
							v-model="useCart.discount"
						/>

						<button
							type="submit"
							class="border-[1px] border-black px-[1rem] transition-colors hover:bg-black hover:text-primary max-tablet:h-[1.875rem] max-tablet:rounded-[1.25rem] max-tablet:py-[5px] max-tablet:text-[0.625rem] tablet:h-[48px] tablet:rounded-[1.875rem]"
						>
							Применить
						</button>
					</form>
					<!--  /Промокод -->

					<!--  Скидка/Итого -->
					<div
						class="relative flex flex-col gap-[0.875rem] max-tablet:pt-[1.875rem] tablet:pt-[1rem]"
					>
						<div
							v-if="useCart.discount"
							class="flex justify-between text-[0.625rem] text-darkGray"
						>
							<span>Скидка</span>

							<span>-360₽</span>
						</div>

						<div class="flex justify-between text-[0.625rem] font-medium">
							<span>Итого</span>

							<span>{{ useCart.totalPrice }}</span>
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

					<div
						class="grid grid-cols-[1fr_1fr_1fr] gap-[10px]"
						v-if="useCart.isRelatedProductPending"
					>
						<div
							class="relative flex w-full flex-col justify-center"
							v-for="(item, idx) in 3"
							:key="idx"
						>
							<Skeleton height="8rem" />
							<Skeleton class="my-3 w-full" />
							<Skeleton width="4rem" class="w-3" />
						</div>
					</div>

					<Swiper
						v-else
						:slidesPerView="3"
						:spaceBetween="10"
						class="overflow-visible"
					>
						<SwiperSlide v-for="product in useCart.relatedItems" :key="product">
							<NuxtLink
								:to="'/catalog/' + product.id"
								@click="websiteStore.isVisibleCart = false"
							>
								<div class="relative flex w-full flex-col justify-center">
									<NuxtImg
										provider="directus"
										class="h-32 object-cover"
										:src="product.main_image.id"
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
