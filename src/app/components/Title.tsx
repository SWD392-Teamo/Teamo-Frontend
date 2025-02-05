import React from 'react'

type Props = {
    title: string
    subtitle?: string
}

export default function Title({title, subtitle}: Props) {
  return (
    <div className='text-start'>
        <div className='text-3xl font-bold text-secondary'>
            {title}
        </div>
        <div className='font-light text-grey mt-2'>
            {subtitle}
        </div>
    </div>
  )
}