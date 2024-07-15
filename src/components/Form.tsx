import { EyeIcon, LoaderCircle } from 'lucide-react'
import { useState } from 'react'
import { EyeOffIcon } from 'lucide-react'
import { Modal } from './modal'
import { useSubmitForm } from '../hooks/useSubmitForm'

export default function Form() {
  const [showPassword, setShowPassword] = useState(false)
  
  const {
    register,
    errors,
    handleSubmit,
    handleSubmitForm,
    isLoading,
    modalIsOpen,
    togleModal
  } = useSubmitForm()

  return (
    <>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <div className="mb-4">
          <label htmlFor="name">Nome Completo</label>
          <input
            type="text"
            id="name"
            placeholder='Jhon Doe'
            {...register('name')}
          />
          {/* Sugestão de exibição de erro de validação */}
          <div className="min-h-4">
            <p className="text-xs text-red-400 mt-1">{errors.name?.message}</p>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="email">E-mail</label>
          <input type="email" id="email" placeholder='email@email.com' {...register('email')}/>
          <div className="min-h-4">
            <p className="text-xs text-red-400 mt-1">{errors.email?.message}</p>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="password">Senha</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              {...register('password')}
            />
            <span className="absolute right-3 top-3">
              {!showPassword ? (
                <EyeIcon
                size={20}
                className="text-slate-600 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
              ) : (
                <EyeOffIcon
                  className="text-slate-600 cursor-pointer"
                  size={20}
                  onClick={() => setShowPassword(!showPassword)}
                />   
              )}
            
            </span>
            <div className="min-h-4">
              <p className="text-xs text-red-400 mt-1">{errors.password?.message}</p>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="confirm-password">Confirmar Senha</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="confirm-password"
              {...register('password_confirmation')}
            />
            <span className="absolute right-3 top-3">
              {!showPassword ? (
                <EyeIcon
                  size={20}
                  className="text-slate-600 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}  
                />  
              ) : (
                <EyeOffIcon
                  className="text-slate-600 cursor-pointer"
                  size={20}
                  onClick={() => setShowPassword(!showPassword)}  
                />
              )}
            </span>
            <div className="min-h-4">
              <p className="text-xs text-red-400 mt-1">{errors.password_confirmation?.message}</p>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="phone">Telefone Celular</label>
          <input type="text" id="phone" placeholder='(00) 00000-0000' {...register('phone')}/>
          <div className="min-h-4">
            <p className="text-xs text-red-400 mt-1">{errors.phone?.message}</p>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="cpf">CPF</label>
          <input type="text" id="cpf" placeholder='000.000.000-00' {...register('cpf')}/>
          <div className="min-h-4">
            <p className="text-xs text-red-400 mt-1">{errors.cpf?.message}</p>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="cep">CEP</label>
          <input type="text" id="cep" placeholder='00000-000' {...register('zipcode')}/>
          <div className="min-h-4">
            <p className="text-xs text-red-400 mt-1">{errors.zipcode?.message}</p>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="address">Endereço</label>
          <input
            className="disabled:bg-slate-200"
            type="text"
            id="address"
            disabled
            {...register('address')}
          />
          <div className="min-h-4">
            <p className="text-xs text-red-400 mt-1">{errors.address?.message}</p>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="city">Cidade</label>
          <input
            className="disabled:bg-slate-200"
            type="text"
            id="city"
            disabled
            {...register('city')}
          />
          <div className="min-h-4">
            <p className="text-xs text-red-400 mt-1">{errors.city?.message}</p>
          </div>
        </div>
        {/* terms and conditions input */}
        <div className="mb-4">
          <input type="checkbox" id="terms" className="mr-2 accent-slate-500" {...register('terms')}/>
          <label
            className="text-sm  font-light text-slate-500 mb-1 inline"
            htmlFor="terms"
          >
            Aceito os{' '}
            <span className="underline hover:text-slate-900 cursor-pointer">
              termos e condições
            </span>
          </label>
          <div className="min-h-4">
            <p className="text-xs text-red-400 mt-1">{errors.terms?.message}</p>
          </div>
        </div>

        <button
          type="submit"
          className={`${isLoading ? 'cursor-not-allowed opacity-50' : ''} flex items-center justify-center bg-slate-500 font-semibold text-white w-full rounded-xl p-4 mt-10 hover:bg-slate-600 transition-colors`}
          disabled={isLoading}
        >
          {isLoading ? (
           <LoaderCircle className='animate-spin'/>
          ) : (
            'Cadastrar'
          )}
        </button>
      </form>
      <Modal isClosed={!modalIsOpen} onClose={togleModal}/>
    </>
  )
}
