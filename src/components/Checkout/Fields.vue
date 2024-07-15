<template>
	<div>
		<h1
			class="pb-[3.125rem] text-h1 max-tablet:pb-[24px] max-tablet:text-h1Mob max-tablet:font-medium"
		>
			Контактная информация
		</h1>
		<div class="flex flex-col gap-[1.25rem]">
			<div class="grid grid-cols-[1fr_1fr] gap-[1.25rem]">
				<CheckoutInputField
					name="firstName"
					label="Имя*"
					placeholder="Введите имя"
				/>
				<CheckoutInputField
					name="lastName"
					label="Фамилия*"
					placeholder="Введите фамилию"
				/>
			</div>
			<CheckoutInputField
				name="thirdName"
				label="Отчество*"
				placeholder="Введите отчество"
			/>
			<CheckoutInputField
				name="email"
				label="Электронная почта (Email)*"
				placeholder="user@gmail.com"
			/>
			<CheckoutPhoneField />
		</div>
	</div>
</template>

<script setup lang="ts"></script>
