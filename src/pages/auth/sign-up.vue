<script setup lang="ts">
	import {object, string, ref, setLocale} from 'yup'
	definePageMeta({
		middleware: ['auth'],
	})

	const schema = object({
		firstName: string().required().min(4).max(50).label('Имя'),
		lastName: string().required().min(4).max(50).label('Фамилия'),
		email: string().required().email().label('Электронная почта'),
		password: string().required().min(6).max(200).label('Пароль'),
		passwordConfirm: string()
			.required()
			.min(6)
			.oneOf([ref('password')])
			.label('Подтверждение пароля'),
	})

	setLocale({
		mixed: {
			default: 'обязательное поле',
			required: 'Обязательное поле',
		},
	})

	const {handleSubmit} = useForm({
		validationSchema: schema,
	})

	const userStore = useUserStore()
	const onSubmit = handleSubmit(async (values) => {
		try {
			const data = await userStore.create(
				values.email,
				values.password,
				values.firstName,
				values.lastName,
			)
			console.log(data)
		} catch (e) {
			console.log(e)
		}
	})
</script>

<template>
	<AuthForm title="Регистрация">
		<Form @submit="onSubmit()" :validationSchema="schema">
			<div class="grid grid-cols-[1fr_1fr] gap-2">
				<TheInput
					:isRequired="true"
					:inputPlaceholder="'Иван'"
					:inputType="'text'"
					:inputName="'firstName'"
				/>
				<TheInput
					:isRequired="true"
					:inputPlaceholder="'Иванов'"
					:inputType="'text'"
					:inputName="'lastName'"
				/>
			</div>
			<TheInput
				:isRequired="true"
				:inputPlaceholder="'Email'"
				:inputType="'email'"
				:inputName="'email'"
				class="mt-6"
			/>
			<TheInput
				:isRequired="true"
				:inputPlaceholder="'Пароль'"
				:inputType="'password'"
				:inputName="'password'"
				class="mt-6"
			/>
			<TheInput
				:isRequired="true"
				:inputPlaceholder="'Повторите пароль'"
				:inputType="'password'"
				:inputName="'passwordConfirm'"
				class="mt-6"
			/>
			<div class="mt-6 w-full">
				<button
					class="w-full bg-red2 text-primary transition-colors hover:bg-red2-hover max-tablet:min-h-[1.875rem] max-tablet:rounded-[1.25rem] max-tablet:text-[0.625rem] tablet:min-h-[45px] tablet:rounded-[1.875rem]"
				>
					Зарегистрироваться
				</button>
				<div
					class="mt-6 block text-center text-[1rem] font-light leading-[150%]"
				>
					Уже есть аккаунт?
					<NuxtLink to="/auth/log-in" class="underline">Войти</NuxtLink>
				</div>
			</div>
		</Form>
	</AuthForm>
</template>
