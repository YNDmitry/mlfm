<script setup lang="ts">
	const useCart = useCartStore()
	const websiteStore = useWebsiteStore()
	const toast = useToast()
	const type = ref('Виртуальная')
	const nominal = ref<number | null>(null)

	const isDisabled = computed(() => nominal.value <= 0)

	const config = useRuntimeConfig()

	const {data} = await useAsyncGql(
		'Gift',
		{},
		{
			getCachedData(key, nuxtApp) {
				return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
			},
		},
	)

	useSeoMetaUtil(data.value.gift_card?.seo, config)

	const addItemToCart = async () => {
		try {
			await useCart.addGiftCard({
				title: 'Подарочная карта',
				image_id: data.value.gift_card?.image.id,
				category: type.value,
				price: nominal.value || 0,
				type: 'gift-card',
			})
			toast.add({
				summary: 'Успешно',
				detail: 'Подарочная карта добавлена в корзину',
				life: 3000,
				severity: 'success',
			})
			setTimeout(() => websiteStore.handleVisibleCart(), 3000)
		} catch (error) {
			toast.add({
				summary: 'Ошибка',
				detail: 'Что-то пошло не так',
				life: 3000,
				severity: 'error',
			})
		}
	}
</script>

<template>
	<div>
		<Toast position="top-right" />
		<!-- Карточка товара -->
		<section class="pb-20 pt-[78px] max-tablet:pt-0">
			<div class="mx-auto my-0 max-w-[1189px] px-[1rem]">
				<div
					class="flex items-start gap-7 max-tablet:flex-col max-tablet:gap-4"
				>
					<div
						class="top-40 flex max-w-[700px] flex-col gap-4 max-laptop:w-full"
						v-if="data.gift_card?.image?.id"
					>
						<NuxtImg
							provider="directus"
							:src="data.gift_card?.image.id"
							class="h-full w-full object-contain"
							placeholder
						/>
						<NuxtImg
							provider="directus"
							v-for="image in data.gift_card?.images"
							:src="image?.directus_files_id?.id"
							class="h-full w-full object-contain"
							placeholder
						/>
					</div>

					<div
						class="sticky top-32 flex w-full max-w-[420px] flex-col max-tablet:max-w-none max-tablet:gap-[0.75rem] tablet:gap-[2rem]"
					>
						<h1
							class="text-h1 max-tablet:text-h1Mob max-tablet:font-light tablet:font-extralight"
						>
							{{ data.gift_card?.title }}
						</h1>

						<form
							@submit.prevent="addItemToCart"
							class="flex flex-col max-tablet:gap-[0.75rem] tablet:gap-4"
						>
							<div class="flex flex-col max-tablet:gap-[0.75rem] tablet:gap-2">
								<div
									class="mb-2 mt-4 text-[0.75rem] font-normal max-tablet:text-[0.625rem]"
								>
									Номинал в рублях:
								</div>
								<InputNumber
									inputId="gift-nominal"
									v-model:model-value="nominal"
									@update:model-value="nominal"
									mode="currency"
									currency="RUB"
									locale="ru-RU"
									placeholder="10.000 ₽"
									:max-fraction-digits="0"
									:min="1000"
									:pt="{
										root: 'outline-none !active:outline-none',
									}"
									class="w-full border-[1px] border-black font-light focus:outline-none max-tablet:h-[1.875rem] max-tablet:rounded-[1.25rem] max-tablet:px-[12px] max-tablet:py-[5px] max-tablet:text-[0.625rem] tablet:h-[48px] tablet:rounded-[35px] tablet:px-[0.875rem] tablet:text-[0.875rem]"
								/>
								<div>
									<div
										class="mb-2 mt-4 text-[0.75rem] font-normal max-tablet:text-[0.625rem]"
									>
										Тип:
									</div>
									<div class="flex w-full items-center gap-4">
										<label
											for="virtual"
											class="relative flex h-12 w-full items-center justify-center overflow-hidden rounded-main border border-black text-center has-[:checked]:text-[#ffffff] max-tablet:h-9"
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
												class="z-10 cursor-pointer text-[14px] transition-all checked:text-[#ffffff] max-tablet:text-[0.625rem]"
												>Виртуальная</span
											>
										</label>
										<label
											for="p"
											class="relative flex h-12 w-full items-center justify-center overflow-hidden rounded-main border border-black text-center has-[:checked]:text-[#ffffff] max-tablet:h-9"
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
												class="z-10 cursor-pointer text-[14px] transition-all checked:text-[#ffffff] max-tablet:text-[0.625rem]"
												>Физическая</span
											>
										</label>
									</div>
								</div>
							</div>
							<!-- Кнопки "Добавить" -->
							<div
								class="flex flex-col max-tablet:gap-[1rem] tablet:gap-[1.313rem]"
							>
								<button
									:disabled="isDisabled"
									type="submit"
									class="w-full rounded-main bg-red2 text-primary transition-all hover:bg-red2-hover disabled:pointer-events-none disabled:opacity-70 max-tablet:min-h-[2rem] max-tablet:text-[0.625rem] tablet:min-h-[3.313rem]"
								>
									Добавить в корзину
								</button>
							</div>
							<!-- /Кнопки "Добавить" -->
						</form>
					</div>
				</div>
			</div>
		</section>
		<!-- /Карточка товара -->
	</div>
</template>

<style>
	.p-inputwrapper-focus input {
		@apply !outline-none;
	}
</style>
