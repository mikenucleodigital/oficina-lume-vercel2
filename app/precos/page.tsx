import type { Metadata } from 'next'
import { PricingPage } from '@/components/pricing-page'

export const metadata: Metadata = { title: 'Preços e serviços' }

export default function PrecosPage() {
  return <PricingPage />
}
