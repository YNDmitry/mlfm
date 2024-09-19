<script setup lang="ts">
	import type {NuxtError} from '#app'

	const props = defineProps({
		error: Object as () => NuxtError,
	})

	const handleError = () => clearError({redirect: '/'})

	useHead({
		title: `${props.error?.statusMessage} | MLFM`,
	})
</script>

<template>
	<div>
		<NuxtLayout>
			<div class="container">
				<div class="py-12 text-center">
					<h1 class="text-h1">{{ error?.statusCode }}</h1>
					<p class="mb-6 mt-2">{{ error?.message }}</p>
					<div class="mx-auto mt-2 block w-full">
						<button
							@click="handleError"
							class="rounded-main bg-red2 px-4 py-3 font-montserrat text-[0.75rem] font-bold uppercase tracking-[3px] text-primary transition-colors hover:bg-red2-hover"
						>
							Вернуться на главную
						</button>
					</div>
				</div>
			</div>
		</NuxtLayout>
	</div>
</template>
