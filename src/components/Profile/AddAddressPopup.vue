<script lang="ts" setup>
	const userStore = useUserStore()

	const isDone = ref(false)
</script>

<template>
	<Dialog
		v-model:visible="userStore.isChangeAddressesPopup"
		modal
		:pt="{
			root: 'max-w-[500px] min-w-[500px]',
		}"
	>
		<template #header>
			<div class="text-[1rem] font-bold">Добавление нового адреса</div>
		</template>
		<form></form>
	</Dialog>
</template>
