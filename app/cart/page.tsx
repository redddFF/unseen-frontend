'use client'

import { GlobalNav } from '@/components/GlobalNav'
import { GlobalFooter } from '@/components/GlobalFooter'
import { useCart } from '@/lib/cart-context'
import { UnseenLogo } from '@/components/UnseenLogo'
import Link from 'next/link'

export default function CartPage() {
  const { state, removeItem, updateQuantity } = useCart()

  const shippingCost = state.itemCount > 0 ? 25 : 0
  const total = state.totalPrice + shippingCost

  return (
    <main style={{ backgroundColor: 'var(--bg-primary)' }}>
      <GlobalNav />

      <section className="min-h-screen pt-24 pb-12 px-6 md:px-8">
        {state.items.length === 0 ? (
          // Empty State
          <div className="flex flex-col items-center justify-center min-h-96 gap-8">
            <div className="opacity-5">
              <UnseenLogo variant="white" size="large" useLineMask={false} />
            </div>
            <p className="text-13 font-mono" style={{ color: 'var(--text-tertiary)' }}>NOTHING HERE YET.</p>
            <Link
              href="/"
              className="text-11 font-mono tracking-widest border px-6 py-3 transition-all"
              style={{ color: 'var(--text-primary)', borderColor: 'var(--text-primary)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#0000ff'
                e.currentTarget.style.color = '#0000ff'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--text-primary)'
                e.currentTarget.style.color = 'var(--text-primary)'
              }}
            >
              CONTINUE SHOPPING
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
            {/* Cart Items */}
            <div className="w-full lg:w-3/5">
              <h1 className="text-4xl font-black uppercase mb-8" style={{ color: 'var(--text-primary)' }}>
                CART
              </h1>

              <div className="flex flex-col">
                {state.items.map((item, idx) => (
                  <div key={item.id}>
                    <div className="flex gap-6 py-8">
                      {/* Image */}
                      <div
                        className="w-24 h-24 flex-shrink-0 border"
                        style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-primary)' }}
                      />

                      {/* Item Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="text-14 font-black uppercase" style={{ color: 'var(--text-primary)' }}>
                            {item.name}
                          </h3>
                          <p className="text-11 font-mono tracking-widest mt-1" style={{ color: 'var(--text-tertiary)' }}>
                            SIZE: {item.size}
                          </p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3 border w-fit" style={{ borderColor: 'var(--border-primary)' }}>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-3 py-1 text-14"
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
                          <span className="px-4 py-1 text-11 font-mono tracking-widest" style={{ color: 'var(--text-primary)' }}>
                            {String(item.quantity).padStart(2, '0')}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-3 py-1 text-14"
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

                      {/* Price & Remove */}
                      <div className="flex flex-col items-end justify-between">
                        <p className="text-11 font-mono tracking-widest" style={{ color: 'var(--text-secondary)' }}>
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="transition-colors text-14"
                          style={{ color: 'var(--text-tertiary)' }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = '#ff1a1a'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = 'var(--text-tertiary)'
                          }}
                        >
                          ×
                        </button>
                      </div>
                    </div>
                    {idx < state.items.length - 1 && (
                      <div className="border-b" style={{ borderColor: 'var(--border-primary)' }} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="w-full lg:w-2/5 h-fit">
              <div className="border-l pl-8 sticky top-24" style={{ borderColor: 'var(--border-primary)' }}>
                <h2 className="text-2xl font-black uppercase mb-8" style={{ color: 'var(--text-primary)' }}>
                  ORDER SUMMARY
                </h2>

                <div className="flex flex-col gap-4 mb-8 pb-8 border-b" style={{ borderColor: 'var(--border-primary)' }}>
                  <div className="flex justify-between text-13" style={{ color: 'var(--text-secondary)' }}>
                    <span>Subtotal</span>
                    <span>${state.totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-13" style={{ color: 'var(--text-secondary)' }}>
                    <span>Shipping</span>
                    <span>${shippingCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-13" style={{ color: 'var(--text-secondary)' }}>
                    <span>Tax</span>
                    <span>Calculated at checkout</span>
                  </div>
                </div>

                <div className="flex justify-between text-14 font-black mb-8" style={{ color: 'var(--text-primary)' }}>
                  <span>TOTAL</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <Link href="/checkout">
                  <button 
                    className="w-full py-4 px-6 font-mono tracking-widest uppercase font-bold transition-all duration-300 border"
                    style={{
                      fontSize: 'var(--text-mono)',
                      fontWeight: 'var(--text-mono-weight)',
                      backgroundColor: 'var(--text-primary)',
                      color: 'var(--bg-primary)',
                      borderColor: 'var(--text-primary)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent'
                      e.currentTarget.style.color = '#0000ff'
                      e.currentTarget.style.borderColor = '#0000ff'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--text-primary)'
                      e.currentTarget.style.color = 'var(--bg-primary)'
                      e.currentTarget.style.borderColor = 'var(--text-primary)'
                    }}
                  >
                    Proceed to Checkout
                  </button>
                </Link>

                <p className="text-10 font-mono tracking-widest mt-6" style={{ color: 'var(--text-tertiary)' }}>
                  Free shipping on orders over $500
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      <GlobalFooter />
    </main>
  )
}
