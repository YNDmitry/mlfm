<script setup lang="ts">
	const props = defineProps({
		isSubmitting: {
			type: Boolean,
		},
	})

	const offer = useField('offer')

	const updateValue = (value: boolean) => {
		offer.handleChange(value)
	}
</script>

<template>
	<div class="mt-[1.875rem]">
		<button
			type="submit"
			:disabled="isSubmitting"
			class="w-full bg-red2 text-primary transition-colors hover:bg-red2-hover max-tablet:min-h-[1.875rem] max-tablet:rounded-[1.25rem] max-tablet:text-[0.625rem] tablet:min-h-[45px] tablet:rounded-[1.875rem]"
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
			Оплатить заказ
		</button>
		<label v-auto-animate id="offer" class="block pt-[0.938rem]">
			<div class="flex cursor-pointer items-center gap-[0.625rem]">
				<Checkbox
					:binary="true"
					inputId="offer"
					name="offer"
					:pt="{
						box: 'border border-grayLight text-white shadow-none',
					}"
					v-model:model-value="offer.value.value"
					@update:model-value="updateValue"
				/>
				<span class="border-darkGray2 text-[0.625rem]">
					Я согласен с
					<NuxtLink to="/docs/offer" class="underline"
						>публичной оффертой</NuxtLink
					>
				</span>
			</div>
			<span
				v-if="offer.errorMessage && offer.meta.touched"
				class="mt-1 text-nowrap text-[0.625rem] text-[red]"
				>{{ offer.errorMessage }}</span
			>
		</label>
	</div>
</template>
