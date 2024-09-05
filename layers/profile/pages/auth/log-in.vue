<script setup lang="ts">
	import {object, string} from 'yup'
	import {useUserStore} from '~~/core/src/stores/user'
	definePageMeta({
		middleware: ['auth'],
	})

	useSeoMeta({
		title: 'Вход | MLFM',
		ogTitle: 'Вход | MLFM',
	})

	const userStore = useUserStore()
	const toast = useToast()

	const schema = object({
		email: string()
			.required('Обязательное поле')
			.email('Введите корректный адрес электронной почты'),
		password: string()
			.required('Обязательное поле')
			.min(6, 'Минимальная длина 6')
			.max(200, 'Максимальная длина 200'),
	})

	const {handleSubmit, isSubmitting} = useForm({
		validationSchema: schema,
	})

	const onSubmit = handleSubmit(async (values) => {
		const res = await userStore.userLogin(values.email, values.password)
		if (res?.message === 'unauthorized') {
			toast.add({
				severity: 'error',
				summary: 'Ошибка',
				detail: 'Неверный логин или пароль',
			})
		}
	})

	const isResetPasswordPopup = ref(false)
</script>

<template>
	<AuthForm title="Войти">
		<ClientOnly>
			<Toast :position="'top-right'" />
		</ClientOnly>
		<PopupsAuthResetPassword
			@update:visible="isResetPasswordPopup = $event"
			:isPopupOpen="isResetPasswordPopup"
		/>
		<form @submit.prevent="onSubmit" :validationSchema="schema">
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
		</form>
	</AuthForm>
</template>
