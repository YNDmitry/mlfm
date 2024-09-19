import type {Product} from '../types/product.interface'

export const useProductData = (slug: string) => {
	const {$preview} = useNuxtApp()
	const keyPrfx = $preview.value ? `-preview-${slug}` : `-product-${slug}`

	return useAsyncData(
		`catalog-data${keyPrfx}`,
		async () => {
			if ($preview.value) {
				refreshNuxtData()
				const res = await GqlGetProductBySlugPreview({slug})
				return res.products[0] as Product
			} else {
				const res = await GqlGetProductBySlug({
					slug,
					status: 'published',
				})
				return res.products[0] as Product
			}
		},
		{
			getCachedData(key, nuxtApp) {
				return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
			},
		},
	)
}
