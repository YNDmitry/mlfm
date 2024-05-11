<script setup lang="ts">
	const userStore = useUserStore()
</script>

<template>
	<div class="container">
		<div class="flex items-center justify-between">
			<div class="flex items-center gap-2">
				<!-- Аватар -->
				<div
					class="flex h-10 w-10 items-center justify-center rounded-[100%] bg-red text-[10px] uppercase text-primary"
				>
					<div class="flex gap-1" v-if="!userStore?.isAuthenticated">
						<Skeleton width="25px" height="25px" />
						<Skeleton width="25px" height="25px" />
					</div>
					<span v-else>
						{{ userStore?.firstName[0] + userStore?.lastName[0] || '' }}
					</span>
				</div>
				<!-- /Аватар -->
				<div>{{ userStore.firstName }} {{ userStore.lastName }}</div>
			</div>
			<button type="button" class="h-6 w-6">
				<IconsSettings />
			</button>
		</div>
	</div>
</template>
