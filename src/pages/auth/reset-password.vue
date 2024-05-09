<script setup lang="ts">
	import {jwtPayload} from '../../utils/jwt-payload'
	import {object, string} from 'yup'
	import {refresh, passwordReset} from '@directus/sdk'
	const {$directus} = useNuxtApp()

	definePageMeta({
		layout: 'default',
		middleware: ['auth'],
	})

	useSeoMeta({
		title: 'Сброс пароля | MLFM',
		ogTitle: 'Сброс пароля | MLFM',
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

	const isDone = ref(false)
	const isError = ref(false)
	const refresh_token = useRoute().params.token

	const {handleSubmit, isSubmitting} = useForm({validationSchema: schema})

	const res = await $directus.request(refresh(refresh_token))
	const email = computed(() => jwtPayload(res.refresh_token).email)

	const onSubmit = handleSubmit(async (values) => {
		try {
			await $directus.request(passwordReset(refresh_token, values.password))
			isDone.value = true
		} catch (error) {
			isError.value = true
		}
	})
</script>

<template>
	<AuthForm title="Сброс пароля">
		<form @submit.prevent="onSubmit" v-if="!isDone">
			<TheInput
				:isRequired="true"
				:inputPlaceholder="'Email'"
				:inputType="'email'"
				:inputName="'email'"
				:value="email"
				:disabled="true"
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
					Сбросить
				</button>
				<div v-if="isError" class="text-red">
					Что-то пошло не так. Попробуйте ещё раз позже
				</div>
			</div>
		</form>
		<div v-else>
			<span>Успешно! Теперь можете зайти в личный кабинет!</span>
			<NuxtLink
				to="/profile"
				class="relative flex w-full items-center justify-center bg-red2 text-primary transition-colors hover:bg-red2-hover disabled:pointer-events-none disabled:opacity-70 max-tablet:min-h-[1.875rem] max-tablet:rounded-[1.25rem] max-tablet:text-[0.625rem] tablet:min-h-[45px] tablet:rounded-[1.875rem]"
			>
				Перейти
			</NuxtLink>
		</div>
	</AuthForm>
</template>
