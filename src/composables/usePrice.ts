export const usePrice = (currentPrice: any) => {
	const price = computed(() =>
		Intl.NumberFormat('ru-RU', {
			style: 'currency',
			currency: 'RUB',
			maximumSignificantDigits: 3
		}).format(currentPrice || 0),
	)

	return price
}
