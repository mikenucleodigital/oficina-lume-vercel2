import type { Metadata } from 'next'
import { ClientArea } from '@/components/client-area'

export const metadata: Metadata = { title: 'Área de cliente' }

export default function AreaClientePage() {
  return <ClientArea />
}
