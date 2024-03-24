<script setup>
	definePageMeta({
		middleware: ['auth'],
	})

	useSeoMeta({
		title: 'Профиль | MLFM',
		ogTitle: 'Профиль | MLFM',
		lang: 'ru',
	})

	const userStore = useUserStore()
</script>
<template>
	<section class="pb-44 pt-20">
		<div class="container">
			<h1 class="text-h1">Мой профиль</h1>
			<div class="mt-20 flex items-start justify-between">
				<!-- Аватар -->
				<div
					class="flex h-64 w-64 items-center justify-center rounded-[100%] bg-red text-h1 text-primary"
				>
					EA
				</div>
				<!-- //Аватар -->

				<!-- Информация -->
				<div class="ml-20 mr-auto flex w-full max-w-[640px] flex-col gap-10">
					<div class="flex flex-col gap-5">
						<div class="flex gap-5">
							<label class="flex w-full cursor-pointer flex-col gap-2">
								<div
									class="flex w-full items-center border-[1px] border-black font-light max-tablet:h-[1.875rem] max-tablet:rounded-[1.25rem] max-tablet:px-[12px] max-tablet:py-[5px] max-tablet:text-[0.625rem] tablet:h-[48px] tablet:rounded-[35px] tablet:px-[0.875rem] tablet:text-[0.875rem]"
								>
									{{ userStore.firstName }}
								</div>
							</label>
							<label class="flex w-full cursor-pointer flex-col gap-2">
								<div
									class="flex w-full items-center border-[1px] border-black font-light max-tablet:h-[1.875rem] max-tablet:rounded-[1.25rem] max-tablet:px-[12px] max-tablet:py-[5px] max-tablet:text-[0.625rem] tablet:h-[48px] tablet:rounded-[35px] tablet:px-[0.875rem] tablet:text-[0.875rem]"
								>
									{{ userStore.lastName }}
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
							<NuxtLink class="text-[12px] font-normal underline"
								>Изменить пароль</NuxtLink
							>
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

				<button>
					<IconsEditProfile />
				</button>
			</div>
		</div>
	</section>
</template>
