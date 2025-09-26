import * as Yup from 'yup'

export function validarFormSignin() {
  return Yup.object().shape({
    email: Yup.string()
      .email('E-mail inválido')
      .required('Esse campo é obrigatório'),
    password: Yup.string().required('Esse campo é obrigatório'),
  })
}

export function validarFormSignup() {
  return Yup.object().shape({
    name: Yup.string()
      .required('Esse campo é obrigatório')
      .matches(/^[A-Za-zÀ-ÿ\s]+$/, 'Nome inválido')
      .test('has-full-name', 'Nome e sobrenome são obrigatórios', (value) => {
        return value ? value.trim().split(' ').length >= 2 : false
      }),
    email: Yup.string()
      .email('E-mail inválido')
      .required('Esse campo é obrigatório'),
    password: Yup.string().required('Esse campo é obrigatório'),
    password2: Yup.string()
      .min(8, 'Mínimo de 8 caracteres')
      .oneOf([Yup.ref('password'), ''], 'As senhas precisam ser iguais')
      .required('Esse campo é obrigatório'),
  })
}
