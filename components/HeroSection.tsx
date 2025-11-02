import React from 'react';
import Link from 'next/link';

function HeroSection() {
  const birthDate = new Date("2002-06-24");
  const today = new Date();
  const age = 
    today.getFullYear() -
    birthDate.getFullYear() -
    (today.getMonth() < birthDate.getMonth() || today.getMonth()=== birthDate.getMonth() && today.getMonth()> birthDate.getMonth()
    ? 1 :0)
  return (
    <div className='flex-col  mt-2'>
        <div className='flex flex-col justify-baseline items-baseline gap-2 '>
            <p className='text-2xl'>Hi! I&apos;m <span className="font-bold text-4xl">Ariyaman Debnath</span>
            </p>
            
        </div>
        <div className="block mt-4 ">
            <p>I&apos;m a {age} year old full stack developer</p> 
            <p> 
            <span className='text-gray-400'>
            Right now messing with {" "}
            <a href='https://nextjs.org/' className="text-blue-400 font-semibold animate-pulse">Nextjs</a>,{" "}
            <a href='https://prisma.io/' className="text-orange-400 font-semibold animate-pulse">Prisma</a>,{" "}
            <a href='https://www.typescriptlang.org/' className="text-green-400 font-semibold animate-pulse">TypeScript</a>{" "}
            stack and some other toolings
            </span > 
            </p>
        </div>
        <div className="flex items-start mt-3  w-full justify-start flex-col">
          <Link
            href="https://www.x.com/@AriyamanDe12_24/"
            rel="noopener noreferrer"
            target="_blank"
          >
            <div className="flex flex-row items-center justify-start">
              <div className="aspect-square flex-none h-[10px] overflow-hidden relative w-2.5 will-change-transform bg-green-500 rounded-full"></div>
              <div className="flex flex-col justify-start shrink-0 opacity-100 ml-2 ">
                <p className="">Available for new opportunities</p>
              </div>
            </div>
          </Link>
          <br />
        </div>
    </div>
  )
}

export default HeroSection