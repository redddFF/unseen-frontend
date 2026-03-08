import { GlobalNav } from '@/components/GlobalNav'
import { GlobalFooter } from '@/components/GlobalFooter'
import { ProductGallery } from '@/components/ProductGallery'
import { ProductInfo } from '@/components/ProductInfo'
import { getProductBySlug, products } from '@/lib/products'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return products.map(product => ({
    slug: product.slug,
  }))
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params
  const product = getProductBySlug(params.slug)

  if (!product) {
    return {
      title: 'Product Not Found',
    }
  }

  return {
    title: `${product.name} — UNSEEN`,
    description: product.description,
  }
}

export default async function ProductPage(props: PageProps) {
  const params = await props.params
  const product = getProductBySlug(params.slug)

  if (!product) {
    notFound()
  }

  return (
    <main style={{ backgroundColor: 'var(--bg-primary)' }}>
      <GlobalNav />

      {/* Two-Panel Layout */}
      <section className="min-h-screen pt-24 pb-12">
        <div className="flex flex-col lg:flex-row gap-8 px-6 md:px-8">
          {/* Left Panel - Gallery (sticky on desktop) */}
          <div className="w-full lg:w-1/2">
            <ProductGallery product={product} />
          </div>

          {/* Right Panel - Info */}
          <div className="w-full lg:w-1/2 pt-4">
            <ProductInfo product={product} />
          </div>
        </div>
      </section>

      {/* Related Products Section (placeholder) */}
      <section className="border-t px-6 md:px-8 py-16" style={{ borderColor: 'var(--border-primary)' }}>
        <h2 className="text-3xl font-black uppercase mb-8" style={{ color: 'var(--text-primary)' }}>
          OTHER PIECES
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products
            .filter(p => p.id !== product.id)
            .map(p => (
              <a key={p.id} href={`/product/${p.slug}`} className="group">
                <div
                  className="aspect-[3/4] flex items-center justify-center mb-3 transition-colors cursor-pointer"
                  style={{ backgroundColor: 'var(--bg-secondary)' }}
                >
                  <p className="text-13 font-mono" style={{ color: 'var(--text-tertiary)' }}>
                    IMAGE
                  </p>
                </div>
                <h3 className="text-14 font-black uppercase" style={{ color: 'var(--text-primary)' }}>
                  {p.name}
                </h3>
                <p className="text-11 font-mono tracking-widest mt-1" style={{ color: 'var(--text-secondary)' }}>
                  ${p.price.toFixed(2)}
                </p>
              </a>
            ))}
        </div>
      </section>

      <GlobalFooter />
    </main>
  )
}
