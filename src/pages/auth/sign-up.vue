<script setup lang="ts">
	import {object, string, boolean, ref} from 'yup'

	definePageMeta({
		middleware: ['auth'],
	})

	useSeoMeta({
		title: 'Регистрация | MLFM',
		ogTitle: 'Регистрация | MLFM',
	})

	const schema = object({
		firstName: string()
			.required('Обязательное поле')
			.min(4, 'Минимальная длина 4')
			.max(50, 'Максимальная длина 50'),
		lastName: string()
			.required('Обязательное поле')
			.min(4, 'Минимальная длина 4')
			.max(50, 'Максимальная длина 50'),
		email: string()
			.required('Обязательное поле')
			.email('Введите корректный адрес электронной почты'),
		password: string()
			.required('Обязательное поле')
			.min(6, 'Минимальная длина 6')
			.max(200, 'Максимальная длина 200'),
		passwordConfirm: string()
			.required('Обязательное поле')
			.min(6)
			.oneOf([ref('password')], 'Пароли должны совпадать'),
		terms: boolean().required('Обязательное поле'),
		newsletter: boolean(),
	})

	const {handleSubmit, defineField, isSubmitting} = useForm({
		validationSchema: schema,
	})

	const [terms] = defineField('terms')
	const [newsletter] = defineField('newsletter')

	const userStore = useUserStore()
	const toast = useToast()
	const onSubmit = handleSubmit(async (values) => {
		try {
			await userStore
				.create(
					values.email,
					values.password,
					values.firstName,
					values.lastName,
					values.terms,
					values.newsletter,
				)
				.then(() => {
					navigateTo('/profile/')
				})
		} catch (error: any) {
			console.log(error)

			if (error.errors[0].extensions.code === 'RECORD_NOT_UNIQUE') {
				toast.add({
					severity: 'error',
					summary: 'Ошибка',
					detail: 'Пользователь с таким email уже зарегестрирован',
					life: 3000,
				})
			}
		}
	})
</script>

<template>
	<AuthForm title="Регистрация">
		<Toast :position="'top-right'" />
		<form @submit="onSubmit">
			<div class="grid grid-cols-[1fr_1fr] gap-2">
				<TheInput
					:isRequired="true"
					:inputPlaceholder="'Имя'"
					:inputType="'text'"
					:inputName="'firstName'"
				/>
				<TheInput
					:isRequired="true"
					:inputPlaceholder="'Фамилия'"
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
				<div class="mt-2 flex flex-col gap-[0.625rem]" v-auto-animate>
					<div class="flex items-center gap-[0.625rem]">
						<Checkbox
							:binary="true"
							v-model="terms"
							inputId="terms"
							:pt="{
								box: 'rounded-[0] border-[1px] border-grayLight shadow-none',
							}"
							name="terms"
							value="terms"
						/>
						<label for="terms" class="cursor-pointer text-[10px]"
							>Я согласен с
							<NuxtLink to="/docs/privacy" class="underline"
								>условиями пользования и политикой конфиденциальности</NuxtLink
							></label
						>
					</div>
					<ErrorMessage name="terms" class="mt-1 text-[0.625rem] text-[red]" />
				</div>
				<div class="mt-4 flex items-center gap-[0.625rem]">
					<Checkbox
						:binary="true"
						v-model="newsletter"
						inputId="newsletter"
						:pt="{
							box: 'rounded-[0] border-[1px] border-grayLight shadow-none',
						}"
						name="newsletter"
						value="newsletter"
					/>
					<label for="newsletter" class="cursor-pointer text-[10px]"
						>Подписаться на рассылку</label
					>
				</div>
				<button
					:disabled="isSubmitting"
					type="submit"
					class="relative mt-8 flex w-full items-center justify-center bg-red2 text-primary transition-colors hover:bg-red2-hover disabled:pointer-events-none disabled:opacity-70 max-tablet:min-h-[1.875rem] max-tablet:rounded-[1.25rem] max-tablet:text-[0.625rem] tablet:min-h-[45px] tablet:rounded-[1.875rem]"
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
					Зарегистрироваться
				</button>
				<div
					class="mt-6 block text-center text-[1rem] font-light leading-[150%]"
				>
					Уже есть аккаунт?
					<NuxtLink to="/auth/log-in" class="underline">Войти</NuxtLink>
				</div>
			</div>
		</form>
	</AuthForm>
</template>
