<script setup>
	import {useTimeoutFn} from '@vueuse/core'

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
				class="mx-1rem container flex max-w-[507px] flex-col gap-[2rem] pb-[4.375rem] pt-[34px]"
			>
				<div class="text-[1.25rem] font-medium">Присоединяйтесь к нам!</div>

				<p class="">
					Получите доступ к закрытым акциям и первыми узнавайте о лимитированных
					коллекциях!
				</p>

				<Form class="flex h-[54px] w-full">
					<input
						placeholder="EMAIL"
						class="w-full border-[1px] border-black px-5 font-extralight focus:outline-none"
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
