import type {Product} from '../types/product.interface'

export const useProductVariants = (product: Ref<Product | undefined>) => {
	const variants = computed(() => product.value?.product_variants || [])
	// ...other variant-related logic
	return {variants}
}
