import React from 'react'

function HeroSection() {
  return (
    <div className='flex-col gap-2 pt-15  pb-8 '>
        <div className='flex justify-baseline items-baseline gap-3'>
            <p className='text-4xl'>Hi! I'm <span className="font-bold">Ariyaman Debnath</span>
            
            </p>
            <a href="https://x.com/AriyamanDe12_24" 
            className='flex items-center gap-1 text-sm hover:text-blue-500'>
                @AriyamanDe12_24
            </a>
            

        </div>
        <div className='pt-4 '>
            <p>I'm a full stack developer</p> 
            <p>Right now messing with <span className='font-bold'>Nextjs, tRPC, Prisma, Typscript</span> stack and some other toolings :p</p>
        </div>
    </div>
  )
}

export default HeroSection