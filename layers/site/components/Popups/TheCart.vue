<script setup lang="ts">
	import {useWebsiteStore} from '~~/core/src/stores'
	import {useCartStore} from '~~/core/src/stores/cart'

	const websiteStore = useWebsiteStore()
	const useCart = useCartStore()

	const config = useRuntimeConfig()

	const handleSubmit = async () => {
		const id = await useCart.createCheckoutSession()
		return await navigateTo(`/checkout/${id}`)
	}
</script>

<template>
	<Drawer
		v-model:visible="websiteStore.isVisibleCart"
		@show.once="useCart.initCart()"
		:modal="true"
		position="right"
		class="z-10 h-full w-full overflow-scroll bg-primary pb-9 pt-12 max-tablet:pt-5 tablet:max-w-[505px]"
		data-lenis-prevent
	>
		<template #container>
			<div>
				<div
					class="flex w-full items-center justify-between border-b-[1px] border-b-gray2 px-10 pb-[1.25rem] max-tablet:px-4"
				>
					<div class="max-tablet:text-[0.875rem]">Корзина</div>
					<button
						type="button"
						aria-label="Закрыть корзину"
						@click="websiteStore.isVisibleCart = false"
					>
						<IconsClose class="h-3 w-3" />
					</button>
				</div>
				<div class="px-10 max-tablet:px-4" v-if="useCart.items.length > 0">
					<!--  Товары -->
					<div
						class="flex flex-col font-montserrat max-tablet:gap-[1.875rem] max-tablet:py-[1.875rem] tablet:gap-[1.25rem] tablet:pb-[55px] tablet:pt-[45px]"
						v-auto-animate
					>
						<div
							v-for="(item, idx) in useCart.itemsDetails"
							:key="item?.id"
							:class="item.type === 'gift-card' ? '-order-1' : ''"
						>
							<article
								v-if="item.type === 'product'"
								class="flex max-mobile:gap-[0.625rem] mobile:gap-[0.938rem]"
							>
								<NuxtImg
									:src="
										config.public.databaseUrl +
										'assets/' +
										item?.product_variants[0]?.image?.id
									"
									width="130"
									placeholder
									class="object-cover max-mobile:h-[6.25rem] max-mobile:w-[3.813rem] mobile:h-[6.25rem]"
								/>

								<div class="relative flex w-full items-center justify-between">
									<button
										@click="useCart.removeItem(item.id)"
										type="button"
										:aria-label="'Удалить товар ' + item?.title"
										class="absolute -right-5 -top-5 p-5"
									>
										<IconsClose class="w-2" />
									</button>
									<div class="flex flex-col gap-1">
										<span class="text-[0.625rem]">{{ item.category }}</span>

										<p class="text-[0.625rem] font-medium">{{ item.title }}</p>

										<div class="flex gap-2">
											<span class="text-[8px] opacity-50">
												{{ useCart.items[idx]?.quantity }} шт
											</span>

											<span
												class="text-[8px] opacity-50"
												v-if="item.product_variants[0].color_id"
											>
												{{ item.product_variants[0].color_id.title }} цвет
											</span>

											<span
												class="text-[8px] opacity-50"
												v-if="item.product_variants[0].size_id"
											>
												{{ item.product_variants[0].size_id.small_title }}
												размер
											</span>
										</div>
									</div>

									<span class="text-[0.625rem]">{{
										usePrice(item?.product_variants[0]?.price)
									}}</span>
								</div>
							</article>
							<article
								v-if="item.type === 'gift-card'"
								class="flex flex-1 border-b-[1px] border-b-gray2 pb-5 max-mobile:gap-[0.625rem] mobile:gap-[0.938rem]"
							>
								<NuxtImg
									:src="config.public.databaseUrl + 'assets/' + item?.image_id"
									width="130"
									class="object-cover max-mobile:h-[6.25rem] max-mobile:w-[3.813rem] mobile:h-[6.25rem]"
									placeholder
								/>

								<div class="relative flex w-full items-center justify-between">
									<button
										@click="useCart.removeItem(item.id)"
										type="button"
										:aria-label="'Удалить товар ' + item?.title"
										class="absolute -right-5 -top-5 p-5"
									>
										<IconsClose class="w-2" />
									</button>
									<div class="flex flex-col gap-1">
										<span class="text-[0.625rem]">{{ item.title }}</span>

										<p class="text-[0.625rem] font-medium">
											{{ item.category }}
										</p>
									</div>

									<span class="text-[0.625rem]">{{
										Intl.NumberFormat('ru-RU', {
											style: 'currency',
											currency: 'RUB',
										}).format(item.price)
									}}</span>
								</div>
							</article>
						</div>

						<button
							v-if="useCart.items.length > 0"
							@click="useCart.removeCart()"
							aria-label="Очистить корзину"
							class="flex items-center gap-3 text-[1rem]"
						>
							Очистить корзину <IconsClose class="w-[10px]" />
						</button>
					</div>
					<!--  /Товары -->

					<!--  Промокод -->
					<Tabs
						value="0"
						id="cart-tabs"
						:pt="{
							panelcontainer: 'p-0',
							nav: 'mb-4',
						}"
					>
						<TabList
							:pt="{activeBar: 'hidden', tabList: 'grid grid-cols-[1fr_1fr]'}"
							v-if="
								useCart.discountPercent === null ||
								useCart.giftCodeInitialAmount === 0
							"
						>
							<Tab
								value="0"
								class="w-full rounded-main py-2 text-center text-[0.625rem] font-normal hover:bg-red2 hover:text-primary"
								>Промокод</Tab
							>
							<Tab
								value="1"
								class="w-full rounded-main py-2 text-center text-[0.625rem] font-normal hover:bg-red2 hover:text-primary"
								>Подарочная карта</Tab
							>
						</TabList>
						<TabPanels :pt="{root: 'px-0'}">
							<TabPanel value="0">
								<form
									@submit.prevent="useCart.setDiscount()"
									class="relative border-b-[1px] border-b-gray2 max-tablet:pb-[1.875rem] tablet:pb-[25px]"
								>
									<div
										class="flex items-center gap-2"
										v-if="useCart.discountPercent === null"
									>
										<input
											class="h-[35px] w-full rounded-[1.875rem] border-[1px] border-black px-[12px] text-[0.7rem] font-light outline-none transition-all focus:border-red2-hover max-tablet:h-[1.875rem] max-tablet:rounded-[1.25rem] max-tablet:py-[5px] max-tablet:text-[0.625rem]"
											type="text"
											placeholder="Промокод"
											v-model.uppercase.trim="useCart.discount"
										/>

										<button
											aria-label="Применить промокод"
											type="submit"
											class="h-[35px] rounded-[1.875rem] border-[1px] border-black px-[1rem] text-[0.7rem] transition-colors hover:bg-black hover:text-primary max-tablet:h-[1.875rem] max-tablet:rounded-[1.25rem] max-tablet:py-[5px] max-tablet:text-[0.625rem]"
										>
											Применить
										</button>
									</div>
									<p v-else>Успешно! Скидка добавлена.</p>
									<p
										v-if="useCart.discountErrors.statusMessage"
										class="mt-4 text-red"
									>
										{{ useCart.discountErrors.statusMessage }}
									</p>
								</form>
							</TabPanel>
							<TabPanel value="1">
								<form
									@submit.prevent="useCart.setGiftCard()"
									class="relative border-b-[1px] border-b-gray2 max-tablet:pb-[1.875rem] tablet:pb-[25px]"
								>
									<div
										class="flex items-center gap-2"
										v-if="useCart.giftCodeCurrentBalance === null"
									>
										<input
											class="h-[35px] w-full rounded-[1.875rem] border-[1px] border-black px-[12px] text-[0.7rem] font-light outline-none transition-all focus:border-red2-hover max-tablet:h-[1.875rem] max-tablet:rounded-[1.25rem] max-tablet:py-[5px] max-tablet:text-[0.625rem]"
											type="text"
											placeholder="Код подарочной карты"
											v-model.uppercase.trim="useCart.giftCode"
										/>

										<button
											aria-label="Применить код порадочной карты"
											type="submit"
											:spaceBetween="10"
											class="h-[35px] rounded-[1.875rem] border-[1px] border-black px-[1rem] text-[0.7rem] transition-colors hover:bg-black hover:text-primary max-tablet:h-[1.875rem] max-tablet:rounded-[1.25rem] max-tablet:py-[5px] max-tablet:text-[0.625rem]"
										>
											Применить
										</button>
									</div>
									<p v-else>Успешно! Подарочная карта применена.</p>
									<p
										v-if="useCart.giftCodeErrors.statusMessage"
										class="mt-4 text-red"
									>
										{{ useCart.giftCodeErrors.statusMessage }}
									</p>
								</form>
							</TabPanel>
						</TabPanels>
					</Tabs>
					<!--  /Промокод -->

					<!--  Скидка/Итого -->
					<div
						class="relative flex flex-col gap-[0.875rem] max-tablet:pt-[1.875rem] tablet:pt-[1rem]"
					>
						<div
							v-if="useCart.discountPercent !== null"
							class="flex justify-between text-[0.625rem] text-darkGray"
						>
							<span>Скидка</span>

							<span>{{
								Intl.NumberFormat('ru-RU', {
									style: 'currency',
									currency: 'RUB',
								}).format(useCart.discountAmount)
							}}</span>
						</div>

						<div
							v-if="useCart.giftCodeCurrentBalance !== null"
							class="flex justify-between text-[0.625rem] text-darkGray"
						>
							<span>Подарочная карта</span>

							<span>{{
								Intl.NumberFormat('ru-RU', {
									style: 'currency',
									currency: 'RUB',
								}).format(useCart.giftCodeCurrentBalance)
							}}</span>
						</div>

						<!-- Добавление отображения остатка баланса подарочной карты -->
						<div v-if="useCart.giftCodeCurrentBalance !== null">
							<div class="flex justify-between text-[0.625rem] text-darkGray">
								<span>Остаток на подарочной карте</span>
								<span>{{
									Intl.NumberFormat('ru-RU', {
										style: 'currency',
										currency: 'RUB',
									}).format(useCart.remainingGiftCardBalance)
								}}</span>
							</div>
						</div>
						<!-- /Добавление отображения остатка баланса подарочной карты -->

						<div class="flex justify-between text-[0.625rem] font-medium">
							<span
								>Итого
								{{
									useCart.discountPercent !== null ? '(С учётом скидки)' : ''
								}}
								{{
									useCart.giftCodeInitialAmount !== null
										? '(С учётом подарочной карты)'
										: ''
								}}
							</span>

							<span>{{ usePrice(useCart.totalPriceWithDiscount) }}</span>
						</div>
					</div>
					<!--  /Скидка/Итого -->

					<!--  Кнопка - Перейти к оплате -->
					<button
						aria-label="Перейти к оплате"
						type="button"
						@click="handleSubmit"
						:disabled="useCart.isSubmitting"
						class="relative flex w-full items-center justify-center bg-red2 text-[0.625rem] text-primary transition-colors hover:bg-red2-hover disabled:pointer-events-none disabled:opacity-50 max-tablet:mt-[1.875rem] max-tablet:min-h-[1.875rem] max-tablet:rounded-[1.25rem] tablet:mt-[1.25rem] tablet:min-h-[37px] tablet:rounded-[1.875rem] tablet:font-medium"
					>
						<ProgressSpinner
							aria-label="Загрузка..."
							style="width: 20px; height: 20px"
							:pt="{
								root: 'mx-0 absolute left-[2rem]',
								circle: '!stroke-[#ffffff]',
							}"
							v-if="useCart.isSubmitting"
						/>
						Перейти к оплате
					</button>
					<!--  /Кнопка - Перейти к оплате -->
				</div>

				<div class="mt-10 px-10 max-tablet:px-4" v-else>Корзина пустая</div>

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

					<div
						v-else
						class="grid w-full grid-cols-[1fr_1fr_1fr] gap-[10px] overflow-hidden"
					>
						<div v-for="product in useCart.relatedItems" :key="product?.id">
							<NuxtLink
								:to="'/catalog/' + product.slug"
								@click="websiteStore.isVisibleCart = false"
							>
								<div class="relative w-full flex-col justify-center">
									<NuxtImg
										provider="directus"
										class="h-32 object-cover"
										:src="product.main_image.id"
										width="200"
										placeholder
									/>
									<div class="inset-0 mt-2 overflow-hidden">
										<div class="w-[8rem] truncate text-[0.7rem] font-normal">
											{{ product.title }}
										</div>
										<div class="truncate text-[10px]">
											{{ usePrice(product?.product_variants[0]?.price) }}
										</div>
									</div>
								</div>
							</NuxtLink>
						</div>
					</div>
				</div>
				<!--  /Вас могут заинтересовать -->
			</div>
		</template>
	</Drawer>
</template>

<style>
	#cart-tabs .p-tab-active {
		@apply bg-red2 text-primary;
	}
</style>
