<template>
	<NuxtLink
		v-tooltip="{
			value: 'Есть вопрос?',
			showDelay: 300,
			pt: {
				text: 'text-[0.625rem] mr-2',
			},
		}"
		class="fixed bottom-3 right-3 z-50 flex items-center gap-3 transition-all hover:scale-110"
	>
		<IconsWhatsApp
			class="h-[3.5rem] w-[3.5rem] rounded-[100%] bg-[#25D366] p-2"
		/>
	</NuxtLink>
</template>
