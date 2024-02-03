<script setup>
	const {data} = await useAsyncData(() => {
		const {$preview} = useNuxtApp()
		if ($preview) {
			return {
				page: {
					title: 'Hello preview world',
					description: 'Additional info',
				},
			}
		}

		return {
			page: {
				title: 'Hello world',
			},
		}
	})
</script>

<template>
	<h1>ID</h1>
	<p>{{ data }}</p>
</template>
