<script setup>
	import {useStorage} from '@vueuse/core'
	import {useTimeoutFn} from '@vueuse/core'

	const websiteStore = useWebsiteStore()

	if (useStorage('newsletterPopup').value === 'true' || null) {
		useTimeoutFn(() => {
			websiteStore.isNewsletterPopup = true
			useStorage('newsletterPopup', false)
		}, 10000)
	} else {
		websiteStore.isNewsletterPopup = useStorage('newsletterPopup').value
	}
</script>

<template>
	<Dialog
		modal
		v-model:visible="websiteStore.isNewsletterPopup"
		class="w-[38.75rem] overflow-hidden rounded-[12px] px-0"
		id="newsletter-popup"
	>
		<div class="rounded-xl bg-white">
			<div class="relative">
				<NuxtImg
					class="rounded-xl"
					provider="directus"
					src="d003febc-e2ff-4b09-9ef8-df2d44ec7a85"
					width="620"
				/>
			</div>

			<div
				class="container flex max-w-[507px] flex-col pt-[34px] max-laptop:gap-[1.25rem] max-laptop:pb-[35px] laptop:gap-[2rem] laptop:pb-[4.375rem]"
			>
				<div
					class="font-medium max-laptop:text-[0.875rem] laptop:text-[1.25rem]"
				>
					Присоединяйтесь к нам!
				</div>

				<p class="max-laptop:text-[0.625rem] laptop:text-[0.875rem]">
					Получите доступ к закрытым акциям и первыми узнавайте о лимитированных
					коллекциях!
				</p>

				<Form class="flex w-full max-laptop:h-[35px] laptop:h-[54px]">
					<input
						placeholder="EMAIL"
						class="w-full border-[1px] border-black font-extralight focus:outline-none max-tablet:px-[12px] tablet:px-[1rem]"
						type="text"
					/>

					<button
						class="w-full max-w-[150px] bg-black font-medium text-primary max-laptop:text-[12px] laptop:text-[0.875rem]"
					>
						Подписаться
					</button>
				</Form>
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
