"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

const Hero = () => {
  const images = [
    "/Hero/Hero.jpg",
    "/Hero/hero2.webp",
    "/Hero/hero3.webp",
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 4500)
    return () => clearInterval(intervalId)
  }, [images.length])

  return (
    <div className='relative w-full h-[85vh] md:h-[120vh]'>
      <div className='absolute inset-0'>
        {images.map((src, idx) => (
          <Image
            key={src}
            src={src}
            alt='Hero background image'
            fill
            priority={idx === 0}
            className={`object-cover object-center transition-opacity duration-700 ease-in-out ${idx === currentIndex ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
      </div>

      <div className='absolute inset-0 bg-black/60' />

      <div className='relative z-10 flex h-full items-center'>
        <div className='w-full text-left pl-6 pr-6 md:pl-16 lg:pl-24 xl:pl-32'>
          <h1 className='text-white font-extrabold leading-tight tracking-tight text-4xl md:text-5xl lg:text-6xl'>
            Best Architecture And
            <br className='hidden md:block' />
            Construction Services
          </h1>

          {/* <p className='mt-6 max-w-3xl text-white/90 text-base md:text-lg'>
            Ensuring designs comply with local building codes, zoning laws, and safety
            standards. Producing detailed drawings and specifications for the construction of the
            building. For More Information Contact us at
          </p> */}

          <div className='mt-6 flex flex-wrap items-center gap-3 md:gap-4'>
            <a
              href='tel:9873824375'
              className='rounded-md bg-amber-600 px-6 py-3 text-white font-semibold shadow hover:bg-amber-700 transition-colors'
            >
              Call Us
            </a>

            <a
              href='tel:9873824375'
              className='rounded-md bg-white/10 px-4 py-2 text-white font-semibold backdrop-blur hover:bg-white/15'
            >
              9873824375
            </a>

            <a
              href='tel:8877096309'
              className='rounded-md bg-white/10 px-4 py-2 text-white font-semibold backdrop-blur hover:bg-white/15'
            >
              8877096309
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero