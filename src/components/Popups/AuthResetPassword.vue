<script setup>
	import {object, string} from 'yup'
	import {passwordRequest} from '@directus/sdk'
	const {$directus} = useNuxtApp()

	defineProps({
		isPopupOpen: {
			type: Boolean,
			required: true,
			default: false,
		},
	})

	const schema = object({
		email: string()
			.required('Обязательное поле')
			.email('Введите корректный адрес электронной почты'),
	})

	const {handleSubmit} = useForm({
		validationSchema: schema,
	})

	const isSubmitted = ref(false)

	const onSubmit = handleSubmit(async (values) => {
		const data = await $directus
			.request(passwordRequest(values.email))
			.then((result) => {
				console.log(result)
				isSubmitted.value = true
			})
			.catch((err) => {
				console.log(err)
			})
	})

	const isOpen = ref(false)
</script>

<template>
	<Dialog
		v-model:visible="isOpen"
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
						type="submit"
						class="w-full bg-red2 text-primary transition-colors hover:bg-red2-hover max-tablet:min-h-[1.875rem] max-tablet:rounded-[1.25rem] max-tablet:text-[0.625rem] tablet:min-h-[45px] tablet:rounded-[1.875rem]"
					>
						Восстановить пароль
					</button>
				</div>
			</form>
		</div>
	</Dialog>
</template>
