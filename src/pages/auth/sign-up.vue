<script setup lang="ts">
	// const {login} = useDirectusAuth()

	// const email = ref()
	// const password = ref()
	// const onSubmit = async () => {
	// 	try {
	// 		await login({email: email.value, password: password.value})
	// 	} catch (e) {
	// 		console.log(e)
	// 	}
	// }
</script>

<template>
	<!-- <form @submit.prevent="onSubmit()">
		<input v-model.trim="email" type="email" name="email" placeholder="email" />
		<input
			v-model.trim="password"
			type="password"
			name="password"
			placeholder="password"
		/>
		<button type="submit">Log in</button>
	</form> -->
	<AuthForm title="Регистрация">
		<form @submit.prevent>
			<TheInput
				:label="'Имя'"
				:isRequired="true"
				:inputPlaceholder="'Иван'"
				:inputType="'text'"
			/>
			<TheInput
				:label="'Email'"
				:isRequired="true"
				:inputPlaceholder="'email@gmail.com'"
				:inputType="'email'"
				class="mt-[1.5rem]"
			/>
			<TheInput
				:label="'Пароль'"
				:isRequired="true"
				:inputPlaceholder="'*******'"
				:inputType="'password'"
				class="mt-[1.5rem]"
			/>
			<TheInput
				:label="'Повторите пароль'"
				:isRequired="true"
				:inputPlaceholder="'*******'"
				:inputType="'password'"
				class="mt-[1.5rem]"
			/>
			<div class="mt-[1.5rem] w-full">
				<NuxtLink class="button w-full">Войти</NuxtLink>
				<NuxtLink class="button-secondary w-full mt-[1.5rem]"
					>Войти как гость</NuxtLink
				>
				<NuxtLink
					class="text-[1rem] leading-[150%] font-light underline text-center block mt-[1.5rem]"
					>Забыли пароль?</NuxtLink
				>
			</div>
		</form>
	</AuthForm>
</template>

<style scoped></style>
