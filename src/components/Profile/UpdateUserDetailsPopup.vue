<script lang="ts" setup>
	import {object, string} from 'yup'

	const userStore = useUserStore()
	const schema = object({
		firstName: string(),
		lastName: string(),
		phone: string(),
	})

	const {handleSubmit, isSubmitting} = useForm({
		validationSchema: schema,
	})

	const isDone = ref(false)

	const onSubmitUpdateInfo = handleSubmit(async (values) => {
		await userStore.updateUserInfo(
			values.firstName,
			values.lastName,
			values.phone,
		)
		await userStore.getUserInfo()
		isDone.value = true
		setTimeout(() => (userStore.isChangeUserInfoPopup = false), 500)
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
				<TheInput
					input-type="text"
					:inputName="'phone'"
					:inputPlaceholder="userStore.phone || 'Телефон'"
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
