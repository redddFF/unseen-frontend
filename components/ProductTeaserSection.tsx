'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect } from 'react'
import { products } from '@/lib/products'
import Reveal from './animations/Reveal'
import { gridElasticity } from '@/lib/motion/gridElasticity'

export function ProductTeaserSection() {
  useEffect(() => {
    gridElasticity('.motion-grid', 10, 4)
  }, [])
  const product = products[0] // PHANTOM CARGO

  return (
    <section className="relative w-full min-h-screen bg-near-black flex items-center">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" />

      <div className="flex flex-col md:flex-row w-full h-full">
        {/* Left Panel - Image */}
        <div className="w-full md:w-3/5 bg-charcoal flex items-center justify-center min-h-[60vh] md:min-h-screen relative overflow-hidden">
          {product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="text-center text-mid-grey text-13">
              <p className="font-mono">PRODUCT VISUAL</p>
            </div>
          )}
        </div>

        {/* Right Panel - Product Info */}
        <div className="w-full md:w-2/5 bg-black px-6 md:px-8 py-12 md:py-0 flex flex-col justify-center gap-8">
          {/* Label */}
          <Reveal delay={0.06}>
            <div>
              <p className="text-10 font-mono tracking-widest text-mid-grey">
                DROP 001 / SS26
              </p>
            </div>
          </Reveal>

          {/* Product Name */}
          <Reveal delay={0.14}>
            <div>
              <h1 className="text-5xl md:text-6xl font-black text-white uppercase leading-tight">
                {product.name}
              </h1>
            </div>
          </Reveal>

          {/* Divider */}
          <div className="w-full h-px bg-charcoal" />

          {/* Price */}
          <div>
            <p className="text-14 font-mono tracking-widest text-light-grey">
               {product.price.toFixed(2)}DT
            </p>
          </div>

          {/* Edition */}
          <div>
            <p className="text-10 font-mono tracking-widest text-mid-grey">
              {product.edition}
            </p>
          </div>

          {/* CTA Button */}
          <Reveal delay={0.22}>
            <Link href={`/product/${product.slug}`}>
              <button className="w-full bg-white text-black py-4 px-6 font-mono text-11 tracking-widest uppercase font-bold hover:bg-transparent hover:text-white hover:border hover:border-white transition-all duration-300">
                View Piece
              </button>
            </Link>
          </Reveal>

          {/* Pieces Available */}
          <div>
            <p className="text-10 font-mono tracking-widest text-dark-grey">
              01 / 01 PIECES
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
