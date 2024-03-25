<script setup>
	import {object, string} from 'yup'
	import {passwordRequest} from '@directus/sdk'
	const {$directus} = useNuxtApp()
	defineProps({
		isPopupOpen: {
			type: Boolean,
		},
	})

	const schema = object({
		email: string()
			.required('Обязательное поле')
			.email('Введите корректный адрес электронной почты'),
	})

	const {handleSubmit, isSubmitting} = useForm({
		validationSchema: schema,
	})

	const isSubmitted = ref(false)

	const onSubmit = handleSubmit(async (values) => {
		const data = await $directus
			.request(passwordRequest(values.email))
			.then((result) => {
				isSubmitted.value = true
			})
	})
</script>

<template>
	<Dialog
		:visible="isPopupOpen"
		@update:visible="isPopupOpen = $event"
		modal
		class="w-full max-w-[450px] bg-primary"
	>
		<template #header>
			<div class="text-[1rem] font-bold">Восстановление пароля</div>
		</template>
		<div class="bg-primary">
			<div v-if="isSubmitted">
				Если у вас есть учётная запись, мы отправили вам безопасную ссылку для
				восстановления пароля
			</div>
			<form v-else @submit.prevent="onSubmit">
				<div class="mb-4">Введите email на который вы регистрировались</div>
				<TheInput
					:inputPlaceholder="'Email'"
					:inputType="'email'"
					:inputName="'email'"
				></TheInput>

				<div class="mt-8 w-full">
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
						Восстановить пароль
					</button>
				</div>
			</form>
		</div>
	</Dialog>
</template>
