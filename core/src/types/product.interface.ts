interface Product {
	id: string
	title: string
	price: number
	description: string
	category: {title: string}
	main_image: {id: string}
	product_variants: Array<{
		color_id: {title: string}
		size_id: {small_title: string}
		quantity: number
	}>
}
