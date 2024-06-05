<script setup lang="ts"></script>

<template>
	<div class="max-tablet:pt-[2rem] tablet:pt-[3.125rem]">
		<h2
			class="pb-[2rem] text-h2 max-tablet:pb-[24px] max-tablet:text-h2Mob max-tablet:font-medium"
		>
			Способ оплаты
		</h2>
		<div class="flex flex-col max-tablet:gap-[12px] tablet:gap-[1.25rem]">
			<CheckoutPaymentOption
				name="paymentMethod"
				value="SPB"
				label="СПБ"
				checked
			/>
			<CheckoutPaymentOption
				name="paymentMethod"
				value="Банковская карта"
				label="Банковская карта"
			/>
			<CheckoutPaymentOption
				name="paymentMethod"
				value="Долями"
				label="Долями"
			/>
			<CheckoutPaymentOption
				name="paymentMethod"
				value="SberPay"
				label="SberPay"
			/>
			<CheckoutPaymentOption
				name="paymentMethod"
				value="TinkoffPay"
				label="TinkoffPay"
			/>
		</div>
	</div>
</template>
