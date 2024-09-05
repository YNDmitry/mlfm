<script setup lang="ts">
	import {object, string} from 'yup'
	import {useTimeoutFn} from '@vueuse/core'
	import {useWebsiteStore} from '~~/core/src/stores'

	const websiteStore = useWebsiteStore()

	const isNewsletterPopup = useCookie('isNewsletterPopup', {
		default: () => 'true',
	})

	if (isNewsletterPopup.value === 'true') {
		useTimeoutFn(() => {
			websiteStore.isNewsletterPopup = true
			isNewsletterPopup.value = 'false'
		}, 10000)
	} else {
		useTimeoutFn(() => {
			websiteStore.isNewsletterPopup = isNewsletterPopup.value
			isNewsletterPopup.value = 'false'
		}, 10000)
	}

	const schema = object({
		newsletterEmail: string()
			.required('Обязательное поле')
			.email('Некорректная почта'),
	})

	const {handleSubmit, isSubmitting} = useForm({
		validationSchema: schema,
	})

	const onSubmit = handleSubmit(async (values, actions) => {
		await websiteStore
			.handleNewsletterSubscribe(values.newsletterEmail)
			.catch((err) => {
				if (err.errors[0].extensions.code === 'RECORD_NOT_UNIQUE') {
					actions.setFieldError(
						'newsletterEmail',
						'Пользователь с этим email уже подписан',
					)
				}
			})
	})
</script>

<template>
	<Dialog
		modal
		v-model:visible="websiteStore.isNewsletterPopup"
		class="w-[38.75rem] overflow-hidden rounded-[12px] px-0"
		id="newsletter-popup"
		:pt="{
			root: 'mx-6',
			closeicon: 'right-[10px]',
		}"
	>
		<div class="rounded-xl bg-white">
			<div class="relative">
				<NuxtImg
					class="rounded-xl"
					provider="directus"
					src="d003febc-e2ff-4b09-9ef8-df2d44ec7a85"
					width="620"
					placeholder
				/>
			</div>

			<div
				class="mx-1rem container flex max-w-[507px] flex-col gap-[2rem] pb-[4.375rem] pt-[34px] max-tablet:gap-3 max-tablet:pb-4 max-tablet:pt-4"
			>
				<div class="text-[1.25rem] font-medium max-tablet:text-[1rem]">
					Присоединяйтесь к нам!
				</div>

				<p class="max-tablet:text-[0.75rem]">
					Получите доступ к закрытым акциям и первыми узнавайте о лимитированных
					коллекциях!
				</p>

				<div v-if="websiteStore.isNewsletterFormSubmitted">
					Спасибо за подписку на нашу рассылку!
				</div>

				<div v-else class="mt-2">
					<form
						@submit.prevent="onSubmit"
						class="relative flex h-[54px] w-full max-tablet:h-auto max-tablet:flex-col max-tablet:overflow-hidden max-tablet:rounded-[4px]"
					>
						<Field
							:disabled="isSubmitting"
							placeholder="Email"
							class="w-full rounded-b-[0px] border-[1px] border-b-0 border-gray px-5 font-extralight focus:outline-none disabled:pointer-events-none max-tablet:min-h-9 max-tablet:text-[0.75rem]"
							type="email"
							name="newsletterEmail"
						/>
						<ErrorMessage
							name="newsletterEmail"
							class="absolute bottom-[-1.5rem] text-[0.625rem] text-red2"
						/>

						<button
							aria-label="Подписаться"
							type="submit"
							class="relative flex w-full max-w-[150px] items-center justify-center bg-red2 font-medium text-primary hover:bg-red2-hover max-laptop:text-[12px] max-tablet:min-h-10 max-tablet:w-full max-tablet:max-w-none laptop:text-[0.875rem]"
						>
							<ProgressSpinner
								aria-label="Loading..."
								style="width: 20px; height: 20px"
								:pt="{
									root: 'mx-0 absolute',
									circle: '!stroke-[#ffffff]',
								}"
								v-if="isSubmitting"
							/>
							<span v-else>Подписаться</span>
						</button>
					</form>
				</div>
			</div>
		</div>
	</Dialog>
</template>

<style>
	.p-component-overlay {
		backdrop-filter: blur(5px);
	}

	#newsletter-popup .p-dialog-content {
		@apply p-0;
	}

	#newsletter-popup .p-dialog-header {
		@apply absolute right-[1rem] top-[1rem] z-10 cursor-pointer bg-[transparent] p-3 text-[#1E1C1C] outline-none;
	}

	.p-dialog-header svg {
		@apply h-5 w-5;
	}
</style>
