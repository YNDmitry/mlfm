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
	isEmailVerify: boolean
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
		isAuthenticated: false,
		isChangeUserInfoPopup: false,
		isEmailVerify: false,
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

			await $directus.request(createUser(userPayload))
			await createUser(userPayload)
			await login({email: mail, password: password})

			await this.getUserInfo()
		},

		async userLogin(email: string, password: string) {
			const {login} = useDirectusAuth()
			const err = ref('')
			try {
				await login({email: email, password: password})
				await this.getUserInfo()
				await navigateTo('/profile')
			} catch (error: any) {
				err.value = error ?? {}
				console.log(error.errors)
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
			}).then(() => {
				this.getUserInfo()
			})
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
			logout().then(() => {
				navigateTo('/auth/log-in')
			})
			this.$reset()
		},

		handleChangeUserDetailsPopup() {
			this.isChangeUserInfoPopup = !this.isChangeUserInfoPopup
		},
	},
})
