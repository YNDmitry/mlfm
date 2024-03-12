<template>
	<div id="page-wrapper" class="flex min-h-screen flex-col">
		<Header />
		<main id="main-wrapper">
			<slot />
		</main>
		<Footer />
		<TheWhatsapp />
	</div>
</template>
