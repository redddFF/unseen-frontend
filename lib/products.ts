export interface Product {
  id: string
  name: string
  slug: string
  price: number
  edition: string
  material: string
  fit: string
  sizes: string[]
  availableSizes: string[]
  description: string
  care: string[]
  category: string
  images: string[]
}

export const products: Product[] = [
  {
    id: 'phantom-cargo-001',
    name: 'SWEATER EE01',
    slug: 'phantom-cargo',
    price: 285,
    edition: 'LIMITED — 01 / 100',
    material: 'MILITARY RIPSTOP NYLON',
    fit: 'UNISEX OVERSIZED',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    availableSizes: ['S', 'M', 'L', 'XL'],
    description: 'The foundational piece of the UNSEEN aesthetic. Military-grade ripstop nylon crafted in underground production facilities. Each piece carries the weight of intentional design and the mark of limited scarcity.',
    care: [
      'Wash cold water only',
      'Do not tumble dry',
      'Hang dry in darkness',
      'Store flat in cool conditions',
    ],
    category: 'BOTTOMS',
    images: ['/product-1-1.png', '/product-1-2.jpg', '/product-1-3.jpg', '/product-1-4.jpg'],
  },
  {
    id: 'surveillance-hoodie-002',
    name: 'SURVEILLANCE',
    slug: 'surveillance',
    price: 325,
    edition: 'LIMITED — 02 / 100',
    material: 'HEAVYWEIGHT COTTON BLEND',
    fit: 'OVERSIZED',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    availableSizes: ['M', 'L', 'XL'],
    description: 'A statement in stillness. The SURVEILLANCE hoodie reimagines the classic silhouette through a lens of urban minimalism. Reinforced construction. Intentional anonymity.',
    care: [
      'Machine wash cold',
      'Turn inside out before washing',
      'Do not bleach',
      'Lay flat to dry',
    ],
    category: 'TOPS',
    images: ['/product-2-1.jpg', '/product-2-2.jpg', '/product-2-3.jpg', '/product-2-4.jpg'],
  },
  {
    id: 'cipher-tee-003',
    name: 'CIPHER',
    slug: 'cipher',
    price: 95,
    edition: 'LIMITED — 03 / 250',
    material: 'ORGANIC COTTON',
    fit: 'STANDARD',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Minimalist. Understated. Deliberate. The CIPHER tee is the vessel for the UNSEEN philosophy—a blank canvas for individual expression through absence.',
    care: [
      'Gentle wash',
      'Do not wring',
      'Dry in cool environment',
      'Avoid direct sunlight when drying',
    ],
    category: 'TOPS',
    images: ['/product-3-1.jpg', '/product-3-2.jpg', '/product-3-3.jpg', '/product-3-4.jpg'],
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug)
}

export function getAllProducts(): Product[] {
  return products
}
