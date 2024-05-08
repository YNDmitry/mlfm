<script setup lang="ts">
	import {passwordRequest} from '@directus/sdk'
	const {$directus} = useNuxtApp()
	const {updateUser} = useDirectusUsers()
	const userStore = useUserStore()
	const websiteStore = useWebsiteStore()

	const toast = useToast()

	definePageMeta({
		middleware: ['auth'],
	})

	useSeoMeta({
		title: 'Профиль | MLFM',
		ogTitle: 'Профиль | MLFM',
	})

	const updatePassword = async () => {
		await $directus
			.request(
				passwordRequest(
					userStore.email,
					'https://mlfm.store/auth/reset-password',
				),
			)
			.then(() => {
				toast.add({
					severity: 'success',
					summary: 'Успешно',
					detail: 'Отправили письмо для восстановления пароля на email',
					group: 'bt',
					life: 3000,
				})
			})
			.catch(() => {})
	}

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

	const updateUserNewsletter = async () => {
		await updateUser({
			id: userStore.id,
			user: {
				newsletter: !userStore.newsletter,
			},
		})
	}
</script>
<template>
	<div>
		<Toast group="bt" />
		<Dialog
			v-model:visible="userStore.isChangeUserInfoPopup"
			modal
			:pt="{
				root: 'max-w-[500px]',
			}"
		>
			<template #header>
				<div class="text-[1rem] font-bold">Обновление данных</div>
			</template>
			<form @submit.prevent="userStore.updateUserInfo">
				<div class="flex flex-col gap-4">
					<div
						class="grid grid-cols-[1fr_1fr] gap-4 max-mobile:grid-cols-[1fr]"
					>
						<TheInput :inputName="'firstName'" :inputPlaceholder="'Имя'" />
						<TheInput :inputName="'lastName'" :inputPlaceholder="'Фамилия'" />
					</div>
					<TheInput :inputName="'email'" :inputPlaceholder="'Email'" />
					<TheInput :inputName="'phone'" :inputPlaceholder="'Телефон'" />
					<button
						type="submit"
						class="relative flex w-full items-center justify-center bg-red2 text-primary transition-colors hover:bg-red2-hover disabled:pointer-events-none disabled:opacity-70 max-tablet:min-h-[1.875rem] max-tablet:rounded-[1.25rem] max-tablet:text-[0.625rem] tablet:min-h-[45px] tablet:rounded-[1.875rem]"
					>
						<ProgressSpinner
							aria-label="Loading..."
							style="width: 20px; height: 20px"
							:pt="{
								root: 'mx-0 absolute left-[2rem]',
								circle: '!stroke-[#ffffff]',
							}"
						/>
						Обновить
					</button>
				</div>
			</form>
		</Dialog>
		<section class="pb-16 pt-20">
			<div class="container">
				<h1 class="text-center text-h1">Мой профиль</h1>
				<div
					class="mt-20 flex items-start justify-between gap-3 max-tablet:flex-col"
				>
					<!-- Аватар -->
					<div
						class="flex min-h-64 min-w-64 items-center justify-center rounded-[100%] bg-red text-h1 uppercase text-primary"
					>
						<div class="flex gap-1" v-if="!userStore?.isAuthenticated">
							<Skeleton width="25px" height="25px" />
							<Skeleton width="25px" height="25px" />
						</div>
						<span v-else>
							{{ userStore?.firstName[0] + userStore?.lastName[0] || '' }}
						</span>
					</div>
					<!-- //Аватар -->

					<!-- Информация -->
					<div
						class="ml-14 mr-auto flex w-full max-w-[640px] flex-col gap-10 max-tablet:ml-0 max-tablet:max-w-none"
					>
						<div class="flex flex-col gap-5">
							<div class="flex gap-5">
								<label class="flex w-full cursor-pointer flex-col gap-2">
									<div
										class="flex w-full items-center border-[1px] border-black font-light max-tablet:h-[1.875rem] max-tablet:rounded-[1.25rem] max-tablet:px-[12px] max-tablet:py-[5px] max-tablet:text-[0.625rem] tablet:h-[48px] tablet:rounded-[35px] tablet:px-[0.875rem] tablet:text-[0.875rem]"
									>
										<Skeleton
											v-if="!userStore?.isAuthenticated"
											width="150px"
											height="20px"
										/>
										<span v-else>
											{{ userStore?.firstName || null }}
										</span>
									</div>
								</label>
								<label class="flex w-full cursor-pointer flex-col gap-2">
									<div
										class="flex w-full items-center border-[1px] border-black font-light max-tablet:h-[1.875rem] max-tablet:rounded-[1.25rem] max-tablet:px-[12px] max-tablet:py-[5px] max-tablet:text-[0.625rem] tablet:h-[48px] tablet:rounded-[35px] tablet:px-[0.875rem] tablet:text-[0.875rem]"
									>
										<Skeleton
											v-if="!userStore?.isAuthenticated"
											width="150px"
											height="20px"
										/>
										<span v-if="userStore?.lastName">
											{{ userStore?.lastName || null }}
										</span>
									</div>
								</label>
							</div>
							<label class="flex cursor-pointer flex-col gap-2">
								<div
									class="flex w-full items-center border-[1px] border-black font-light max-tablet:h-[1.875rem] max-tablet:rounded-[1.25rem] max-tablet:px-[12px] max-tablet:py-[5px] max-tablet:text-[0.625rem] tablet:h-[48px] tablet:rounded-[35px] tablet:px-[0.875rem] tablet:text-[0.875rem]"
								>
									<Skeleton
										v-if="!userStore?.isAuthenticated"
										width="150px"
										height="20px"
									/>
									<span v-if="userStore?.email">
										{{ userStore?.email || null }}
									</span>
								</div>
							</label>
							<label class="flex cursor-pointer flex-col gap-2">
								<div
									class="flex w-full items-center border-[1px] border-black font-light max-tablet:h-[1.875rem] max-tablet:rounded-[1.25rem] max-tablet:px-[12px] max-tablet:py-[5px] max-tablet:text-[0.625rem] tablet:h-[48px] tablet:rounded-[35px] tablet:px-[0.875rem] tablet:text-[0.875rem]"
								>
									<Skeleton
										v-if="!userStore?.isAuthenticated"
										width="150px"
										height="20px"
									/>
									<span v-else>
										{{ userStore.phone || 'Номер не указан' }}
									</span>
								</div>
							</label>
							<div class="flex justify-between">
								<button
									type="button"
									@click="updatePassword"
									class="text-[12px] font-normal underline"
								>
									Изменить пароль
								</button>
								<button
									class="text-[12px] font-normal underline"
									@click="userStore.logOut()"
								>
									Выйти
								</button>
							</div>
							<label
								class="mt-5 flex cursor-pointer items-center gap-[0.625rem] pt-[12px]"
							>
								<Checkbox
									binary
									v-model="userStore.newsletter"
									@change="updateUserNewsletter"
									:pt="{
										box: 'rounded-[0] border-[1px] border-grayLight shadow-none',
									}"
									name="newsletter"
								/>

								<span class="text-[0.625rem]"
									>Держите меня в курсе новостей и предложений</span
								>
							</label>
						</div>
					</div>
					<!-- Информация -->

					<button @click="userStore.handleChangeUserDetailsPopup">
						<IconsEditProfile />
					</button>
				</div>
			</div>
		</section>
		<section class="pb-44 max-tablet:hidden">
			<div class="container">
				<Accordion :activeIndex="[0]" :multiple="true">
					<AccordionTab :pt="{root: 'border-b-[1px]', content: 'px-0'}">
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
							<UIButton title="Добавить" />
						</div>
					</AccordionTab>
				</Accordion>
			</div>
		</section>
	</div>
</template>
