import { z } from "zod"
import { registerFormSchema } from "../schemas/registerFormSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"

type RegisterFormDataType = z.infer<typeof registerFormSchema>

interface AdressType {
  localidade: string
  logradouro: string
}

export const useSubmitForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset
  } = useForm<RegisterFormDataType>({
    resolver: zodResolver(registerFormSchema),
  })

  const handleSubmitForm = async (data: RegisterFormDataType) => {
    try {
      setIsLoading(true)
      const res = await fetch(
        'https://apis.codante.io/api/register-user/register',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        }
      )

      if (res.status === 200) {
        setModalIsOpen(true)
        reset()
      }

      const result = await res.json()
      console.log("response", result)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const zipCode = watch('zipcode')

  useEffect(() => {
    if (zipCode && zipCode.length === 9) {
      fetchAddress(zipCode).then((data) => {
        setValue('address', data.logradouro)
        setValue('city', data.localidade)
      })

      return
    }

    setValue('address', '')
    setValue('city', '')
  }, [zipCode, setValue])

  const fetchAddress = async (zipcode: string): Promise<AdressType> => {
    const data = await(await fetch(
      `https://viacep.com.br/ws/${zipcode}/json/`
    )).json()

    return data
  }

  const togleModal = () => setModalIsOpen(!modalIsOpen)

  return {
    register,
    errors,
    handleSubmit,
    handleSubmitForm,
    isLoading,
    modalIsOpen,
    togleModal,
  }
}