<template>
	<div>
		<h1
			class="pb-[3.125rem] text-h1 max-tablet:pb-[24px] max-tablet:text-h1Mob max-tablet:font-medium"
		>
			Контактная информация
		</h1>
		<div class="flex flex-col gap-[1.25rem]">
			<div class="grid grid-cols-[1fr_1fr] gap-[1.25rem]">
				<CheckoutInputField label="Имя*" placeholder="Введите имя" />
				<CheckoutInputField label="Фамилия*" placeholder="Введите фамилию" />
			</div>
			<CheckoutInputField
				label="Отчество"
				placeholder="Отчество (опционально)"
			/>
			<CheckoutInputField
				label="Электронная почта (Email)*"
				placeholder="user@gmail.com"
			/>
			<CheckoutPhoneField />
		</div>
	</div>
</template>

<script setup lang="ts"></script>
