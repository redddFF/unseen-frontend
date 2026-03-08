'use client'

import { GlobalNav } from '@/components/GlobalNav'
import { GlobalFooter } from '@/components/GlobalFooter'
import { useCart } from '@/lib/cart-context'
import { UnseenLogo } from '@/components/UnseenLogo'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useWarningModal } from '@/lib/warning-modal-context'

export default function CheckoutPage() {
  const { state, clearCart } = useCart()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { showWarning } = useWarningModal()

  const shippingCost = state.itemCount > 0 ? 25 : 0
  const total = state.totalPrice + shippingCost

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1500))
    clearCart()
    setIsSubmitting(false)
    showWarning({
      title: 'Order Confirmed',
      message: 'Order placed successfully! (Mock checkout)',
      actionLabel: 'Back To Home',
      onAction: () => router.push('/'),
    })
  }

  return (
    <main style={{ backgroundColor: 'var(--bg-primary)' }}>
      <GlobalNav />

      <section className="min-h-screen pt-24 pb-12 px-6 md:px-8">
        {/* Header */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="flex items-center gap-4 mb-8">
            <UnseenLogo variant="white" size="small" useLineMask={false} />
            <p className="text-10 font-mono tracking-widest" style={{ color: 'var(--text-tertiary)' }}>
              SECURE CHECKOUT
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
          {/* Checkout Form */}
          <div className="w-full lg:w-3/5">
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              {/* Contact Information */}
              <div>
                <h2 className="text-2xl font-black uppercase mb-6" style={{ color: 'var(--text-primary)' }}>
                  CONTACT INFORMATION
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    className="col-span-2 px-4 py-3 border font-mono text-11 outline-none"
                    style={{
                      fontSize: 'var(--text-mono)',
                      fontWeight: 'var(--text-mono-weight)',
                      backgroundColor: 'var(--bg-secondary)',
                      borderColor: 'var(--border-primary)',
                      color: 'var(--text-primary)',
                    }}
                  />
                  <input
                    type="tel"
                    placeholder="Phone"
                    required
                    className="col-span-2 px-4 py-3 border font-mono text-11 outline-none"
                    style={{
                      fontSize: 'var(--text-mono)',
                      fontWeight: 'var(--text-mono-weight)',
                      backgroundColor: 'var(--bg-secondary)',
                      borderColor: 'var(--border-primary)',
                      color: 'var(--text-primary)',
                    }}
                  />
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <h2 className="text-2xl font-black uppercase mb-6" style={{ color: 'var(--text-primary)' }}>
                  SHIPPING ADDRESS
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    required
                    className="px-4 py-3 border font-mono text-11 outline-none"
                    style={{ fontSize: 'var(--text-mono)', fontWeight: 'var(--text-mono-weight)', backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-primary)', color: 'var(--text-primary)' }}
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    required
                    className="px-4 py-3 border font-mono text-11 outline-none"
                    style={{ fontSize: 'var(--text-mono)', fontWeight: 'var(--text-mono-weight)', backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-primary)', color: 'var(--text-primary)' }}
                  />
                  <input
                    type="text"
                    placeholder="Address"
                    required
                    className="col-span-2 px-4 py-3 border font-mono text-11 outline-none"
                    style={{ fontSize: 'var(--text-mono)', fontWeight: 'var(--text-mono-weight)', backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-primary)', color: 'var(--text-primary)' }}
                  />
                  <input
                    type="text"
                    placeholder="City"
                    required
                    className="px-4 py-3 border font-mono text-11 outline-none"
                    style={{ fontSize: 'var(--text-mono)', fontWeight: 'var(--text-mono-weight)', backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-primary)', color: 'var(--text-primary)' }}
                  />
                  <input
                    type="text"
                    placeholder="State / Province"
                    required
                    className="px-4 py-3 border font-mono text-11 outline-none"
                    style={{ fontSize: 'var(--text-mono)', fontWeight: 'var(--text-mono-weight)', backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-primary)', color: 'var(--text-primary)' }}
                  />
                  <input
                    type="text"
                    placeholder="Postal Code"
                    required
                    className="col-span-2 px-4 py-3 border font-mono text-11 outline-none"
                    style={{ fontSize: 'var(--text-mono)', fontWeight: 'var(--text-mono-weight)', backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-primary)', color: 'var(--text-primary)' }}
                  />
                  <input
                    type="text"
                    placeholder="Country"
                    required
                    className="col-span-2 px-4 py-3 border font-mono text-11 outline-none"
                    style={{ fontSize: 'var(--text-mono)', fontWeight: 'var(--text-mono-weight)', backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-primary)', color: 'var(--text-primary)' }}
                  />
                </div>
              </div>

              {/* Payment Information */}
              <div>
                <h2 className="text-2xl font-black uppercase mb-6" style={{ color: 'var(--text-primary)' }}>
                  PAYMENT
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Card Number"
                    maxLength="19"
                    required
                    className="col-span-2 px-4 py-3 border font-mono text-11 outline-none"
                    style={{ fontSize: 'var(--text-mono)', fontWeight: 'var(--text-mono-weight)', backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-primary)', color: 'var(--text-primary)' }}
                  />
                  <input
                    type="text"
                    placeholder="MM / YY"
                    maxLength="5"
                    required
                    className="px-4 py-3 border font-mono text-11 outline-none"
                    style={{ fontSize: 'var(--text-mono)', fontWeight: 'var(--text-mono-weight)', backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-primary)', color: 'var(--text-primary)' }}
                  />
                  <input
                    type="text"
                    placeholder="CVC"
                    maxLength="3"
                    required
                    className="px-4 py-3 border font-mono text-11 outline-none"
                    style={{ fontSize: 'var(--text-mono)', fontWeight: 'var(--text-mono-weight)', backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-primary)', color: 'var(--text-primary)' }}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || state.items.length === 0}
                className="w-full py-4 px-6 font-mono tracking-widest uppercase font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border"
                style={{
                  fontSize: 'var(--text-mono)',
                  fontWeight: 'var(--text-mono-weight)',
                  backgroundColor: 'var(--text-primary)',
                  color: 'var(--bg-primary)',
                  borderColor: 'var(--text-primary)',
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitting && state.items.length > 0) {
                    e.currentTarget.style.backgroundColor = 'transparent'
                    e.currentTarget.style.color = '#0000ff'
                    e.currentTarget.style.borderColor = '#0000ff'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSubmitting && state.items.length > 0) {
                    e.currentTarget.style.backgroundColor = 'var(--text-primary)'
                    e.currentTarget.style.color = 'var(--bg-primary)'
                    e.currentTarget.style.borderColor = 'var(--text-primary)'
                  }
                }}
              >
                {isSubmitting ? 'PROCESSING...' : 'PLACE ORDER'}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-2/5 h-fit">
            <div className="border-l pl-8 sticky top-24" style={{ borderColor: 'var(--border-primary)' }}>
              <h2 className="text-2xl font-black uppercase mb-8" style={{ color: 'var(--text-primary)' }}>
                ORDER REVIEW
              </h2>

              {/* Items */}
              <div className="flex flex-col gap-4 mb-8 pb-8 border-b max-h-80 overflow-y-auto" style={{ borderColor: 'var(--border-primary)' }}>
                {state.items.map(item => (
                  <div key={item.id} className="flex justify-between">
                    <div>
                      <p className="text-13" style={{ color: 'var(--text-primary)' }}>{item.name}</p>
                      <p className="text-10 font-mono" style={{ color: 'var(--text-tertiary)' }}>
                        {item.size} × {item.quantity}
                      </p>
                    </div>
                    <p className="text-13" style={{ color: 'var(--text-secondary)' }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Totals */}
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
                  <span>$0.00</span>
                </div>
              </div>

              <div className="flex justify-between text-14 font-black" style={{ color: 'var(--text-primary)' }}>
                <span>TOTAL</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <GlobalFooter />
    </main>
  )
}
