<template>
	<NuxtLink
		v-tooltip="{
			value: 'Есть вопрос?',
			showDelay: 300,
			pt: {
				text: 'text-[0.625rem] mr-2',
			},
		}"
		class="fixed right-3 bottom-3 flex items-center gap-3 hover:scale-110 transition-all"
	>
		<IconsWhatsApp
			class="w-[3.5rem] h-[3.5rem] bg-[#25D366] p-2 rounded-[100%]"
		/>
	</NuxtLink>
</template>
