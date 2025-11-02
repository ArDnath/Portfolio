import React from 'react'

function HeroSection() {
  const birthDate = new Date("2002-06-24");
  const today = new Date();
  const age = 
    today.getFullYear() -
    birthDate.getFullYear() -
    (today.getMonth() < birthDate.getMonth() || today.getMonth()=== birthDate.getMonth() && today.getMonth()> birthDate.getMonth()
    ? 1 :0)
  return (
    <div className='flex-col gap-2  pb-8 '>
        <div className='flex flex-col justify-baseline items-baseline gap-2 '>
            <p className='text-3xl'>Hi! I'm <span className="font-bold">Ariyaman Debnath</span>
            
            </p>
            <a href="https://x.com/AriyamanDe12_24" 
            className='flex items-centertext-sm hover:text-blue-500'>
                @AriyamanDe12_24
            </a>
            

        </div>
        <div className="block mt-4 text-gray-400">
            <p>I&apos;m a {age} year old full stack developer</p> 
            <p> 
            <span >
            Right now messing with {" "}
            <a href='https://nextjs.org/' className="text-blue-400 font-semibold animate-pulse">Nextjs</a>,{" "}
            <a href='https://prisma.io/' className="text-orange-400 font-semibold animate-pulse">Prisma</a>,{" "}
            <a href='https://www.typescriptlang.org/' className="text-green-400 font-semibold animate-pulse">TypeScript</a>
            </span > stack 
            and some other toolings :p</p>
        </div>
    </div>
  )
}

export default HeroSection