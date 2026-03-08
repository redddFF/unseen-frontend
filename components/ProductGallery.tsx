'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Product } from '@/lib/products'

interface ProductGalleryProps {
  product: Product
}

export function ProductGallery({ product }: ProductGalleryProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  return (
    <div className="sticky top-20 flex flex-col gap-4">
      {/* Main Image */}
      <div
        className="aspect-[3/4] flex items-center justify-center border border-blue-600 relative overflow-hidden"
        style={{ borderColor: '#0000ff', backgroundColor: 'var(--bg-secondary)' }}
      >
        {product.images[activeImageIndex] ? (
          <Image
            src={product.images[activeImageIndex]}
            alt={`${product.name} image ${activeImageIndex + 1}`}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <p className="text-13 font-mono" style={{ color: 'var(--text-tertiary)' }}>
            IMAGE PLACEHOLDER
          </p>
        )}

        {/* Image counter */}
        <div className="absolute bottom-4 right-4 text-10 font-mono tracking-widest" style={{ color: 'var(--text-tertiary)' }}>
          0{activeImageIndex + 1} / 0{product.images.length}
        </div>
      </div>

      {/* Thumbnail Strip */}
      <div className="flex gap-1">
        {product.images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveImageIndex(idx)}
            className={`w-20 h-20 border transition-all duration-300 ${
              idx === activeImageIndex
                ? ''
                : ''
            }`}
            style={{
              borderColor: idx === activeImageIndex ? '#0000ff' : undefined,
              borderWidth: '1px',
              backgroundColor: idx === activeImageIndex ? 'var(--bg-secondary)' : 'var(--bg-tertiary)',
            }}
            onMouseEnter={(e) => {
              if (idx !== activeImageIndex) {
                e.currentTarget.style.borderColor = '#0000ff'
              }
            }}
            onMouseLeave={(e) => {
              if (idx !== activeImageIndex) {
                e.currentTarget.style.borderColor = 'var(--border-primary)'
              }
            }}
          >
            {img ? (
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src={img}
                  alt={`${product.name} thumbnail ${idx + 1}`}
                  fill
                  className="object-cover"
                />
                <div
                  className="absolute inset-0 transition-opacity duration-300"
                  style={{ opacity: idx === activeImageIndex ? 0 : 0.35, backgroundColor: 'var(--bg-primary)' }}
                />
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-9 font-mono" style={{ color: 'var(--text-tertiary)' }}>
                {idx + 1}
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
