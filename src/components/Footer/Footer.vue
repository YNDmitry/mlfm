<script setup lang="ts">
	import {object, string} from 'yup'
	const config = useNuxtData('config').data
	const websiteConfig = useWebsiteStore()

	const schema = object({
		footerEmail: string()
			.required('Обязательное поле')
			.email('Некорректная почта'),
	})

	const {handleSubmit, setErrors, setFieldValue} = useForm({
		validationSchema: schema,
	})

	const onSubmit = handleSubmit(async (values) => {
		await websiteConfig.handleNewsletterSubscribe(values).catch((err) => {
			if (err.errors[0].extensions.code === 'RECORD_NOT_UNIQUE') {
				setErrors({
					footerEmail: 'Пользователь с этим email уже подписан',
				})
				setFieldValue('footerEmail', '')
			}
		})
	})
</script>
<template>
	<footer class="mt-auto border-t border-t-[#B4B4B4] pt-[4rem]">
		<div class="container">
			<div
				class="grid grid-cols-footer gap-8 max-laptop:grid-cols-[1fr_1fr] max-laptop:gap-11"
			>
				<div>
					<div class="text-[1rem] font-bold max-tablet:text-[0.75rem]">
						Информация
					</div>
					<ul class="mt-[30px] flex flex-col gap-3 max-tablet:mt-4">
						<li
							class="font-montserrat text-[14px] font-normal text-[#6C6C6C] max-tablet:text-[10px]"
						>
							<NuxtLink to="/about">О компании</NuxtLink>
						</li>
						<li
							class="font-montserrat text-[14px] font-normal text-[#6C6C6C] max-tablet:text-[10px]"
						>
							<NuxtLink to="/contact-us">Контакты</NuxtLink>
						</li>
					</ul>
				</div>
				<div>
					<div class="text-[1rem] font-bold max-tablet:text-[0.75rem]">
						Для покупателей
					</div>
					<ul class="mt-[30px] flex flex-col gap-3 max-tablet:mt-4">
						<li
							class="font-montserrat text-[14px] font-normal text-[#6C6C6C] max-tablet:text-[10px]"
						>
							<NuxtLink to="/profile">Личный кабинет</NuxtLink>
						</li>
						<li
							class="font-montserrat text-[14px] font-normal text-[#6C6C6C] max-tablet:text-[10px]"
						>
							<NuxtLink to="/gift-card">Подарочные сертификаты</NuxtLink>
						</li>
						<li
							class="font-montserrat text-[14px] font-normal text-[#6C6C6C] max-tablet:text-[10px]"
						>
							<NuxtLink to="/docs/conditions">Доставка и оплата</NuxtLink>
						</li>
						<li
							class="font-montserrat text-[14px] font-normal text-[#6C6C6C] max-tablet:text-[10px]"
						>
							<NuxtLink to="/docs/conditions">Публичная оферта</NuxtLink>
						</li>
					</ul>
				</div>
				<div
					class="w-full max-w-[430px] max-tablet:col-span-2 max-tablet:max-w-none max-tablet:text-center"
				>
					<div>
						<div class="text-[1rem] font-bold max-tablet:text-[0.75rem]">
							У нас прекрасные новости
						</div>
						<p
							class="mt-[30px] font-montserrat text-[14px] font-normal text-[#6C6C6C] max-tablet:mt-4 max-tablet:text-[10px]"
						>
							Лучшие акции, главные новинки и персональные предложения
						</p>
						<div v-if="websiteConfig.isNewsletterFormSubmitted" class="mt-5">
							Спасибо за подписку на нашу рассылку!
						</div>
						<template v-else>
							<form
								@submit.prevent="onSubmit"
								class="relative mt-5 flex items-center"
							>
								<div v-auto-animate class="relative flex w-full flex-col">
									<Field
										name="footerEmail"
										placeholder="Введите Email"
										class="min-h-[48px] w-full border-b-[1px] border-b-[#B4B4B4] pr-10 font-montserrat text-[14px] focus:outline-none"
									/>
									<ErrorMessage
										name="footerEmail"
										class="absolute bottom-[-1.5rem] text-[0.625rem] text-[red]"
									></ErrorMessage>
								</div>
								<button type="submit" class="absolute right-0">
									<IconsFooterArrow />
								</button>
							</form>
						</template>
					</div>
				</div>
				<div
					class="max-w-[154px] max-tablet:col-span-2 max-tablet:w-full max-tablet:max-w-none max-tablet:text-center"
				>
					<IconsFooterLogo class="max-tablet:mx-auto" />
					<div
						v-if="config?.current_address"
						class="mt-12 font-montserrat text-[14px] text-[#6C6C6C]"
					>
						<div>{{ config.current_address }}</div>
						<NuxtLink
							:to="'tel:' + config.current_phone_number"
							class="font-bold"
							>{{ config.current_phone_number }}</NuxtLink
						>
					</div>
				</div>
			</div>
		</div>
		<div class="mt-[4rem] bg-[black] py-2 text-center text-[white]">
			<div class="font-montserrat text-[10px] opacity-50">
				&#169; {{ new Date().getFullYear() }} MLFM.STORE. Все права защищены
			</div>
		</div>
	</footer>
</template>
