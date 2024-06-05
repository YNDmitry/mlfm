<template>
	<div class="max-tablet:pt-[2rem] tablet:pt-[3.125rem]">
		<h2
			class="pb-[2rem] text-h2 max-tablet:pb-[24px] max-tablet:text-h2Mob max-tablet:font-medium"
		>
			Адрес доставки
		</h2>
		<div class="flex flex-col gap-5">
			<CheckoutInputField name="city" label="Город*" placeholder="Москва" />
			<CheckoutInputField
				name="street"
				label="Улица*"
				placeholder="Ленина 88"
			/>
			<div class="flex gap-[11px]">
				<CheckoutInputField name="home" label="Дом*" placeholder="3" />
				<CheckoutInputField name="entrance" label="Подъезд*" placeholder="1" />
				<CheckoutInputField
					name="apartment"
					label="Квартира*"
					placeholder="51"
				/>
			</div>
			<CheckoutInputField
				name="postCode"
				label="Почтовый индекс*"
				placeholder="000000"
			/>
		</div>
	</div>
</template>
