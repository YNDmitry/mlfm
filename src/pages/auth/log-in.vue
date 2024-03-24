<script setup lang="ts">
	import {object, string} from 'yup'
	definePageMeta({
		middleware: ['auth'],
	})

	useSeoMeta({
		title: 'Вход | MLFM',
		ogTitle: 'Вход | MLFM',
		lang: 'ru',
	})

	const schema = object({
		email: string()
			.required('Обязательное поле')
			.email('Введите корректный адрес электронной почты'),
		password: string()
			.required('Обязательное поле')
			.min(6, 'Минимальная длина 6')
			.max(200, 'Максимальная длина 200'),
	})

	const {handleSubmit} = useForm({
		validationSchema: schema,
	})

	const userStore = useUserStore()
	const onSubmit = (values) => {
		try {
			userStore.userLogin(values.email, values.password)
		} catch (e) {
			console.log(e)
		}
	}

	const isResetPasswordPopup = ref(false)
</script>

<template>
	<AuthForm title="Войти">
		<PopupsAuthResetPassword />
		<Form @submit="onSubmit" :validationSchema="schema">
			<TheInput
				:isRequired="true"
				:inputPlaceholder="'Email'"
				:inputType="'email'"
				:inputName="'email'"
			/>
			<TheInput
				:isRequired="true"
				:inputPlaceholder="'Пароль'"
				:inputType="'password'"
				:inputName="'password'"
				class="mt-6"
			/>
			<div class="mt-6 w-full">
				<button
					type="submit"
					class="w-full bg-red2 text-primary transition-colors hover:bg-red2-hover max-tablet:min-h-[1.875rem] max-tablet:rounded-[1.25rem] max-tablet:text-[0.625rem] tablet:min-h-[45px] tablet:rounded-[1.875rem]"
				>
					Войти
				</button>
				<button
					@click="isResetPasswordPopup = true"
					type="button"
					class="mx-auto mt-6 block text-center text-[1rem] font-light leading-[150%] underline"
				>
					Забыли пароль?
				</button>
				<div
					class="mt-6 block text-center text-[1rem] font-light leading-[150%]"
				>
					Нет аккаунта?
					<NuxtLink to="/auth/sign-up" class="underline"
						>Зарегестрируйтесь</NuxtLink
					>
				</div>
			</div>
		</Form>
	</AuthForm>
</template>
