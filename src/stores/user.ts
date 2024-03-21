import {defineStore} from 'pinia'

interface UserState {
	firstName: string
	lastName: string
	email: string
	id: string
}

interface CreateUserPayload {
	email: string
	password: string
	role: string
}

interface LoginPayload {
	email: string
	password: string
}

// Этот интерфейс может быть расширен в соответствии с вашим API
interface DirectusUser {
	first_name: string
	last_name: string
	email: string
	id: string
}

export const useUserStore = defineStore('userStore', {
	state: (): UserState => ({
		firstName: '',
		lastName: '',
		email: '',
		id: '',
	}),
	actions: {
		async create(
			mail: string,
			password: string,
			firstName: string,
			lastName: string,
		) {
			const {createUser, login} = useDirectusAuth()
			const {updateUser} = useDirectusUsers()

			const userPayload: CreateUserPayload = {
				email: mail,
				password: password,
				role: '6ad231ba-e2d6-48ef-b692-d83625a591b8',
			}

			await createUser(userPayload)
				.then(() => {
					return login({email: mail, password: password})
				})
				.then(() => {
					this.getUserInfo()
					return updateUser({
						id: this.id,
						user: {
							first_name: firstName,
							last_name: lastName,
						},
					})
				})
				.then(() => {
					navigateTo('/profile/')
				})
		},

		async userLogin(email: string, password: string) {
			const {login} = useDirectusAuth()
			await login({email, password})
			navigateTo('/profile')
			this.getUserInfo()
		},

		async getUserInfo() {
			const user: DirectusUser = await useDirectusUser().value
			this.$patch({
				firstName: user.first_name,
				lastName: user.last_name,
				email: user.email,
				id: user.id,
			})
		},
	},
})
