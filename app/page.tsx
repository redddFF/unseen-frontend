import { GlobalNav } from '@/components/GlobalNav'
import { GlobalFooter } from '@/components/GlobalFooter'
import { HeroSection } from '@/components/HeroSection'
import { ProductTeaserSection } from '@/components/ProductTeaserSection'
import { EditorialStrip } from '@/components/EditorialStrip'
import { ManifestoSection } from '@/components/ManifestoSection'

export default function Home() {
  return (
    <main style={{ backgroundColor: 'var(--bg-primary)' }}>
      <GlobalNav />
      <HeroSection />
      <ProductTeaserSection />
      <EditorialStrip />
      <ManifestoSection />
      <GlobalFooter />
    </main>
  )
}
