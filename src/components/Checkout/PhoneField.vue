<script setup lang="ts"></script>

<template>
	<label class="flex cursor-pointer flex-col gap-2 pt-[1.25rem]">
		<span class="max-tablet:text-[0.625rem] tablet:text-[12px]"
			>Номер телефона*</span
		>
		<InputMask
			class="w-full border-[1px] border-black font-light focus:outline-red2-hover max-tablet:h-[1.875rem] max-tablet:rounded-[1.25rem] max-tablet:px-[12px] max-tablet:py-[5px] max-tablet:text-[0.625rem] tablet:h-[48px] tablet:rounded-[35px] tablet:px-[0.875rem] tablet:text-[0.875rem]"
			mask="+7 (999) 999 99-99"
			placeholder="+7 (999) 999 99-99"
		/>
	</label>
</template>
