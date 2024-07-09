export default defineNuxtRouteMiddleware(async (to, _from) => {
	if (to.query.pin) {
		const product = useState('order-product')
		const isPinValid = useState('isOrderPinValid')
		const orderProducts = useState('order-products')
		const config = useRuntimeConfig()
		const toast = useToast()
		try {
			const res = await fetch(config.public.databaseUrl + 'check-pin', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					id: to.params.id,
					pin: to.query.pin,
				}),
			})

			const data = await res.json()

			if (data.authorized) {
				const currentProducts = await GqlOrderProducts({
					ids: data?.data?.products,
				})
				orderProducts.value = currentProducts.product_variants
				product.value = data.data
				return (isPinValid.value = true)
			} else {
				toast.add({
					severity: 'error',
					detail: 'PIN не валидный. Введите другой',
					summary: 'Неверный PIN',
					life: 3000,
				})
			}
		} catch (error) {
			toast.add({
				severity: 'error',
				detail: 'Что-то пошло не так. Попробуйте ещё раз',
				summary: 'Ошибка',
				life: 3000,
			})
		}
	}
})
