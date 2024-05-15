<script setup lang="ts">
	const userStore = useUserStore()

	const toast = useToast()

	definePageMeta({
		middleware: ['auth'],
	})

	useSeoMeta({
		title: 'Профиль | MLFM',
		ogTitle: 'Профиль | MLFM',
	})

	const status = ref([
		{
			id: 0,
			title: 'Создано',
		},
		{
			id: 1,
			title: 'Принятно',
		},
		{id: 2, title: 'В дороге'},
		{id: 3, title: 'Доставлен'},
	])

	const isMobile = useMediaQuery('(max-width: 768px)')
</script>
<template>
	<div>
		<Toast group="bt" />
		<ProfileUpdateUserDetailsPopup />
		<ProfileAddAddressPopup />
		<section class="pb-16 pt-20 max-tablet:pt-11">
			<div class="container mb-7 text-center" v-if="!userStore.isEmailVerify">
				Пожалуйста, подтвердрите ваш email адресс
			</div>
			<ProfileDesktopHead v-if="!isMobile" />
			<ProfileMobileHead v-else />
		</section>
		<section class="pb-44">
			<div class="container">
				<Accordion :activeIndex="[0]" :multiple="true">
					<AccordionTab
						:pt="{root: 'border-b-[1px]', content: 'px-0'}"
						v-if="!isMobile"
					>
						<template #header> Активные заказы </template>
						<div class="flex justify-between gap-5 py-6">
							<!-- Табы -->
							<div class="flex w-full max-w-[214px] flex-col gap-4">
								<button
									type="button"
									class="flex items-center gap-3 rounded-[30px] border px-6 py-4 text-[13px]"
								>
									<span>Заказ №543045</span><IconsOrderArrow class="ml-auto" />
								</button>
							</div>
							<!-- /Табы -->

							<!-- Тело заказа -->
							<div class="w-full max-w-[406px]">
								<div class="flex justify-between gap-2">
									<div
										v-for="item in status"
										:key="item.id"
										class="flex w-[66px] flex-col items-center justify-center text-center"
									>
										<div
											class="flex h-[50px] w-[50px] items-center justify-center rounded-[100%] bg-[#E5EAED]"
										>
											<IconsCheck class="h-[12px] w-[12px] text-black" />
										</div>
										<div class="mt-1 flex flex-col justify-center">
											<span class="font-main text-[12px]">{{
												item.title
											}}</span>
										</div>
									</div>
								</div>
								<div class="mt-6 flex flex-col items-start justify-start gap-4">
									<div class="grid grid-cols-[100px_1fr] gap-4 text-[12px]">
										<div>Адрес доставки:</div>
										<div>Москва, Ленина 88</div>
									</div>
									<div class="grid grid-cols-[100px_1fr] gap-4 text-[12px]">
										<div>Номер заказа:</div>
										<div>543045</div>
									</div>
									<button
										type="button"
										class="mt-4 flex items-center justify-center gap-3 rounded-[30px] border px-6 py-3 transition-all hover:bg-red2-hover hover:text-[#fff]"
									>
										Отменить заказ <iconsClose class="w-[15px]" />
									</button>
								</div>
							</div>
							<div class="w-full max-w-[420px]">
								<div class="flex flex-col gap-5">
									<article
										v-for="item in 2"
										:key="item"
										class="flex max-mobile:gap-[0.625rem] mobile:gap-[0.938rem]"
									>
										<NuxtImg
											src="https://admin.mlfm.store/assets/ebdb3d4d-09ad-4433-8902-68f3066e1828"
											width="130"
											class="object-cover max-mobile:h-[6.25rem] max-mobile:w-[3.813rem] mobile:h-[6.25rem]"
										/>

										<div class="flex w-full items-center justify-between">
											<div class="flex flex-col gap-1">
												<span class="text-[0.625rem]">Category</span>

												<p class="text-[0.625rem] font-medium">Ttile</p>

												<span class="text-[8px] opacity-50">1 шт</span>
											</div>

											<span class="text-[0.625rem]">6666 ₽</span>
										</div>
									</article>
									<div class="flex flex-col gap-3">
										<div class="grid grid-cols-[100px_1fr] gap-2 text-[12px]">
											<div>Продуктов:</div>
											<div>2</div>
										</div>
										<div class="grid grid-cols-[100px_1fr] gap-2 text-[12px]">
											<div>Скидка:</div>
											<div>1000Р</div>
										</div>
										<div class="grid grid-cols-[100px_1fr] gap-2 text-[12px]">
											<div>Доставка:</div>
											<div>500Р</div>
										</div>
										<div class="font-semibold">Итоговая цена: 23.500Р</div>
									</div>
								</div>
							</div>
						</div>
					</AccordionTab>
					<AccordionTab :pt="{root: 'border-b-[1px]', content: 'px-0'}">
						<template #header> Выполненные заказы </template>
						<div
							class="flex flex-col items-center justify-center gap-5 py-6 text-center"
						>
							<span>Здесь будет список выполненных заказов</span>
							<NuxtLink
								to="/catalog"
								class="flex h-11 w-full max-w-[10.625rem] items-center justify-center rounded-main bg-red2 font-montserrat text-[0.75rem] font-bold uppercase tracking-[3px] text-primary transition-colors hover:bg-red2-hover"
								>Каталог</NuxtLink
							>
						</div>
					</AccordionTab>
					<AccordionTab :pt="{root: 'border-b-[1px]', content: 'px-0'}">
						<template #header>Адреса</template>
						<div
							class="flex flex-col items-center justify-center gap-5 py-6 text-center"
						>
							<span>Пока что нет адресов</span>
							<UIButton
								title="Добавить"
								@click="userStore.handleChangeAddressesPopup()"
							/>
						</div>
					</AccordionTab>
				</Accordion>
			</div>
		</section>
	</div>
</template>
