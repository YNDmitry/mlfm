import {ref, computed} from 'vue'
import {useAsyncData} from '#imports'

export function useProducts(
	filters: any,
	currentPage: any,
	currentLimit: any,
	currentSort: any,
) {
	const {data: products, refresh} = useAsyncData('products', () => {
		const filterObj = Object.keys(filters).reduce((acc, key) => {
			if (filters[key]) {
				acc[key] = filters[key]
			}
			return acc
		}, {})
		return GqlProducts({
			page: currentPage.value + 1,
			limit: currentLimit.value,
			sort:
				currentSort?.value.length === 0
					? ['-date_created']
					: currentSort.value?.code,
			filter: filterObj,
		})
	})

	return {
		products,
		refresh,
	}
}
