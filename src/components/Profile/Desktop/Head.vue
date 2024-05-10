<script setup lang="ts">
	const userStore = useUserStore()

	const {updateUser} = useDirectusUsers()
	const toast = useToast()

	const updateUserNewsletter = async () => {
		await updateUser({
			id: userStore.id,
			user: {
				newsletter: !userStore.newsletter,
			},
		})
	}

	const updatePassword = async () => {
		await userStore.updatePassword().then(() => {
			toast.add({
				severity: 'success',
				summary: 'Успешно',
				detail: 'Отправили письмо для восстановления пароля на email',
				group: 'bt',
				life: 3000,
			})
		})
	}
</script>

<template>
	<div class="container max-tablet:hidden">
		<h1 class="text-center text-h1 max-tablet:hidden">Мой профиль</h1>
		<div class="mt-20 flex items-start justify-between gap-3">
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
			<div class="ml-14 mr-auto flex w-full max-w-[640px] flex-col gap-10">
				<div class="flex flex-col gap-5">
					<div class="flex gap-5">
						<label class="flex w-full cursor-pointer flex-col gap-2">
							<div
								class="flex w-full items-center border-[1px] border-black font-light tablet:h-[48px] tablet:rounded-[35px] tablet:px-[0.875rem] tablet:text-[0.875rem]"
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
								class="flex w-full items-center border-[1px] border-black font-light tablet:h-[48px] tablet:rounded-[35px] tablet:px-[0.875rem] tablet:text-[0.875rem]"
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
							class="flex w-full items-center border-[1px] border-black font-light tablet:h-[48px] tablet:rounded-[35px] tablet:px-[0.875rem] tablet:text-[0.875rem]"
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
							@click="userStore?.logOut()"
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

			<button @click="userStore?.handleChangeUserDetailsPopup">
				<IconsEditProfile />
			</button>
		</div>
	</div>
</template>
