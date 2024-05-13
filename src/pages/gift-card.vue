<script setup lang="ts">
	useSeoMeta({
		title: 'Подарочная карта | MLFM',
		ogTitle: 'Подарочная карта | MLFM',
	})

	const {data} = await useAsyncGql(
		'Gift',
		{},
		{
			getCachedData(key, nuxtApp) {
				return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
			},
		},
	)

	const type = ref('Физическая')
	const nominal = ref(null)

	const isDisabled = computed(() => (nominal.value !== null ? false : true))

	const useCart = useCartStore()
</script>

<template>
	<div>
		<Toast />
		<!-- Карточка товара -->
		<section class="pb-20 pt-[78px] max-tablet:pt-0">
			<div class="mx-auto my-0 max-w-[1189px] px-[1rem]">
				<div
					class="flex items-start gap-7 max-tablet:flex-col max-tablet:gap-4"
				>
					<div
						class="!sticky top-40 max-w-[700px] max-laptop:!static max-laptop:w-full"
						v-if="data.gift_card?.image?.id"
					>
						<NuxtImg
							provider="directus"
							:src="data.gift_card?.image.id"
							class="h-full w-full object-contain"
						/>
					</div>

					<div
						class="flex w-full max-w-[420px] flex-col max-tablet:max-w-none max-tablet:gap-[0.75rem] tablet:gap-[2rem]"
					>
						<h1
							class="text-h1 max-tablet:text-h1Mob max-tablet:font-light tablet:font-extralight"
						>
							{{ data.gift_card?.title }}
						</h1>

						<form class="flex flex-col max-tablet:gap-[0.75rem] tablet:gap-4">
							<div class="flex flex-col max-tablet:gap-[0.75rem] tablet:gap-2">
								<div class="mb-2 mt-4 font-normal">Номинал в рублях:</div>
								<input
									type="number"
									name="gift-nominal"
									placeholder="10.000"
									class="w-full border-[1px] border-black font-light focus:outline-none max-tablet:h-[1.875rem] max-tablet:rounded-[1.25rem] max-tablet:px-[12px] max-tablet:py-[5px] max-tablet:text-[0.625rem] tablet:h-[48px] tablet:rounded-[35px] tablet:px-[0.875rem] tablet:text-[0.875rem]"
									v-model="nominal"
								/>
								<div>
									<div class="mb-2 mt-4 font-normal">Тип:</div>
									<div class="flex w-full items-center gap-4">
										<label
											for="p"
											class="relative flex h-12 w-full items-center justify-center overflow-hidden rounded-main border border-black text-center has-[:checked]:text-[#ffffff]"
										>
											<RadioButton
												:pt="{
													root: 'absolute w-full h-full left-0 right-0 bottom-0 top-0',
													box: 'w-full h-full left-0 right-0 bottom-0 top-0 rounded-[0] after:hidden',
													input: 'peer',
													icon: 'hidden',
												}"
												class=""
												inputId="p"
												name="type"
												value="Физическая"
												v-model="type"
											/>
											<span
												class="z-10 cursor-pointer text-[14px] transition-all checked:text-[#ffffff]"
												>Физическая</span
											>
										</label>
										<label
											for="virtual"
											class="relative flex h-12 w-full items-center justify-center overflow-hidden rounded-main border border-black text-center has-[:checked]:text-[#ffffff]"
										>
											<RadioButton
												:pt="{
													root: 'absolute w-full h-full left-0 right-0 bottom-0 top-0',
													box: 'w-full h-full left-0 right-0 bottom-0 top-0 rounded-[0] after:hidden',
													input: 'peer',
													icon: 'hidden',
												}"
												inputId="virtual"
												name="type"
												value="Виртуальная"
												v-model="type"
											/>
											<span
												class="z-10 cursor-pointer text-[14px] transition-all checked:text-[#ffffff]"
												>Виртуальная</span
											>
										</label>
									</div>
								</div>
							</div>
							<!-- Кнопки "Добавить" -->
							<div
								class="flex flex-col max-tablet:my-[1.25rem] max-tablet:gap-[1rem] tablet:gap-[1.313rem]"
							>
								<button
									@click="
										useCart.addItem({
											product_id: data?.gift_card.id,
											title: data?.gift_card?.title,
											image_id: data?.gift_card?.image.id,
											category: type,
											price: nominal,
											quantity: 1,
										})
									"
									:disabled="isDisabled"
									type="button"
									class="w-full rounded-main bg-red2 text-primary transition-all hover:bg-red2-hover disabled:pointer-events-none disabled:opacity-70 max-tablet:min-h-[2rem] max-tablet:text-[0.625rem] tablet:min-h-[3.313rem]"
								>
									Добавить в корзину
								</button>
							</div>
							<!-- /Кнопки "Добавить" -->
						</form>

						<!-- Dropdown-ы -->
						<div
							class="flex flex-col max-tablet:gap-[0.75rem] tablet:gap-[1.25rem]"
						>
							<Accordion>
								<AccordionTab class="p-0">
									<template #header class="p-0">
										<div class="font-normal">О продукте</div>
									</template>
									<div v-html="data.gift_card?.description"></div>
								</AccordionTab>
							</Accordion>
						</div>
						<!-- /Dropdown-ы -->
					</div>
				</div>
			</div>
		</section>
		<!-- /Карточка товара -->
	</div>
</template>
