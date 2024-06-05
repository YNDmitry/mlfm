export default defineEventHandler(async (event) => {
	const body = await readBody(event)
	console.log('Webhook received:', body)
	// Обработка вебхука
	return {status: 'ok'}
})
