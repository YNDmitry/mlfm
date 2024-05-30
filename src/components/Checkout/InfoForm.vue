<template>
	<div class="pb-[3.75rem]">
		<div class="container laptop:max-w-[512px]">
			<form class="pt-8" @submit.prevent="submitForm">
				<CheckoutFields />
				<CheckoutDeliveryOptions
					:deliveryType="deliveryType"
					@updateOption="deliveryType === !deliveryType"
				/>
				<CheckoutDeliveryAddress v-if="!deliveryType" />
				<CheckoutOrderComment />
				<CheckoutPaymentMethod />
				<CheckoutSubmitButton />
			</form>
		</div>
	</div>
</template>

<script setup lang="ts">
	const props = defineProps({
		deliveryType: Boolean,
	})
	const emit = defineEmits(['submit'])

	const submitForm = () => {
		emit('submit')
	}
</script>
