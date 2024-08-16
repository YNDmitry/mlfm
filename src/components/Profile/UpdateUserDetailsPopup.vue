<script lang="ts" setup>
	import {object, string} from 'yup'

	const userStore = useUserStore()
	const schema = object({
		firstName: string(),
		lastName: string(),
		phone: string().matches(
			/^\+7 \(\d{3}\) \d{3} \d{2}-\d{2}$/,
			'Обязательное поле',
		),
	})

	const {handleSubmit, isSubmitting} = useForm({
		validationSchema: schema,
	})

	const isDone = ref(false)

	const phone = useField('phone')

	const onSubmitUpdateInfo = handleSubmit(async (values) => {
		try {
			await userStore.updateUserInfo(
				values.firstName,
				values.lastName,
				values.phone,
			)
			await userStore.getUserInfo()
			isDone.value = true
			return setTimeout(() => (userStore.isChangeUserInfoPopup = false), 500)
		} catch (error) {
			throw error
		}
	})
</script>

<template>
	<Dialog
		v-model:visible="userStore.isChangeUserInfoPopup"
		modal
		:pt="{
			root: 'max-w-[500px] min-w-[500px]',
		}"
	>
		<template #header>
			<div class="text-[1rem] font-bold">Обновление данных</div>
		</template>
		<form @submit.prevent="onSubmitUpdateInfo" v-if="!isDone">
			<div class="flex flex-col gap-4">
				<div class="grid grid-cols-[1fr_1fr] gap-4 max-mobile:grid-cols-[1fr]">
					<TheInput
						input-type="text"
						:inputName="'firstName'"
						:inputPlaceholder="userStore.firstName + ' - имя'"
					/>
					<TheInput
						input-type="text"
						:inputName="'lastName'"
						:inputPlaceholder="userStore.lastName + ' - фамилия'"
					/>
				</div>
				<InputMask
					mask="+7 (999) 999 99-99"
					placeholder="+7 (999) 999 99-99"
					name="phone"
					input-type="text"
					:model-value="phone.value"
					@update:model-value="
						(value) => {
							phone.setValue(value)
						}
					"
					class="w-full border-[1px] border-black font-light focus:outline-none max-tablet:h-[2.5rem] max-tablet:rounded-[1.25rem] max-tablet:px-[12px] max-tablet:py-[5px] max-tablet:text-[0.625rem] tablet:h-[48px] tablet:rounded-[35px] tablet:px-[0.875rem] tablet:text-[0.875rem]"
				/>
				<button
					:disabled="isSubmitting"
					type="submit"
					class="relative flex w-full items-center justify-center bg-red2 text-primary transition-colors hover:bg-red2-hover disabled:pointer-events-none disabled:opacity-70 max-tablet:min-h-[1.875rem] max-tablet:rounded-[1.25rem] max-tablet:text-[0.625rem] tablet:min-h-[45px] tablet:rounded-[1.875rem]"
				>
					<ProgressSpinner
						v-if="isSubmitting"
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
		<div v-else class="text-center">Успешно!</div>
	</Dialog>
</template>
