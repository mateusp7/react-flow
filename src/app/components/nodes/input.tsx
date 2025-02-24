import { ComponentProps } from 'react'

interface InputProps extends ComponentProps<'input'> {
  label?: string
}

const Input = ({ className, label, type = 'text', ...props }:InputProps) => {
  return (
    <div>
      <label htmlFor={props.id} className='block text-sm font-medium text-gray-700'>
        {label}
      </label>
      <input 
        type={type} 
        name={props.id} 
        id={props.id} 
        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'></input>
    </div>
  )
}

export default Input