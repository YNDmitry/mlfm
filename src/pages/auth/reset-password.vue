<script setup lang="ts">
	import {jwtPayload} from '../../utils/jwt-payload'
	import {object, string} from 'yup'
	import {passwordReset} from '@directus/sdk'
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
		password: string()
			.required('Обязательное поле')
			.min(6, 'Минимальная длина 6')
			.max(200, 'Максимальная длина 200'),
	})

	const isDone = ref(false)
	const isError = ref(false)
	const refresh_token = useRoute().query.token as string

	const {handleSubmit, isSubmitting} = useForm({validationSchema: schema})

	const email = computed(() => jwtPayload(refresh_token).email)

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
			<div
				disabled="true"
				class="flex w-full cursor-not-allowed items-center border-[1px] border-black bg-black/10 font-light focus:outline-none disabled:pointer-events-none max-tablet:h-[1.875rem] max-tablet:rounded-[1.25rem] max-tablet:px-[12px] max-tablet:py-[5px] max-tablet:text-[0.625rem] tablet:h-[48px] tablet:rounded-[35px] tablet:px-[0.875rem] tablet:text-[0.875rem]"
			>
				<span>{{ email }}</span>
			</div>
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
		<div v-else class="flex flex-col">
			<span class="mx-auto mb-4 text-center"
				>Успешно! Теперь можете зайти в личный кабинет!</span
			>
			<NuxtLink
				to="/profile"
				class="relative flex w-full items-center justify-center bg-red2 text-primary transition-colors hover:bg-red2-hover disabled:pointer-events-none disabled:opacity-70 max-tablet:min-h-[1.875rem] max-tablet:rounded-[1.25rem] max-tablet:text-[0.625rem] tablet:min-h-[45px] tablet:rounded-[1.875rem]"
			>
				Перейти
			</NuxtLink>
		</div>
	</AuthForm>
</template>
