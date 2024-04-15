<script setup lang="ts">
	import {object, string} from 'yup'
	const {getItems} = useDirectusItems()

	useSeoMeta({
		title: 'Подарочная карта | MLFM',
		ogTitle: 'Подарочная карта | MLFM',
	})

	const {data: gift} = useAsyncData(
		'giftProduct',
		() => {
			return getItems({
				collection: 'gift_card',
				params: {
					fields: ['title', 'description', 'image'],
				},
			})
		},
		{
			getCachedData(key, nuxtApp) {
				return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
			},
		},
	)

	const type = ref('Физическая')

	const schema = object({
		nominal: string().required(),
		type: string().required(),
	})

	const {handleSubmit, isSubmitting} = useForm({
		validationSchema: schema,
	})

	const onSubmit = handleSubmit(() => {})

	const useCart = useCartStore()
</script>

<template>
	<div>
		<!-- Карточка товара -->
		<section class="pb-20 pt-[78px] max-tablet:pt-0">
			<div class="mx-auto my-0 max-w-[1189px] px-[1rem]">
				<div
					class="flex items-start gap-7 max-tablet:flex-col max-tablet:gap-4"
				>
					<div
						class="!sticky top-40 max-w-[700px] max-laptop:!static max-laptop:w-full"
						v-if="gift?.image"
					>
						<NuxtImg
							provider="directus"
							:src="gift?.image"
							class="h-full w-full object-contain"
						/>
					</div>

					<div
						class="flex w-full max-w-[420px] flex-col max-tablet:max-w-none max-tablet:gap-[0.75rem] tablet:gap-[2rem]"
					>
						<h1
							class="max-tablet:text-h1Mob text-h1 max-tablet:font-light tablet:font-extralight"
						>
							{{ gift?.title }}
						</h1>

						<form class="flex flex-col max-tablet:gap-[0.75rem] tablet:gap-4">
							<div class="flex flex-col max-tablet:gap-[0.75rem] tablet:gap-2">
								<div class="mb-2 mt-4 font-normal">Номинал в рублях:</div>
								<TheInput
									input-type="number"
									input-name="gift-nominal"
									input-placeholder="10.000"
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
									@click="useCart.addItem"
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
									<div v-html="gift?.description"></div>
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
