<script setup lang="ts">
	import {object, string} from 'yup'
	definePageMeta({
		middleware: ['auth'],
	})
	const schema = object({
		email: string().required().email().label('Email'),
		password: string().required().min(6).label('Пароль'),
	})

	const {handleSubmit} = useForm({
		validationSchema: schema,
	})

	const userStore = useUserStore()
	const onSubmit = handleSubmit(async (values) => {
		try {
			const data = await userStore.userLogin(values.email, values.password)
			console.log(data)
		} catch (e) {
			console.log(e)
		}
	})
</script>

<template>
	<AuthForm title="Войти">
		<Form @submit="onSubmit()" :validationSchema="schema">
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
				<NuxtLink
					class="mt-6 block text-center text-[1rem] font-light leading-[150%] underline"
				>
					Забыли пароль?
				</NuxtLink>
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

<style scoped></style>
