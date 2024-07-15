import { Check } from "lucide-react"

type ModalTypes = {
  isClosed: boolean
  onClose: () => void
}

export function Modal({ isClosed, onClose }: ModalTypes) {
  return (
    <div className={`${isClosed ? "hidden" : "fixed"} inset-0 bg-black bg-opacity-50 flex items-center justify-center`}>
      <div className="relative bg-white pt-16 pb-8 px-4 rounded shadow-lg w-[350px] flex flex-col justify-center items-center before:w-[90%] before:h-8 before:bg-green-400 before:absolute before:-bottom-3 before:z-[-1] before:rounded-lg">
        <div className='shadow-lg absolute bg-green-400 rounded-full w-20 h-20 flex items-center justify-center px-4 py-4 -top-10'>
          <Check className='text-white w-11 h-11'/>
        </div>

        <p className='text-slate-600'>Sucesso!</p>
        <h4 className="text-xl font-bold text-gray-600">Usuário Cadastrado</h4>
        <button
          className="mt-3 bg-green-400 font-semibold text-white rounded-xl px-4 hover:bg-green-500 transition-colors"
          onClick={onClose}
        >
          Ok
        </button>
      </div>
    </div>
  )
}
