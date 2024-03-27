<script setup>
	definePageMeta({
		layout: 'checkout',
	})

	useSeoMeta({
		title: 'Оформление заказа | MLFM',
		ogTitle: 'Оформление заказа | MLFM',
		lang: 'ru',
	})
</script>

<template>
	<section class="laptop:grid laptop:grid-cols-delivery">
		<!-- Контактная информация -->
		<div class="pb-[3.75rem]">
			<div class="container laptop:max-w-[512px]">
				<form class="pt-8">
					<!-- Контактная информация -->
					<div>
						<h1
							class="max-tablet:pb-[24px] max-tablet:text-[0.875rem] max-tablet:font-medium tablet:pb-[3.125rem] tablet:text-[24px]"
						>
							Контактная информация
						</h1>

						<div class="flex flex-col gap-[1.25rem]">
							<label class="flex cursor-pointer flex-col gap-2" for="inpName">
								<span class="max-tablet:text-[0.625rem] tablet:text-[12px]"
									>Контактное лицо (ФИО)*</span
								>

								<input
									class="w-full border-[1px] border-black font-light max-tablet:h-[1.875rem] max-tablet:rounded-[1.25rem] max-tablet:px-[12px] max-tablet:py-[5px] max-tablet:text-[0.625rem] tablet:h-[48px] tablet:rounded-[35px] tablet:px-[0.875rem] tablet:text-[0.875rem]"
									type="text"
									placeholder="Введите имя"
								/>
							</label>

							<label class="flex cursor-pointer flex-col gap-2" for="inpName">
								<span class="max-tablet:text-[0.625rem] tablet:text-[12px]"
									>Электронный адрес (Email)*</span
								>

								<input
									class="w-full border-[1px] border-black font-light max-tablet:h-[1.875rem] max-tablet:rounded-[1.25rem] max-tablet:px-[12px] max-tablet:py-[5px] max-tablet:text-[0.625rem] tablet:h-[48px] tablet:rounded-[35px] tablet:px-[0.875rem] tablet:text-[0.875rem]"
									type="text"
									placeholder="user@gmail.com"
								/>
							</label>
						</div>

						<label
							id="check-1"
							class="flex cursor-pointer items-center gap-[0.625rem] pt-[12px]"
						>
							<input
								id="check-1"
								type="checkbox"
								class="absolute h-5 w-5 cursor-pointer opacity-0"
							/>

							<div
								class="flex h-5 w-5 cursor-pointer items-center justify-center border-[1px] border-grayLight"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="9"
									height="8"
									viewBox="0 0 9 8"
									fill="none"
								>
									<path
										d="M6.97016 0.968522C7.11103 0.834411 7.29848 0.760269 7.49298 0.76174C7.68747 0.763212 7.87378 0.840182 8.0126 0.976409C8.15143 1.11264 8.2319 1.29747 8.23704 1.4919C8.24218 1.68633 8.17159 1.87515 8.04016 2.01852L4.05016 7.00852C3.98155 7.08242 3.89874 7.14172 3.80669 7.18289C3.71464 7.22405 3.61523 7.24623 3.51441 7.2481C3.41359 7.24997 3.31343 7.23148 3.21991 7.19375C3.1264 7.15603 3.04146 7.09983 2.97016 7.02852L0.324158 4.38252C0.250471 4.31386 0.191369 4.23106 0.150377 4.13906C0.109385 4.04706 0.0873427 3.94775 0.0855659 3.84704C0.0837892 3.74634 0.102314 3.64631 0.140035 3.55292C0.177756 3.45954 0.233901 3.3747 0.305119 3.30348C0.376338 3.23226 0.461172 3.17612 0.55456 3.1384C0.647948 3.10068 0.747977 3.08215 0.84868 3.08393C0.949383 3.08571 1.0487 3.10775 1.1407 3.14874C1.2327 3.18973 1.3155 3.24883 1.38416 3.32252L3.47816 5.41552L6.95116 0.990522L6.97016 0.968522Z"
										fill="white"
									/>
								</svg>
							</div>

							<span class="text-[0.625rem]">Стать постоянным покупателем</span>
						</label>

						<label
							class="flex cursor-pointer flex-col gap-2 pt-[1.25rem]"
							for="inpName"
						>
							<span class="max-tablet:text-[0.625rem] tablet:text-[12px]"
								>Номер телефона</span
							>

							<input
								id="inpName"
								class="w-full border-[1px] border-black font-light max-tablet:h-[1.875rem] max-tablet:rounded-[1.25rem] max-tablet:px-[12px] max-tablet:py-[5px] max-tablet:text-[0.625rem] tablet:h-[48px] tablet:rounded-[35px] tablet:px-[0.875rem] tablet:text-[0.875rem]"
								type="text"
								placeholder="+799999487787"
							/>
						</label>

						<div class="max-tablet:pt-6 tablet:pt-3">
							<a class="text-[0.625rem] underline" href="javascript:void(0)"
								>Впервые у нас ?
							</a>
						</div>

						<!-- Радио кнопки -->
						<div
							class="flex flex-col pt-[1.25rem] max-tablet:gap-[12px] tablet:gap-[1.25rem]"
						>
							<label
								id="radio-1"
								class="flex cursor-pointer items-center gap-[0.625rem]"
							>
								<input
									id="radio-1"
									type="radio"
									name="delivery"
									class="absolute h-5 w-5 cursor-pointer opacity-0"
									checked
								/>

								<div
									class="rounded-full relative flex h-5 w-5 cursor-pointer items-center justify-center border-[1px] border-black"
								></div>

								<span class="text-[0.625rem]">Доставка - 500Р</span>
							</label>

							<label
								id="radio-2"
								class="flex cursor-pointer items-center gap-[0.625rem]"
							>
								<input
									id="radio-2"
									type="radio"
									name="delivery"
									class="absolute h-5 w-5 cursor-pointer opacity-0"
								/>

								<div
									class="rounded-full relative flex h-5 w-5 cursor-pointer items-center justify-center border-[1px] border-black"
								></div>

								<span class="text-[0.625rem]">Самовывоз - 0Р</span>
							</label>
						</div>
						<!-- /Радио кнопки -->
					</div>
					<!-- /Контактная информация -->

					<!-- Адрес доставки -->
					<div class="max-tablet:pt-[2rem] tablet:pt-[3.125rem]">
						<h3
							class="max-tablet:pb-[24px] max-tablet:text-[0.875rem] max-tablet:font-medium tablet:pb-[3.125rem] tablet:text-[24px]"
						>
							Адрес доставки
						</h3>

						<div class="flex flex-col gap-5">
							<div class="flex cursor-pointer flex-col gap-2" for="inpName">
								<span class="max-tablet:text-[0.625rem] tablet:text-[12px]"
									>Город</span
								>

								<select
									class="w-full border-[1px] border-black font-light max-tablet:h-[1.875rem] max-tablet:rounded-[1.25rem] max-tablet:px-[12px] max-tablet:py-[5px] max-tablet:text-[0.625rem] tablet:h-[48px] tablet:rounded-[35px] tablet:px-[0.875rem] tablet:text-[0.875rem]"
								>
									<option value="Москва">Москва</option>
									<option value="Пермь">Пермь</option>
								</select>
							</div>

							<label class="flex cursor-pointer flex-col gap-2" for="inpName">
								<span class="max-tablet:text-[0.625rem] tablet:text-[12px]"
									>Улица</span
								>

								<input
									id="inpName"
									class="w-full border-[1px] border-black font-light max-tablet:h-[1.875rem] max-tablet:rounded-[1.25rem] max-tablet:px-[12px] max-tablet:py-[5px] max-tablet:text-[0.625rem] tablet:h-[48px] tablet:rounded-[35px] tablet:px-[0.875rem] tablet:text-[0.875rem]"
									type="text"
									placeholder="Ленина 88"
								/>
							</label>

							<div class="flex gap-[11px]">
								<label class="flex cursor-pointer flex-col gap-2" for="inpName">
									<span class="max-tablet:text-[0.625rem] tablet:text-[12px]"
										>Дом</span
									>

									<input
										id="inpName"
										class="w-full border-[1px] border-black font-light max-tablet:h-[25px] max-tablet:rounded-[1.25rem] max-tablet:px-[12px] max-tablet:py-[5px] max-tablet:text-[0.625rem] tablet:h-[1.875rem] tablet:rounded-[35px] tablet:px-[0.875rem] tablet:text-[0.875rem]"
										type="text"
									/>
								</label>

								<label class="flex cursor-pointer flex-col gap-2" for="inpName">
									<span class="max-tablet:text-[0.625rem] tablet:text-[12px]"
										>Подъезд</span
									>

									<input
										id="inpName"
										class="w-full border-[1px] border-black font-light max-tablet:h-[25px] max-tablet:rounded-[1.25rem] max-tablet:px-[12px] max-tablet:py-[5px] max-tablet:text-[0.625rem] tablet:h-[1.875rem] tablet:rounded-[35px] tablet:px-[0.875rem] tablet:text-[0.875rem]"
										type="text"
									/>
								</label>

								<label class="flex cursor-pointer flex-col gap-2" for="inpName">
									<span class="max-tablet:text-[0.625rem] tablet:text-[12px]"
										>Квартира</span
									>

									<input
										id="inpName"
										class="w-full border-[1px] border-black font-light max-tablet:h-[25px] max-tablet:rounded-[1.25rem] max-tablet:px-[12px] max-tablet:py-[5px] max-tablet:text-[0.625rem] tablet:h-[1.875rem] tablet:rounded-[35px] tablet:px-[0.875rem] tablet:text-[0.875rem]"
										type="text"
									/>
								</label>
							</div>

							<label class="flex cursor-pointer flex-col gap-2" for="inpName">
								<span class="max-tablet:text-[0.625rem] tablet:text-[12px]"
									>Почтовый индекс*</span
								>

								<input
									id="inpName"
									class="w-full border-[1px] border-black font-light max-tablet:h-[1.875rem] max-tablet:rounded-[1.25rem] max-tablet:px-[12px] max-tablet:py-[5px] max-tablet:text-[0.625rem] tablet:h-[48px] tablet:rounded-[35px] tablet:px-[0.875rem] tablet:text-[0.875rem]"
									type="text"
								/>
							</label>
						</div>
					</div>
					<!-- /Адрес доставки -->

					<!-- Комментарий к заказу -->
					<div class="max-tablet:pt-[24px] tablet:pt-[3.125rem]">
						<h3
							class="max-tablet:pb-[12px] max-tablet:text-[12px] tablet:pb-[3.125rem] tablet:text-[24px]"
						>
							Комментарий к заказу
						</h3>

						<textarea
							placeholder="Введите текст"
							class="placeholder-gray-900 h-[155px] w-full resize-none border-[1px] border-black px-3 py-4 text-[0.625rem]"
						></textarea>
					</div>
					<!-- /Комментарий к заказу -->

					<!-- Способ оплаты -->
					<div class="max-tablet:pt-[2rem] tablet:pt-[3.125rem]">
						<h3
							class="max-tablet:pb-[12px] max-tablet:text-[12px] tablet:pb-[3.125rem] tablet:text-[24px]"
						>
							Способ оплаты
						</h3>

						<!-- Радио кнопки -->
						<div
							class="flex flex-col max-tablet:gap-[12px] tablet:gap-[1.25rem]"
						>
							<label
								id="radio-3"
								class="flex cursor-pointer items-center gap-[8px]"
							>
								<input
									id="radio-3"
									type="radio"
									name="payment"
									class="absolute h-5 w-5 cursor-pointer opacity-0"
									checked
								/>

								<div
									class="rounded-full relative flex h-5 w-5 cursor-pointer items-center justify-center border-[1px] border-black"
								></div>

								<span class="text-[0.625rem]">СПБ</span>
							</label>

							<label
								id="radio-4"
								class="flex cursor-pointer items-center gap-[8px]"
							>
								<input
									id="radio-4"
									type="radio"
									name="payment"
									class="absolute h-5 w-5 cursor-pointer opacity-0"
								/>

								<div
									class="rounded-full relative flex h-5 w-5 cursor-pointer items-center justify-center border-[1px] border-black"
								></div>

								<span class="text-[0.625rem]">Банковская карта</span>
							</label>

							<label
								id="radio-5"
								class="flex cursor-pointer items-center gap-[8px]"
							>
								<input
									id="radio-5"
									type="radio"
									name="payment"
									class="absolute h-5 w-5 cursor-pointer opacity-0"
								/>

								<div
									class="rounded-full relative flex h-5 w-5 cursor-pointer items-center justify-center border-[1px] border-black"
								></div>

								<span class="text-[0.625rem]">Долями</span>
							</label>

							<label
								id="radio-6"
								class="flex cursor-pointer items-center gap-[8px]"
							>
								<input
									id="radio-6"
									type="radio"
									name="payment"
									class="absolute h-5 w-5 cursor-pointer opacity-0"
								/>

								<div
									class="rounded-full relative flex h-5 w-5 cursor-pointer items-center justify-center border-[1px] border-black"
								></div>

								<span class="text-[0.625rem]">SberPay</span>
							</label>

							<label
								id="radio-7"
								class="flex cursor-pointer items-center gap-[8px]"
							>
								<input
									id="radio-7"
									type="radio"
									name="payment"
									class="absolute h-5 w-5 cursor-pointer opacity-0"
								/>

								<div
									class="rounded-full relative flex h-5 w-5 cursor-pointer items-center justify-center border-[1px] border-black"
								></div>

								<span class="text-[0.625rem]">TinkoffPay</span>
							</label>
						</div>
						<!-- /Радио кнопки -->
					</div>
					<!-- /Способ оплаты -->

					<!-- Кнопка оплаты на ПК -->
					<div class="mt-[1.875rem] max-laptop:hidden">
						<button
							class="w-full bg-red2 text-primary transition-colors hover:bg-red2-hover max-tablet:min-h-[1.875rem] max-tablet:rounded-[1.25rem] max-tablet:text-[0.625rem] tablet:min-h-[45px] tablet:rounded-[1.875rem]"
						>
							Оплатить заказ
						</button>

						<label
							id="check-2"
							class="gray flex cursor-pointer items-center gap-[0.625rem] pt-[0.938rem]"
						>
							<input
								id="check-2"
								type="checkbox"
								class="absolute h-5 w-5 cursor-pointer opacity-0"
							/>

							<div
								class="flex h-5 w-5 cursor-pointer items-center justify-center border-[1px] border-grayLight"
							>
								<IconsCheck />
							</div>

							<p class="border-darkGray2 text-[12px]">
								Я согласен со всеми

								<a class="underline" href="javascript:void(0)"
									>правилами и условиями</a
								>
							</p>
						</label>
					</div>
					<!-- /Кнопка оплаты на ПК -->
				</form>
			</div>
		</div>
		<!-- /Контактная информация -->

		<!--  Информация о заказе -->
		<div
			class="font-montserrat max-laptop:pt-[2rem] laptop:bg-[#F4F4F4] laptop:pt-[3.125rem]"
		>
			<div class="container laptop:w-[512px]">
				<!--  Товары -->
				<div class="flex flex-col gap-[1.25rem]">
					<article class="flex max-mobile:gap-[0.625rem] mobile:gap-[0.938rem]">
						<!-- <NuxtImg
							src="/img/delivery/1@2x.png"
							class="max-mobile:h-[3.75rem] max-mobile:w-[3.813rem] max-mobile:w-[6.563rem] mobile:h-[6.25rem]"
						/> -->

						<div class="flex w-full items-center justify-between">
							<div class="flex flex-col gap-1">
								<span class="text-[0.625rem]">Подвеска</span>

								<p class="text-[0.625rem] font-medium">Undi</p>

								<span class="text-[8px] opacity-50">1 шт</span>
							</div>

							<span class="text-[0.625rem]">12,000 ₽</span>
						</div>
					</article>
				</div>
				<!-- /Товары -->

				<!--  Общая инф-ция о товарах -->
				<div
					class="relative flex flex-col gap-[1.875rem] max-laptop:pt-[45px] laptop:pb-[1.25rem] laptop:pt-[1.25rem] laptop:after:absolute laptop:after:bottom-0 laptop:after:left-0 laptop:after:h-[2px] laptop:after:w-full laptop:after:bg-gray2 laptop:after:content-['']"
				>
					<div
						class="flex justify-between text-[12px] font-medium max-laptop:hidden"
					>
						<span>Стоимость товаров</span>

						<span>24,000₽</span>
					</div>

					<div class="flex justify-between text-[0.625rem]">
						<span>Доставка</span>

						<span>500₽</span>
					</div>
				</div>

				<div
					class="relative flex flex-col gap-[0.875rem] max-laptop:pb-[1.625rem] max-laptop:pt-[1rem] max-laptop:after:absolute max-laptop:after:bottom-0 max-laptop:after:left-0 max-laptop:after:h-[2px] max-laptop:after:w-full max-laptop:after:bg-gray2 max-laptop:after:content-[''] laptop:pt-[1.25rem]"
				>
					<div class="flex justify-between text-[0.625rem] text-darkGray">
						<span>Скидка</span>

						<span>-360₽</span>
					</div>

					<div class="flex justify-between text-[0.625rem] font-medium">
						<span>Итого</span>

						<span>24,140₽</span>
					</div>
				</div>
				<!--  /Общая инф-ция о товарах -->

				<!-- Кнопка оплаты на Мобилках -->
				<div class="my-[1.25rem] laptop:hidden">
					<button
						class="w-full bg-red2 text-primary transition-colors hover:bg-red2-hover max-tablet:min-h-[37px] max-tablet:rounded-[1.25rem] max-tablet:text-[0.625rem] tablet:min-h-[45px] tablet:rounded-[1.875rem]"
					>
						Оплатить заказ
					</button>

					<label
						id="check-2"
						class="flex cursor-pointer items-center gap-[8px] pt-[0.938rem] font-light"
					>
						<input
							id="check-2"
							type="checkbox"
							class="absolute h-5 w-5 cursor-pointer opacity-0"
						/>

						<div
							class="flex h-5 w-5 cursor-pointer items-center justify-center border-[1px] border-grayLight"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="9"
								height="8"
								viewBox="0 0 9 8"
								fill="none"
							>
								<path
									d="M6.97016 0.968522C7.11103 0.834411 7.29848 0.760269 7.49298 0.76174C7.68747 0.763212 7.87378 0.840182 8.0126 0.976409C8.15143 1.11264 8.2319 1.29747 8.23704 1.4919C8.24218 1.68633 8.17159 1.87515 8.04016 2.01852L4.05016 7.00852C3.98155 7.08242 3.89874 7.14172 3.80669 7.18289C3.71464 7.22405 3.61523 7.24623 3.51441 7.2481C3.41359 7.24997 3.31343 7.23148 3.21991 7.19375C3.1264 7.15603 3.04146 7.09983 2.97016 7.02852L0.324158 4.38252C0.250471 4.31386 0.191369 4.23106 0.150377 4.13906C0.109385 4.04706 0.0873427 3.94775 0.0855659 3.84704C0.0837892 3.74634 0.102314 3.64631 0.140035 3.55292C0.177756 3.45954 0.233901 3.3747 0.305119 3.30348C0.376338 3.23226 0.461172 3.17612 0.55456 3.1384C0.647948 3.10068 0.747977 3.08215 0.84868 3.08393C0.949383 3.08571 1.0487 3.10775 1.1407 3.14874C1.2327 3.18973 1.3155 3.24883 1.38416 3.32252L3.47816 5.41552L6.95116 0.990522L6.97016 0.968522Z"
									fill="white"
								/>
							</svg>
						</div>

						<p class="border-darkGray2 text-[12px]">
							Я согласен со всеми

							<a class="underline" href="javascript:void(0)"
								>правилами и условиями</a
							>
						</p>
					</label>
				</div>
				<!-- /Кнопка оплаты на Мобилках -->
			</div>
		</div>
		<!--  /Информация о заказе -->
	</section>
</template>
