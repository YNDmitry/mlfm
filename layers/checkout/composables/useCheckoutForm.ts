import {boolean, object, string} from 'yup'
import {useForm} from 'vee-validate'

export const useCheckoutForm = (devDefaultValues: any) => {
	const schema = object({
		firstName: string().required('Обязательное поле'),
		lastName: string().required('Обязательное поле'),
		thirdName: string().required('Обязательное поле'),
		email: string()
			.email('Введите валидный email')
			.required('Обязательное поле'),
		phone: string()
			.matches(/^\+7 \(\d{3}\) \d{3} \d{2}-\d{2}$/, 'Обязательное поле')
			.required('Обязательное поле'),
		deliveryType: string()
			.oneOf(['delivery', 'self-delivery'])
			.default('delivery')
			.notRequired(),
		city: string().when('deliveryType', {
			is: (value: string) => value === 'delivery',
			then: () => string().required('Обязательное поле'),
			otherwise: () => string().notRequired(),
		}),
		street: string().when('deliveryType', {
			is: (value: string) => value === 'delivery',
			then: () => string().required('Обязательное поле'),
			otherwise: () => string().notRequired(),
		}),
		home: string().when('deliveryType', {
			is: (value: string) => value === 'delivery',
			then: () => string().required('Обязательное поле'),
			otherwise: () => string().notRequired(),
		}),
		entrance: string().when('deliveryType', {
			is: (value: string) => value === 'delivery',
			then: () => string().required('Обязательное поле'),
			otherwise: () => string().notRequired(),
		}),
		apartment: string().when('deliveryType', {
			is: (value: string) => value === 'delivery',
			then: () => string().required('Обязательное поле'),
			otherwise: () => string().notRequired(),
		}),
		postCode: string().when('deliveryType', {
			is: (value: string) => value === 'delivery',
			then: () => string().required('Обязательное поле'),
			otherwise: () => string().notRequired(),
		}),
		comment: string(),
		paymentMethod: string().oneOf([
			'sbp',
			'bank_card',
			'sberbank',
			'tinkoff_bank',
		]),
		offer: boolean()
			.required('Нужно обязательно подтвердить')
			.oneOf([true], 'Нужно обязательно подтвердить'),
	})

	const {handleSubmit, resetForm, errors, values} = useForm({
		validationSchema: schema,
		initialValues: {
			deliveryType: 'delivery',
			offer: false,
			...devDefaultValues,
		},
	})

	return {
		handleSubmit,
		errors,
		values,
	}
}
