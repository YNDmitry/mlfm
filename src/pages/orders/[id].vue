<script setup lang="ts">
	import {object, string} from 'yup'

	definePageMeta({
		middleware: 'order',
	})

	useSeoMeta({
		title: 'Отслеживание заказа | MLFM',
	})

	const config = useRuntimeConfig()
	const {params} = useRoute()
	const toast = useToast()

	const isPinValid = useState('isOrderPinValid')
	const product = useState('order-product') as any
	const orderProducts = useState('order-products') as any

	const schema = object({
		pin: string()
			.required('Обязательное поле')
			.min(4, 'Минимальная длина 4')
			.max(4, 'Максимальная длина 4')
			.default(''),
	})
	const {isSubmitting, handleSubmit} = useForm({
		validationSchema: schema,
	})

	const checkPin = handleSubmit(async (values) => {
		try {
			const res = await fetch(config.public.databaseUrl + 'check-pin', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					id: params.id,
					pin: values.pin,
				}),
			})

			const data = await res.json()

			if (data.authorized === true) {
				isPinValid.value = true
			} else {
				toast.add({
					severity: 'error',
					detail: 'PIN не валидный либо заказ отсутствует. Введите другой',
					summary: 'Неверный PIN',
					life: 3000,
				})
			}

			const currentProducts = await GqlOrderProducts({
				ids: data?.data?.products,
			})
			orderProducts.value = currentProducts.product_variants
			return (product.value = data.data)
		} catch (error) {
			toast.add({
				severity: 'error',
				detail: 'Что-то пошло не так.',
				summary: 'Ошибка',
				life: 3000,
			})
		}
	})

	const cancelOrder = async () => {
		try {
			const res = await fetch(config.public.databaseUrl + 'cancelPaymentApi', {
				method: 'POST',
				body: JSON.stringify({
					payment_id: params.id,
				}),
			})

			const data = res.json()

			console.log(data)
		} catch (error) {
			toast.add({
				severity: 'error',
				detail: 'Что-то пошло не так.',
				summary: 'Ошибка',
				life: 3000,
			})
		}
	}

	const status = ref([
		{
			id: 0,
			title: 'Создано',
			key: 'created',
		},
		{
			id: 1,
			title: 'Принятно',
			key: 'accepted',
		},
		{id: 2, title: 'В дороге', key: 'in_progress'},
		{id: 3, title: 'Доставлен', key: 'completed'},
	])

	const currentStatus = computed(() => {
		if (product.value) {
			return status.value.findIndex((s) => s.key === product.value.status)
		}
		return -1
	})
</script>

<template>
	<div>
		<Toast position="top-right" />
		<section class="py-12">
			<div class="container mx-auto">
				<OrdersForm
					v-if="!isPinValid"
					:is-submitting="isSubmitting"
					:check-pin="checkPin"
				/>
				<div v-else>
					<!-- Здесь ваш код для отображения коллекции -->
					<div
						class="mx-auto flex w-full max-w-[1000px] justify-between max-tablet:flex-col"
					>
						<div class="w-full max-w-[406px] max-tablet:max-w-none">
							<div
								class="flex justify-between gap-2"
								v-if="product?.status !== 'canceled'"
							>
								<div
									v-for="(item, index) in status"
									:key="item.id"
									class="flex w-[66px] flex-col items-center justify-center text-center"
								>
									<div
										class="flex h-[50px] w-[50px] items-center justify-center rounded-[100%]"
										:class="{
											'bg-[#4ed630]': index <= currentStatus,
											'bg-[#E5EAED]': index > currentStatus,
										}"
									>
										<IconsCheck
											class="h-[12px] w-[12px] text-black"
											:class="{
												'text-primary': index <= currentStatus,
											}"
										/>
									</div>
									<div class="mt-1 flex flex-col justify-center">
										<span class="font-main text-[12px]">{{ item.title }}</span>
									</div>
								</div>
							</div>
							<Message severity="error" v-else>Заказ отменён</Message>
							<Message
								v-if="product?.payment_status === 'in_progress'"
								severity="warn"
								class="my-4"
								:pt="{text: 'text-[0.7rem]'}"
								>Оплата в процессе -
								<NuxtLink
									:to="product?.payment?.confirmation_url"
									target="_blank"
									>Перейти к оплате</NuxtLink
								></Message
							>
							<Message
								v-if="product?.track_code"
								severity="success"
								:pt="{text: 'text-[0.7rem]'}"
								>Трек номер - {{ product?.track_code }}</Message
							>
							<div class="mt-6 flex flex-col items-start justify-start gap-4">
								<div class="grid grid-cols-[150px_1fr] gap-4 text-[12px]">
									<div>ФИО:</div>
									<div>Метелев Дмитрий Сергеевич</div>
								</div>
								<div
									class="grid grid-cols-[150px_1fr] gap-4 text-[12px]"
									v-if="product?.delivery_type === 'delivery'"
								>
									<div>Адрес доставки:</div>
									<div>Москва, Ленина 88</div>
								</div>
								<div class="grid grid-cols-[150px_1fr] gap-4 text-[12px]">
									<div>Номер заказа:</div>
									<div>{{ product?.order_number }}</div>
								</div>
								<button
									type="button"
									class="mt-4 flex items-center justify-center gap-3 rounded-[30px] border px-6 py-3 transition-all hover:bg-red2-hover hover:text-[#fff]"
									v-if="product?.status === 'created'"
								>
									Отменить заказ <iconsClose class="w-[15px]" />
								</button>
							</div>
						</div>
						<div class="w-full max-w-[420px] max-tablet:max-w-none">
							<div class="flex flex-col gap-5 max-tablet:mt-7">
								<article
									v-for="item in orderProducts"
									:key="item"
									class="flex max-mobile:gap-[0.625rem] mobile:gap-[0.938rem]"
								>
									<NuxtImg
										:src="
											$config.public.databaseUrl + 'assets/' + item?.image?.id
										"
										width="130"
										class="object-cover max-mobile:h-[6.25rem] max-mobile:w-[3.813rem] mobile:h-[6.25rem]"
									/>

									<div class="flex w-full items-center justify-between">
										<div class="flex flex-col gap-1">
											<span class="text-[0.625rem]">{{
												item?.product?.category?.title
											}}</span>

											<p class="text-[0.625rem] font-medium">
												{{ item?.product?.title }}
											</p>
										</div>

										<span class="text-[0.625rem]">{{ item?.price }} ₽</span>
									</div>
								</article>
								<div class="flex flex-col gap-3">
									<div class="grid grid-cols-[150px_1fr] gap-2 text-[12px]">
										<div>Скидка:</div>
										<div>1000Р</div>
									</div>
									<div class="grid grid-cols-[150px_1fr] gap-2 text-[12px]">
										<div>Подарочная карта:</div>
										<div>1000Р</div>
									</div>
									<div
										class="grid grid-cols-[150px_1fr] gap-2 text-[12px]"
										v-if="product?.delivery_type === 'delivery'"
									>
										<div>Доставка:</div>
										<div>500Р</div>
									</div>
									<div class="font-medium">
										Итоговая цена: {{ product?.payment?.payment_amount }}Р
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>
