<template>
	<div id="page-wrapper" class="flex min-h-screen flex-col overflow-x-clip">
		<Header />
		<main id="main-wrapper">
			<slot />
		</main>
		<Footer />
		<TheWhatsapp />
		<PopupsTheNewsletter />
	</div>
</template>
