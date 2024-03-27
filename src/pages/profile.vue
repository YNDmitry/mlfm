<script setup>
	import {passwordRequest} from '@directus/sdk'
	const {$directus} = useNuxtApp()
	definePageMeta({
		middleware: ['auth'],
	})

	useSeoMeta({
		title: 'Профиль | MLFM',
		ogTitle: 'Профиль | MLFM',
		lang: 'ru',
	})

	const userStore = useUserStore()
	const websiteStore = useWebsiteStore()

	const toast = useToast()

	const updatePassword = async () => {
		await $directus
			.request(passwordRequest(userStore.email))
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
			<form @submit.prevent="userStore.updateUserInfo()">
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
						:disabled="isSubmitting"
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
							v-if="isSubmitting"
						/>
						Обновить
					</button>
				</div>
			</form>
		</Dialog>
		<section class="pb-44 pt-20">
			<div class="container">
				<h1 class="text-h1">Мой профиль</h1>
				<div
					class="mt-20 flex items-start justify-between gap-3 max-tablet:flex-col"
				>
					<!-- Аватар -->
					<div
						class="flex min-h-64 min-w-64 items-center justify-center rounded-[100%] bg-red text-h1 uppercase text-primary"
					>
						{{ userStore?.firstName[0] + userStore?.lastName[0] }}
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
										{{ userStore?.firstName }}
									</div>
								</label>
								<label class="flex w-full cursor-pointer flex-col gap-2">
									<div
										class="flex w-full items-center border-[1px] border-black font-light max-tablet:h-[1.875rem] max-tablet:rounded-[1.25rem] max-tablet:px-[12px] max-tablet:py-[5px] max-tablet:text-[0.625rem] tablet:h-[48px] tablet:rounded-[35px] tablet:px-[0.875rem] tablet:text-[0.875rem]"
									>
										{{ userStore?.lastName }}
									</div>
								</label>
							</div>
							<label class="flex cursor-pointer flex-col gap-2">
								<div
									class="flex w-full items-center border-[1px] border-black font-light max-tablet:h-[1.875rem] max-tablet:rounded-[1.25rem] max-tablet:px-[12px] max-tablet:py-[5px] max-tablet:text-[0.625rem] tablet:h-[48px] tablet:rounded-[35px] tablet:px-[0.875rem] tablet:text-[0.875rem]"
								>
									{{ userStore.email }}
								</div>
							</label>
							<label class="flex cursor-pointer flex-col gap-2">
								<div
									class="flex w-full items-center border-[1px] border-black font-light max-tablet:h-[1.875rem] max-tablet:rounded-[1.25rem] max-tablet:px-[12px] max-tablet:py-[5px] max-tablet:text-[0.625rem] tablet:h-[48px] tablet:rounded-[35px] tablet:px-[0.875rem] tablet:text-[0.875rem]"
								>
									{{ userStore.phone || 'Номер не указан' }}
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
									@change="
										websiteStore.handleNewsletterSubscribe(userStore.email)
									"
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
	</div>
</template>
