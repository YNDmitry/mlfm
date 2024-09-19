export interface Product {
	id?: string
	title?: string
	slug?: string
	description?: string
	brand?: {
		title?: string
	}
	main_image?: {
		id?: string
	}
	images?: {
		directus_files_id?: {
			id: string
		}
	}
	material?: {
		title: string
	}
	stone?: {
		title: string
	}
	category?: {
		title?: string
		size_table: {
			id: string
		}
	}
	product_variants: ProductVariant[]
	product_upsells?: ProductUpsells[]
}

interface ProductUpsells {
	related_products_id: {
		id: string
		slug: string
		title: string
		main_image: {
			id: string
		}
		product_variants: [
			{
				price: number
			},
		]
	}
}

interface ProductVariant {
	id?: string
	color_id?: {title: string}
	size_id?: {small_title: string}
	availability?: string
	price?: number
	image?: {id: string} // Add image if variants have images
}
