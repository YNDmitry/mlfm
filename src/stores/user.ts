import {updateMe, login} from '@directus/sdk'
import {defineStore} from 'pinia'
import {useNuxtApp} from '#app'

interface UserState {
	firstName: string
	lastName: string
	email: string
	id: string
	isAuthenticated: boolean
	newsletter: boolean
	phone: string
	isChangeUserInfoPopup: boolean
}

interface CreateUserPayload {
	email: string
	password: string
	first_name: string
	last_name: string
	terms: boolean
	role: string
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
	}),
	actions: {
		async create(
			mail: string,
			password: string,
			firstName: string,
			lastName: string,
			terms: string,
			newsletter: string,
		) {
			const {createUser, login} = useDirectusAuth()
			const {$directus} = useNuxtApp()

			const userPayload: CreateUserPayload = {
				email: mail,
				password: password,
				role: '6ad231ba-e2d6-48ef-b692-d83625a591b8',
				first_name: firstName,
				last_name: lastName,
				terms: terms,
				newsletter: newsletter,
			}

			await createUser(userPayload)
			await login({email: mail, password: password})

			const user = await useDirectusUser()
			await this.getUserInfo()
		},

		async userLogin(email: string, password: string) {
			const {$directus} = useNuxtApp()
			const err = ref('')
			try {
				$directus.request(login(email, password))
				navigateTo('/profile')
				this.getUserInfo()
			} catch (error) {
				err.value = error.errors
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
