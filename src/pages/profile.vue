<script setup lang="ts">
	import {gql} from 'nuxt-graphql-request/utils'

	const {$graphql} = useNuxtApp()
	const userStore = useUserStore()

	const toast = useToast()

	definePageMeta({
		middleware: ['auth'],
	})

	useSeoMeta({
		title: 'Профиль | MLFM',
		ogTitle: 'Профиль | MLFM',
	})

	const {isMobile} = useDevice()

	const token = useCookie('directus_token')

	const activeOrders = ref([])
	const completedOrders = ref([])

	const fetchOrders = async () => {
		const query = gql`
			query Orders {
				customer_orders {
					id
					order_number
					status
					date_created
				}
			}
		`
		try {
			const data: any = await $graphql.profile.request(
				query,
				{},
				{authorization: `Bearer ${token.value}`},
			)
			if (data?.customer_orders.length) {
				activeOrders.value = data.customer_orders.filter(
					(order: any) => order.status !== 'completed',
				)
				completedOrders.value = data.customer_orders.filter(
					(order: any) => order.status === 'completed',
				)
			}
		} catch (error) {
			console.error(error)
		}
	}
	fetchOrders()
</script>
<template>
	<div>
		<Toast group="bt" />
		<ProfileUpdateUserDetailsPopup />
		<ProfileAddAddressPopup />
		<section class="pb-16 pt-20 max-tablet:pt-11">
			<ProfileDesktopHead v-if="!isMobile" />
			<ProfileMobileHead v-else />
		</section>
		<section class="pb-44">
			<div class="container">
				<Accordion value="0">
					<AccordionPanel value="0">
						<AccordionHeader :pt="{root: 'py-4'}"
							>Активные заказы</AccordionHeader
						>
						<AccordionContent>
							<div
								v-if="!activeOrders.length"
								class="flex flex-col items-center justify-center gap-5 py-6 text-center"
							>
								<span>Здесь будет список активных заказов</span>
								<NuxtLink
									to="/catalog"
									class="flex h-11 w-full max-w-[10.625rem] items-center justify-center rounded-main bg-red2 font-montserrat text-[0.75rem] font-bold uppercase tracking-[3px] text-primary transition-colors hover:bg-red2-hover"
									>Каталог</NuxtLink
								>
							</div>
							<div v-else class="flex flex-col gap-4">
								<div
									v-for="order in activeOrders"
									:key="order.id"
									class="flex items-center justify-between rounded-main border-gray2 px-6 py-3 last:border-b-0 hover:bg-third/20"
								>
									<div>
										Заказ: {{ order.order_number }} от
										{{ new Date(order.date_created).toLocaleDateString() }}
									</div>
									<NuxtLink
										:to="{
											path: `/orders/${order.id}`,
										}"
										class="rounded-main bg-red2 px-3 py-2 text-[.75rem] text-primary"
										>Перейти к заказу</NuxtLink
									>
								</div>
							</div>
						</AccordionContent>
					</AccordionPanel>
					<AccordionPanel value="1">
						<AccordionHeader :pt="{root: 'py-4'}"
							>Выполненные заказы</AccordionHeader
						>
						<AccordionContent>
							<div
								v-if="!completedOrders.length"
								class="flex flex-col items-center justify-center gap-5 py-6 text-center"
							>
								<span>Здесь будет список выполненных заказов</span>
								<NuxtLink
									to="/catalog"
									class="flex h-11 w-full max-w-[10.625rem] items-center justify-center rounded-main bg-red2 font-montserrat text-[0.75rem] font-bold uppercase tracking-[3px] text-primary transition-colors hover:bg-red2-hover"
									>Каталог</NuxtLink
								>
							</div>
							<div v-else class="flex flex-col gap-4">
								<div
									v-for="order in completedOrders"
									:key="order.id"
									class="flex items-center justify-between rounded-main border-gray2 px-6 py-3 last:border-b-0 hover:bg-third/20"
								>
									<div>
										Заказ: {{ order.order_number }} от
										{{ new Date(order.date_created).toLocaleDateString() }}
									</div>
									<NuxtLink
										:to="{
											path: `/orders/${order.id}`,
										}"
										class="rounded-main bg-red2 px-3 py-2 text-[.75rem] text-primary"
										>Перейти к заказу</NuxtLink
									>
								</div>
							</div>
						</AccordionContent>
					</AccordionPanel>
				</Accordion>
			</div>
		</section>
	</div>
</template>
