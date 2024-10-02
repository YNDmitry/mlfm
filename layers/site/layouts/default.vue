<script setup lang="ts"></script>
<template>
	<div id="page-wrapper" class="flex min-h-screen flex-col overflow-x-clip">
		<Header />
		<main id="main-wrapper">
			<slot />
		</main>
		<Footer />
		<ClientOnly>
			<LazyTheWhatsapp />
			<LazyPopupsTheNewsletter />
		</ClientOnly>
	</div>
</template>
