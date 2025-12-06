import React from 'react'

function CardTitle({ name }: { name: string }) {
  return (
    <div className='inline-flex w-full items-center gap-4'>
      <span className='whitespace-nowrap text-2xl font-medium'>
        {name}
      </span>
      <div className='mt-1 w-full h-0.5 bg-neutral-100 dark:bg-neutral-700'></div>
    </div>
  )
}

export default CardTitle
