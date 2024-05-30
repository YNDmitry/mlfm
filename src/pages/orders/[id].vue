<script setup lang="ts">
	import {object, string} from 'yup'

	const config = useRuntimeConfig()
	const {params} = useRoute()
	const toast = useToast()

	const isPinValid = ref(false)
	const schema = object({
		pin: string()
			.required('Обязательное поле')
			.min(4, 'Минимальная длина 4')
			.max(50, 'Максимальная длина 4')
			.default(''),
	})
	const {isSubmitting, handleSubmit} = useForm({
		validationSchema: schema,
	})
	const {errorMessage, meta, value} = useField('pin')

	const checkPin = handleSubmit(async (values) => {
		try {
			const res = await fetch(config.public.databaseUrl + 'check-pin', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					id: params.id,
					pin: values.pin,
				}),
			}).then((d) => d.json())
			isPinValid.value = true
			return res
		} catch (error) {
			toast.add({
				severity: 'warn',
				detail: 'Неверный PIN',
			})
		}
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
</script>

<template>
	<div>
		<Toast position="top-right" />
		<section class="py-12">
			<div class="container mx-auto">
				<div v-if="!isPinValid">
					<form @submit.prevent="checkPin" class="mx-auto max-w-[400px]">
						<h1 class="mb-5 text-center text-h1 max-tablet:text-h1Mob">
							Просмотр заказа
						</h1>
						<div v-auto-animate>
							<input
								type="text"
								name="pin"
								v-model="value"
								placeholder="Введите PIN"
								class="w-full border-[1px] border-black font-light focus:outline-none max-tablet:h-[2.5rem] max-tablet:rounded-[1.25rem] max-tablet:px-[12px] max-tablet:py-[5px] max-tablet:text-[0.625rem] tablet:h-[48px] tablet:rounded-[35px] tablet:px-[0.875rem] tablet:text-[0.875rem]"
							/>
							<span
								v-if="errorMessage && meta.touched"
								class="mt-1 text-nowrap text-[0.625rem] text-[red]"
							>
								{{ errorMessage }}
							</span>
						</div>
						<button
							:disabled="isSubmitting"
							type="submit"
							class="relative mt-4 flex w-full items-center justify-center bg-red2 text-primary transition-colors hover:bg-red2-hover disabled:pointer-events-none disabled:opacity-70 max-tablet:min-h-[1.875rem] max-tablet:rounded-[1.25rem] max-tablet:text-[0.625rem] tablet:min-h-[45px] tablet:rounded-[1.875rem]"
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
							Отправить
						</button>
					</form>
				</div>
				<div v-else>
					<!-- Здесь ваш код для отображения коллекции -->
					<div class="mx-auto flex w-full max-w-[1000px] justify-between">
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
										<span class="font-main text-[12px]">{{ item.title }}</span>
									</div>
								</div>
							</div>
							<div class="mt-6 flex flex-col items-start justify-start gap-4">
								<div class="grid grid-cols-[150px_1fr] gap-4 text-[12px]">
									<div>ФИО:</div>
									<div>Метелев Дмитрий Сергеевич</div>
								</div>
								<div class="grid grid-cols-[150px_1fr] gap-4 text-[12px]">
									<div>Адрес доставки:</div>
									<div>Москва, Ленина 88</div>
								</div>
								<div class="grid grid-cols-[150px_1fr] gap-4 text-[12px]">
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
				</div>
			</div>
		</section>
	</div>
</template>
