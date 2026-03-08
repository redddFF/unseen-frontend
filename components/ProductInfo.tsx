'use client'

import { useState } from 'react'
import { Product } from '@/lib/products'
import { useCart } from '@/lib/cart-context'
import { useWarningModal } from '@/lib/warning-modal-context'

interface ProductInfoProps {
  product: Product
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)
  const [expandedAccordion, setExpandedAccordion] = useState<string | null>(null)
  const { addItem } = useCart()
  const { showWarning } = useWarningModal()

  const handleAddToCart = () => {
    if (!selectedSize) {
      showWarning({
        title: 'Selection Required',
        message: 'Please select a size before adding this piece to cart.',
        actionLabel: 'Understood',
      })
      return
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      quantity,
      image: product.images[0],
    })

    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
    setSelectedSize(null)
    setQuantity(1)
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Breadcrumb */}
      <div>
        <p className="text-10 font-mono tracking-widest" style={{ color: 'var(--text-tertiary)' }}>
          SHOP / {product.category} / {product.name}
        </p>
      </div>

      {/* Product Name */}
      <div>
        <h1 className="text-5xl md:text-6xl font-black uppercase leading-tight" style={{ color: 'var(--text-primary)' }}>
          {product.name}
        </h1>
      </div>

      {/* Divider */}
      <div className="w-full h-px" style={{ backgroundColor: 'var(--border-primary)' }} />

      {/* Price */}
      <div>
        <p className="text-14 font-mono tracking-widest" style={{ color: 'var(--text-secondary)' }}>
          ${product.price.toFixed(2)}
        </p>
      </div>

      {/* Edition Info */}
      <div>
        <p className="text-10 font-mono tracking-widest" style={{ color: 'var(--text-tertiary)' }}>
          {product.edition}
        </p>
      </div>

      {/* Material Tags */}
      <div className="flex flex-wrap gap-2">
        <span 
          className="px-3 py-1 border text-10 font-mono tracking-widest transition-all cursor-pointer"
          style={{ borderColor: 'var(--border-primary)', color: 'var(--text-secondary)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#0000ff'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border-primary)'
          }}
        >
          {product.material}
        </span>
        <span 
          className="px-3 py-1 border text-10 font-mono tracking-widest transition-all cursor-pointer"
          style={{ borderColor: 'var(--border-primary)', color: 'var(--text-secondary)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#0000ff'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border-primary)'
          }}
        >
          {product.fit}
        </span>
      </div>

      <div className="h-px" style={{ backgroundColor: 'var(--border-primary)' }} />

      {/* Size Selector */}
      <div>
        <label className="block text-10 font-mono tracking-widest mb-4" style={{ color: 'var(--text-tertiary)' }}>
          SELECT SIZE
        </label>
        <div className="grid grid-cols-3 gap-2 md:grid-cols-2 lg:grid-cols-3">
          {product.sizes.map(size => {
            return (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className="h-12 border text-11 font-mono tracking-widest uppercase transition-all"
                style={{
                  borderColor: selectedSize === size ? '#0000ff' : 'var(--border-primary)',
                  borderWidth: '1px',
                  backgroundColor: selectedSize === size ? 'var(--bg-secondary)' : 'transparent',
                  color: selectedSize === size ? 'var(--text-primary)' : 'var(--text-secondary)',
                }}
                onMouseEnter={(e) => {
                  if (selectedSize !== size) {
                    e.currentTarget.style.borderColor = '#0000ff'
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedSize !== size) {
                    e.currentTarget.style.borderColor = 'var(--border-primary)'
                  }
                }}
              >
                {size}
              </button>
            )
          })}
        </div>
      </div>

      {/* Quantity */}
      <div className="flex items-center gap-4">
        <label className="text-10 font-mono tracking-widest" style={{ color: 'var(--text-tertiary)' }}>QTY:</label>
        <div className="flex border" style={{ borderColor: 'var(--border-primary)' }}>
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-3 py-2 text-14 font-mono"
            style={{ color: 'var(--text-secondary)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
            }}
          >
            −
          </button>
          <div
            className="px-4 py-2 text-11 font-mono tracking-widest"
            style={{ color: 'var(--text-primary)', backgroundColor: 'var(--bg-secondary)' }}
          >
            {String(quantity).padStart(2, '0')}
          </div>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-3 py-2 text-14 font-mono"
            style={{ color: 'var(--text-secondary)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
            }}
          >
            +
          </button>
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className={`w-full py-4 px-6 font-mono tracking-widest uppercase font-bold transition-all duration-300 border ${
          addedToCart
            ? 'bg-green-600 text-white border-green-600'
            : ''
        }`}
        style={{
          fontSize: 'var(--text-mono)',
          fontWeight: 'var(--text-mono-weight)',
          backgroundColor: addedToCart ? undefined : 'var(--text-primary)',
          color: addedToCart ? undefined : 'var(--bg-primary)',
          borderColor: addedToCart ? undefined : 'var(--text-primary)',
        }}
        onMouseEnter={(e) => {
          if (!addedToCart) {
            e.currentTarget.style.borderColor = '#0000ff'
            e.currentTarget.style.color = '#0000ff'
            e.currentTarget.style.backgroundColor = 'transparent'
          }
        }}
        onMouseLeave={(e) => {
          if (!addedToCart) {
            e.currentTarget.style.borderColor = 'var(--text-primary)'
            e.currentTarget.style.color = 'var(--bg-primary)'
            e.currentTarget.style.backgroundColor = 'var(--text-primary)'
          }
        }}
      >
        {addedToCart ? 'ADDED ✓' : 'ADD TO CART'}
      </button>

      <div className="h-px" style={{ backgroundColor: 'var(--border-primary)' }} />

      {/* Accordions */}
      <div className="flex flex-col">
        {/* Sizing & Fit */}
        <button
          onClick={() => setExpandedAccordion(expandedAccordion === 'sizing' ? null : 'sizing')}
          className="py-4 flex justify-between items-center border-b"
          style={{ borderColor: 'var(--border-primary)' }}
        >
          <span className="text-11 font-mono tracking-widest" style={{ color: 'var(--text-secondary)' }}>
            SIZING & FIT
          </span>
          <span className={`text-14 transition-transform ${expandedAccordion === 'sizing' ? 'rotate-45' : ''}`}>
            +
          </span>
        </button>
        {expandedAccordion === 'sizing' && (
          <div className="py-4 text-13 max-h-40 overflow-y-auto" style={{ color: 'var(--text-tertiary)' }}>
            <p>All pieces are intentionally oversized for a cinematic silhouette.</p>
            <p className="mt-2">Refer to our size chart for detailed measurements.</p>
          </div>
        )}

        {/* Care Instructions */}
        <button
          onClick={() => setExpandedAccordion(expandedAccordion === 'care' ? null : 'care')}
          className="py-4 flex justify-between items-center border-b"
          style={{ borderColor: 'var(--border-primary)' }}
        >
          <span className="text-11 font-mono tracking-widest" style={{ color: 'var(--text-secondary)' }}>
            CARE INSTRUCTIONS
          </span>
          <span className={`text-14 transition-transform ${expandedAccordion === 'care' ? 'rotate-45' : ''}`}>
            +
          </span>
        </button>
        {expandedAccordion === 'care' && (
          <div className="py-4 text-13 max-h-40 overflow-y-auto" style={{ color: 'var(--text-tertiary)' }}>
            <ul className="list-none">
              {product.care.map((instruction, idx) => (
                <li key={idx} className="py-1">
                  • {instruction}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
