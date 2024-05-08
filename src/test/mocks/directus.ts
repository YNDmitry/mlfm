import {rest} from 'msw'

export function setupServer(...handlers) {
	return new SetupServer(...handlers)
}

export function createDirectusMocks() {
	return [
		rest.post(process.env.DATABASE_URL + 'users/create', (req, res, ctx) => {
			return res(
				ctx.json({
					id: '123',
					first_name: 'Test',
					last_name: 'User',
					email: 'test@example.com',
				}),
			)
		}),
		rest.post(process.env.DATABASE_URL + 'users/login', (req, res, ctx) => {
			return res(ctx.status(200))
		}),
		// Add more mocks as needed
	]
}
