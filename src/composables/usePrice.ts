export const usePrice = (currentPrice: any) => {
	const price = computed(() =>
		Intl.NumberFormat('ru-RU', {
			style: 'currency',
			currency: 'RUB',
		}).format(currentPrice || 0),
	)

	return price
}
