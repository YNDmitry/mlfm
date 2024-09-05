import {defineStore} from 'pinia'
import {passwordRequest, createUser} from '@directus/sdk'

interface UserState {
	firstName: string
	lastName: string
	email: string
	id: string
	isAuthenticated: boolean
	newsletter: boolean
	phone: string
	isChangeUserInfoPopup: boolean
	isChangeAddressesPopup: boolean
	isEmailVerify: boolean
	currentOrders: []
	completedOrders: []
	authErrors: {} | null | undefined
}

interface CreateUserPayload {
	email: string
	password: string
	first_name: string
	last_name: string
	terms: boolean
	role: string
	newsletter: boolean
	is_email_verified: boolean
}

export const useUserStore = defineStore('userStore', {
	state: (): UserState => ({
		firstName: '',
		lastName: '',
		newsletter: false,
		phone: '',
		email: '',
		id: '',
		currentOrders: [],
		completedOrders: [],
		isAuthenticated: false,
		isChangeUserInfoPopup: false,
		isChangeAddressesPopup: false,
		isEmailVerify: false,
		authErrors: null,
	}),
	actions: {
		async create(
			mail: string,
			password: string,
			firstName: string,
			lastName: string,
			terms: boolean,
			newsletter: boolean,
		) {
			const {login} = useDirectusAuth()
			const {$directus} = useNuxtApp()

			const userPayload: CreateUserPayload = {
				email: mail,
				password: password,
				role: '6ad231ba-e2d6-48ef-b692-d83625a591b8',
				first_name: firstName,
				last_name: lastName,
				terms: terms,
				newsletter: newsletter,
				is_email_verified: false,
			}

			try {
				await $directus.request(createUser(userPayload))
				await login({email: mail, password: password})

				await this.getUserInfo()
			} catch (error: any) {
				throw error
			}
		},

		async userLogin(email: string, password: string) {
			const {login} = useDirectusAuth()

			try {
				const res = await login({email, password})

				if (res) {
					await this.getUserInfo()
					return await navigateTo('/profile')
				}
			} catch (error) {
				return {message: 'unauthorized'}
			}
		},
		async getUserInfo() {
			const user: any = await useDirectusUser()

			if (!user.value) {
				return
			}

			this.firstName = user?.value.first_name
			this.lastName = user?.value.last_name
			this.newsletter = user?.value.newsletter
			this.email = user?.value.email
			this.id = user?.value.id
			this.isAuthenticated = true
			this.isEmailVerify = user?.value.is_email_verified
			this.phone = user?.value.phone
		},

		async transferGuestSession() {
			const sessionId = localStorage.getItem('sessionId')
			if (sessionId) {
				try {
					const sessionData = await this.fetchSessionData(sessionId)
					await this.saveSessionDataToUser(this.id, sessionData)
					await this.clearGuestSession(sessionId)
					localStorage.removeItem('session_id')
				} catch (error) {
					throw error
				}
			}
		},

		async fetchSessionData(sessionId: string) {
			try {
				const response = await GqlGetSession({id: sessionId})
				return response.guest_session_by_id
			} catch (error) {
				throw error
			}
		},

		async saveSessionDataToUser(userId: string, sessionData: any) {
			const {$directus} = useNuxtApp()
			await $directus.items('directus_users').updateOne(userId, {sessionData})
			// try {

			// } catch (error) {

			// }
		},

		async clearGuestSession(sessionId: string) {
			try {
				await GqlDeleteGuestSessionItem({id: sessionId})
				return
			} catch (error) {
				throw error
			}
		},

		async updateUserInfo(firstName: string, lastName: string, phone: string) {
			const {updateUser} = useDirectusUsers()
			await updateUser({
				id: this.id,
				user: {
					first_name: firstName,
					last_name: lastName,
					phone: phone,
				},
			})
			await this.getUserInfo()
		},

		async updatePassword() {
			const {$directus} = useNuxtApp()
			try {
				await $directus.request(
					passwordRequest(this.email, 'https://mlfm.store/auth/reset-password'),
				)
			} catch (error) {
				console.error(error)
			}
		},

		async logOut() {
			const {logout} = useDirectusAuth()
			logout()
				.then(() => {
					navigateTo('/auth/log-in')
				})
				.then(() => {
					this.$reset()
					this.saveSessionToLocal()
				})
		},

		saveSessionToLocal() {
			const sessionId = this.generateNewSessionId()
			localStorage.setItem('sessionId', sessionId)
		},

		async generateNewSessionId() {
			// Генерация нового session ID
			const res = await GqlCreateGuestSessionItem({
				data: {status: 'draft'},
			})
			const sessionId = res.create_guest_session_item?.id
			return sessionId
		},

		handleChangeUserDetailsPopup() {
			this.isChangeUserInfoPopup = !this.isChangeUserInfoPopup
		},

		handleChangeAddressesPopup() {
			this.isChangeAddressesPopup = !this.isChangeAddressesPopup
		},
	},
})
