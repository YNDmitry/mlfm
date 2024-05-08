import {describe, it, expect, beforeEach, afterEach, vi} from 'vitest'
import {setActivePinia, createPinia} from 'pinia'
import {useUserStore} from '../stores/user'
import {createDirectusMocks, setupServer} from './mocks/directus'

const server = setupServer(...createDirectusMocks())

describe('useUserStore', () => {
	beforeEach(() => {
		setActivePinia(createPinia())
		server.listen()
	})

	afterEach(() => {
		server.resetHandlers()
		server.close()
	})

	it('creates a new user and logs them in', async () => {
		const userStore = useUserStore()
		await userStore.create(
			'test@example.com',
			'password',
			'Test',
			'User',
			true,
			false,
		)
		expect(userStore.isAuthenticated).toBe(true)
	})

	it('logs in an existing user', async () => {
		const userStore = useUserStore()
		await userStore.userLogin('test@example.com', 'password')
		expect(userStore.isAuthenticated).toBe(true)
	})

	it('fetches user information correctly', async () => {
		const userStore = useUserStore()
		await userStore.getUserInfo()
		expect(userStore.firstName).toBe('Test')
		expect(userStore.email).toBe('test@example.com')
	})

	it('updates user information', async () => {
		const userStore = useUserStore()
		await userStore.updateUserInfo('Updated', 'User', '1234567890')
		expect(userStore.firstName).toBe('Updated')
		expect(userStore.lastName).toBe('User')
	})

	it('handles user logout', async () => {
		const userStore = useUserStore()
		await userStore.logOut()
		expect(userStore.isAuthenticated).toBe(false)
	})
})
