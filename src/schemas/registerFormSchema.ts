import { z } from 'zod'

const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

export const registerFormSchema = z.object({
  name: z
    .string()
    .max(255, {message: 'O nome deve ter no máximo 255 caracteres'})
    .min(1, {message: 'O nome é obrigatório'}),
  email: z
    .string()
    .email({message: 'E-mail inválido'})
    .max(255, {message: 'O e-mail deve ter no máximo 255 caracteres'}),
  password: z
    .string()
    .max(255, {message: 'A senha deve ter no máximo 255 caracteres'})
    .min(8, {message: 'A senha deve ter pelo menos 8 caracteres'}),
  password_confirmation: z
  .string()
    .max(255, {message: 'A senha deve ter no máximo 255 caracteres'})
    .min(8, {message: 'A senha deve ter pelo menos 8 caracteres'}),
  terms: z.boolean()
    .refine((terms) => terms, { message: 'Aceite os termos e condições' }),
  phone: z
    .string()
    .max(20, {message: 'O telefone deve ter no máximo 20 caracteres'})
    .min(1, {message: 'O telefone é obrigatório'})
    .regex(/^\(\d{2}\) \d{5}-\d{4}$/, { message: 'Telefone inválido' }),
  cpf: z
    .string()
    .max(14, {message: 'O cpf deve ter no máximo 14 caracteres'})
    .regex(cpfRegex, { message: 'CPF inválido' }),
  zipcode: z
    .string()
    .max(9, {message: 'O CEP deve ter no máximo 9 caracteres'})
    .regex(/^\d{5}-\d{3}$/, { message: 'CEP inválido' }),
  address: z
    .string()
    .max(255, {message: 'O endereço deve ter no máximo 255 caracteres'}),
  city: z
    .string()
    .max(255, {message: 'A cidade deve ter no máximo 255 caracteres'}),
})
.superRefine((data, ctx) => {
  if (data.password !== data.password_confirmation) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'As senhas não são correspondentes',
      path: ['password_confirmation'],
    });
  }
});