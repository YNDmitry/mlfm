<script lang="ts" setup>
	interface Props {
		brands: any
	}

	const props = defineProps<Props>()
	const route = useRoute()
</script>
<template>
	<div v-auto-animate>
		<p
			v-if="route.query.brand"
			class="mb-[3.75rem] rounded-[12px] border-[1px] border-gray p-[9px] text-[0.625rem] leading-[18px]"
		>
			{{
				brands.find((el: any) => el.title === route.query.brand)?.description
			}}
		</p>
	</div>
</template>

<style></style>
