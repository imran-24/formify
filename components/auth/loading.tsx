import { Loader } from 'lucide-react'
import React from 'react'

export const Loading = () => {
  return (
    <div className='flex items-center justify-center h-full w-full'>
        <Loader className='size-6 animate-spin duration-700 text-neutral-500' />
    </div>
  )
}

