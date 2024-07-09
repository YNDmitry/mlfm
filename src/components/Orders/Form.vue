<script lang="ts" setup>
	defineProps({
		checkPin: Function,
		isSubmitting: Boolean,
	})

	const {meta, errorMessage, value} = useField('pin')
</script>

<template>
	<div>
		<form
			@submit.prevent="checkPin"
			@keyup.enter="checkPin"
			class="mx-auto max-w-[400px]"
		>
			<h1 class="mb-5 text-center text-h1 max-tablet:text-h1Mob">
				Просмотр заказа
			</h1>
			<p class="my-4 text-center text-[0.7rem]">Введите пин</p>
			<div v-auto-animate class="my-6 flex flex-col">
				<InputOtp
					:pt="{root: 'justify-center h-10'}"
					integerOnly
					v-model="value"
				>
					<template #default="{attrs, events}">
						<input
							type="text"
							v-bind="attrs"
							v-on="events"
							class="h-10 min-h-6 w-10 rounded-[8px] border border-gray2 text-center outline-none"
						/>
					</template>
				</InputOtp>
				<span
					v-if="errorMessage && meta.touched"
					class="mx-auto mt-4 text-nowrap text-center text-[0.625rem] text-[red]"
				>
					{{ errorMessage }}
				</span>
			</div>
			<button
				:disabled="isSubmitting"
				type="submit"
				class="relative mt-4 flex w-full items-center justify-center bg-red2 text-primary transition-colors hover:bg-red2-hover disabled:pointer-events-none disabled:opacity-70 max-tablet:min-h-[1.875rem] max-tablet:rounded-[1.25rem] max-tablet:text-[0.625rem] tablet:min-h-[45px] tablet:rounded-[1.875rem]"
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
				Отправить
			</button>
		</form>
	</div>
</template>
