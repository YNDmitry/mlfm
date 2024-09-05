<script setup lang="ts">
	const {handleChange, handleBlur, value, errorMessage, meta} = useField(
		() => 'phone',
		undefined,
	)
</script>

<template>
	<label class="flex cursor-pointer flex-col gap-2">
		<span class="max-tablet:text-[0.625rem] tablet:text-[12px]"
			>Номер телефона*</span
		>
		<InputMask
			:class="{
				'border-[#B1B1B1]': meta.dirty,
				'border-[green]': meta.touched && meta.valid,
				'!border-[red]': meta.touched && !meta.valid,
			}"
			class="w-full border-[1px] border-black font-light focus:outline-red2-hover max-tablet:h-[1.875rem] max-tablet:rounded-[1.25rem] max-tablet:px-[12px] max-tablet:py-[5px] max-tablet:text-[0.625rem] tablet:h-[48px] tablet:rounded-[35px] tablet:px-[0.875rem] tablet:text-[0.875rem]"
			mask="+7 (999) 999 99-99"
			placeholder="+7 (999) 999 99-99"
			name="phone"
			:invalid="meta.touched && !meta.valid"
			:auto-clear="false"
			:model-value="value"
			@update:model-value="(value: any) => handleChange(value)"
		/>
		<span
			v-if="errorMessage && meta.touched"
			class="mt-1 text-nowrap text-[0.625rem] text-[red]"
			>{{ errorMessage }}</span
		>
	</label>
</template>
