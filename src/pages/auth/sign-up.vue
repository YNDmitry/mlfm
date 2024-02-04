<script setup lang="ts">
	import {object, string, ref, setLocale} from 'yup'
	// const {login} = useDirectusAuth()

	// const onSubmit = async () => {
	// 	try {
	// 		await login({email: email.value, password: password.value})
	// 	} catch (e) {
	// 		console.log(e)
	// 	}
	// }
	const schema = object({
		firstName: string().required().min(4).max(50).label('Имя'),
		lastName: string().required().min(4).max(50).label('Фамилия'),
		email: string().required().email().label('Email'),
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

	const onSubmit = () =>
		handleSubmit((values) => {
			console.log(values)

			alert(JSON.stringify(values, null, 2))
		})
</script>

<template>
	<AuthForm title="Регистрация">
		<Form @submit="onSubmit" :validationSchema="schema">
			<div class="grid grid-cols-2 gap-2">
				<TheInput
					:label="'Имя'"
					:isRequired="true"
					:inputPlaceholder="'Иван'"
					:inputType="'text'"
					:inputName="'firstName'"
				/>
				<TheInput
					:label="'Фамилия'"
					:isRequired="true"
					:inputPlaceholder="'Иванов'"
					:inputType="'text'"
					:inputName="'lastName'"
				/>
			</div>
			<TheInput
				:label="'Email'"
				:isRequired="true"
				:inputPlaceholder="'email@gmail.com'"
				:inputType="'email'"
				:inputName="'email'"
				class="mt-6"
			/>
			<TheInput
				:label="'Пароль'"
				:isRequired="true"
				:inputPlaceholder="'*******'"
				:inputType="'password'"
				:inputName="'password'"
				class="mt-6"
			/>
			<TheInput
				:label="'Повторите пароль'"
				:isRequired="true"
				:inputPlaceholder="'*******'"
				:inputType="'password'"
				:inputName="'passwordConfirm'"
				class="mt-6"
			/>
			<div class="mt-6 w-full">
				<UIButton :title="'Зарегистрироваться'" tag="button"></UIButton>
				<div
					class="text-[1rem] leading-[150%] font-light text-center block mt-6"
				>
					Уже есть аккаунт?
					<NuxtLink to="/auth/log-in" class="underline">Войти</NuxtLink>
				</div>
			</div>
		</Form>
	</AuthForm>
</template>

<style scoped></style>
