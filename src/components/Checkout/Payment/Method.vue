<script setup lang="ts"></script>

<template>
	<div class="max-tablet:pt-[2rem] tablet:pt-[3.125rem]">
		<h2
			class="pb-[2rem] text-h2 max-tablet:pb-[24px] max-tablet:text-h2Mob max-tablet:font-medium"
		>
			Способ оплаты
		</h2>
		<div class="flex flex-col max-tablet:gap-[12px] tablet:gap-[1.25rem]">
			<CheckoutPaymentOption id="radio-3" name="payment" label="СПБ" checked />
			<CheckoutPaymentOption
				id="radio-4"
				name="payment"
				label="Банковская карта"
			/>
			<CheckoutPaymentOption id="radio-5" name="payment" label="Долями" />
			<CheckoutPaymentOption id="radio-6" name="payment" label="SberPay" />
			<CheckoutPaymentOption id="radio-7" name="payment" label="TinkoffPay" />
		</div>
	</div>
</template>
