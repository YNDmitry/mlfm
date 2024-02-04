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
					class="text-[1rem] leading-[150%] font-light underline text-center block mt-6"
				>
					Забыли пароль?
				</NuxtLink>
				<div
					class="text-[1rem] leading-[150%] font-light text-center block mt-6"
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
