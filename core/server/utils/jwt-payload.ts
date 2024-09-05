import {jwtDecode} from 'jwt-decode'

export function jwtPayload(token: string): any {
	const payloadObject = jwtDecode(token)

	return payloadObject
}
