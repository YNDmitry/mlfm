<script setup lang="ts">
	import {object, string, boolean, ref, setLocale} from 'yup'

	definePageMeta({
		middleware: ['auth'],
	})

	useSeoMeta({
		title: 'Регистрация | MLFM',
		ogTitle: 'Регистрация | MLFM',
		lang: 'ru',
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

	const {handleSubmit, defineField} = useForm({
		validationSchema: schema,
	})

	const [terms] = defineField('terms')
	const [newsletter] = defineField('newsletter')

	const userStore = useUserStore()
	const onSubmit = handleSubmit((values) => {
		const data = userStore
			.create(
				values.email,
				values.password,
				values.firstName,
				values.lastName,
				values.terms,
			)
			.then(() => {
				console.log('done')
			})
			.catch((e) => {
				console.log(e)
			})
	})
</script>

<template>
	<AuthForm title="Регистрация">
		<form @submit="onSubmit" :validationSchema="schema">
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
				<div class="mt-2 flex flex-col gap-[0.625rem]">
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
					type="submit"
					class="mt-8 w-full bg-red2 text-primary transition-colors hover:bg-red2-hover disabled:pointer-events-none disabled:opacity-75 max-tablet:min-h-[1.875rem] max-tablet:rounded-[1.25rem] max-tablet:text-[0.625rem] tablet:min-h-[45px] tablet:rounded-[1.875rem]"
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
		</form>
	</AuthForm>
</template>
