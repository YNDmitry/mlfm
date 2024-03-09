<script setup lang="ts">
	import {object, string} from 'yup'
	const schema = object({
		email: string().required().email().label('Email'),
		password: string().required().min(6).label('Пароль'),
	})
</script>

<template>
	<AuthForm title="Войти">
		<Form @submit.prevent :validationSchema="schema">
			<TheInput
				:label="'Email'"
				:isRequired="true"
				:inputPlaceholder="'email@gmail.com'"
				:inputType="'email'"
				:inputName="'email'"
			/>
			<TheInput
				:label="'Пароль'"
				:isRequired="true"
				:inputPlaceholder="'*******'"
				:inputType="'password'"
				:inputName="'password'"
				class="mt-6"
			/>
			<div class="mt-6 w-full">
				<button type="submit" class="button w-full">Войти</button>
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
