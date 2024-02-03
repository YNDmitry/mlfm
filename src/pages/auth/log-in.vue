<script setup lang="ts"></script>

<template>
	<AuthForm title="Войти">
		<form @submit.prevent>
			<TheInput
				:label="'Email'"
				:isRequired="true"
				:inputPlaceholder="'email@gmail.com'"
				:inputType="'email'"
			/>
			<TheInput
				:label="'Пароль'"
				:isRequired="true"
				:inputPlaceholder="'*******'"
				:inputType="'password'"
				class="mt-[1.5rem]"
			/>
			<div class="mt-[1.5rem] w-full">
				<button type="submit" class="button w-full">Войти</button>
				<NuxtLink
					class="text-[1rem] leading-[150%] font-light underline text-center block mt-[1.5rem]"
					>Забыли пароль?</NuxtLink
				>
			</div>
		</form>
	</AuthForm>
</template>

<style scoped></style>
