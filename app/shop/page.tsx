import { GlobalNav } from '@/components/GlobalNav'
import { GlobalFooter } from '@/components/GlobalFooter'
import { products } from '@/lib/products'
import Link from 'next/link'

export default function ShopPage() {
  return (
    <main style={{ backgroundColor: 'var(--bg-primary)' }}>
      <GlobalNav />

      <section className="min-h-screen pt-24 pb-12 px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-16">
            <h1 className="text-5xl md:text-6xl font-black uppercase mb-4" style={{ color: 'var(--text-primary)' }}>
              SHOP
            </h1>
            <p className="text-13 font-mono tracking-widest" style={{ color: 'var(--text-secondary)' }}>
              SS26 / AVAILABLE NOW
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map(product => (
              <Link key={product.id} href={`/product/${product.slug}`} className="group">
                {/* Product Card */}
                <div className="flex flex-col gap-4">
                  {/* Image */}
                  <div
                    className="aspect-[3/4] flex items-center justify-center border transition-colors cursor-pointer"
                    style={{
                      backgroundColor: 'var(--bg-secondary)',
                      borderColor: 'var(--border-primary)',
                    }}
                  >
                    <p className="text-13 font-mono" style={{ color: 'var(--text-tertiary)' }}>
                      IMAGE
                    </p>
                  </div>

                  {/* Info */}
                  <div>
                    {/* Category + Edition */}
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-10 font-mono tracking-widest" style={{ color: 'var(--text-tertiary)' }}>
                        {product.category}
                      </p>
                      <p className="text-10 font-mono tracking-widest text-right max-w-32" style={{ color: 'var(--text-tertiary)' }}>
                        {product.edition}
                      </p>
                    </div>

                    {/* Name */}
                    <h3 className="text-16 font-black uppercase mb-2 leading-tight" style={{ color: 'var(--text-primary)' }}>
                      {product.name}
                    </h3>

                    {/* Price */}
                    <p className="text-11 font-mono tracking-widest mb-3" style={{ color: 'var(--text-secondary)' }}>
                      ${product.price.toFixed(2)}
                    </p>

                    {/* Size Info */}
                    <p className="text-10 font-mono tracking-widest" style={{ color: 'var(--text-tertiary)' }}>
                      {product.availableSizes.length} SIZES AVAILABLE
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <GlobalFooter />
    </main>
  )
}
