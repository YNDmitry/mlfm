import {defineStore} from 'pinia'

interface UserState {
	firstName: string
	lastName: string
	email: string
	id: string
	isAuthenticated: boolean
	newsletter: boolean
	phone: string
}

interface CreateUserPayload {
	email: string
	password: string
	first_name: string
	last_name: string
	terms: boolean
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
		newsletter: '',
		phone: '',
		email: '',
		id: '',
		isAuthenticated: false,
	}),
	actions: {
		async create(
			mail: string,
			password: string,
			firstName: string,
			lastName: string,
			terms: string,
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
					updateUser({
						id: this.id,
						user: {
							first_name: firstName,
							last_name: lastName,
							terms: terms,
						},
					})
				})
				.then(() => {
					navigateTo('/profile/')
				})
				.catch((e) => {
					return e.errors
				})
		},

		async userLogin(email: string, password: string) {
			const {login} = useDirectusAuth()
			await login({email, password})
				.then(() => {
					navigateTo('/profile')
					this.getUserInfo()
				})
				.catch((error) => {
					console.log(error)
				})
		},

		async getUserInfo() {
			const user = await useDirectusUser()

			console.log(user.value)

			if (!user.value) {
				return
			}

			this.$patch({
				firstName: user.value.first_name,
				lastName: user.value.last_name,
				newsletter: user.value.newsletter,
				email: user.value.email,
				id: user.value.id,
				isAuthenticated: true,
			})
		},

		async logOut() {
			const {logout} = useDirectusAuth()
			logout().then(() => {
				navigateTo('/auth/log-in')
				this.$patch({
					firstName: '',
					lastName: '',
					email: '',
					id: '',
					isAuthenticated: false,
				})
			})
		},
	},
})
