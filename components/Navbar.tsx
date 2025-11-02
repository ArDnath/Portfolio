"use client"

import React from 'react'
import { ThemeToggle } from './ThemeSwitch/ThemeToggleClient'
import Image from 'next/image'

export default function Navbar() {
  return (
    <nav className="sticky top-3 z-50 flex items-center justify-between max-w-3xl mx-auto  mt-5 border-3 p-2 rounded-full px-10">
      <div className="rounded-full overflow-hidden h-12 w-12">
        <Image
        src="/Portfolioicon.png"
        width={50}
        height={50}
        alt="Portfolio Icon"
        />
      </div>
      <div className='flex gap-4'>
        
        <a
            href="https://github.com/ArDnath"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform duration-300 hover:scale-110"
          >
            <svg
              className="w-5 h-8 fill-current dark:text-gray-300 hover:text-blue-300 dark:hover:text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M12 .297C5.373.297 0 5.67 0 12.297c0 5.304 3.438 9.799 8.207 11.387.6.11.793-.26.793-.577v-2.235c-3.338.724-4.033-1.416-4.033-1.416-.547-1.387-1.334-1.757-1.334-1.757-1.09-.745.083-.729.083-.729 1.205.084 1.84 1.235 1.84 1.235 1.07 1.835 2.807 1.305 3.49.998.108-.775.42-1.305.763-1.605-2.665-.305-5.466-1.333-5.466-5.933 0-1.312.47-2.385 1.235-3.227-.125-.305-.535-1.53.116-3.184 0 0 1.007-.322 3.3 1.23a11.45 11.45 0 0 1 3-.405c1.02.006 2.04.138 3 .405 2.29-1.552 3.295-1.23 3.295-1.23.654 1.654.244 2.88.12 3.184.77.842 1.23 1.915 1.23 3.227 0 4.61-2.807 5.624-5.48 5.92.43.375.81 1.1.81 2.22v3.293c0 .32.19.693.8.574C20.565 22.09 24 17.6 24 12.297 24 5.67 18.627.297 12 .297z" />
            </svg>
          </a>
          <ThemeToggle />
      </div>
    </nav>
  )
}
