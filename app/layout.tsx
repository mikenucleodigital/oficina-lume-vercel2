import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Toaster } from 'sonner'
import './globals.css'

const shopName = process.env.NEXT_PUBLIC_SHOP_NAME || 'Oficina Lume'

export const metadata: Metadata = {
  metadataBase: new URL('https://oficinalume.pt'),
  title: {
    default: `${shopName} — Oficina de bicicletas em Lisboa`,
    template: `%s | ${shopName}`,
  },
  description: 'Reparação de bicicletas com cuidado, transparência e tempo para cada detalhe. Estamos no coração de Lisboa, no Intendente.',
  generator: 'v0.app',
  openGraph: {
    title: `${shopName} — Bicicletas com nova vida`,
    description: 'Uma oficina de bairro para quem prefere seguir caminho.',
    locale: 'pt_PT',
    type: 'website',
    images: [{ url: '/oficina-lume-workshop.png', width: 1536, height: 1024, alt: 'Mãos de mecânico a afinar uma bicicleta na Oficina Lume' }],
  },
  icons: { icon: '/icon.svg', apple: '/apple-icon.png' },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f7f5ef' },
    { media: '(prefers-color-scheme: dark)', color: '#17241e' },
  ],
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-PT" suppressHydrationWarning>
      <body className="antialiased">
        <SiteHeader shopName={shopName} />
        {children}
        <SiteFooter shopName={shopName} />
        <Toaster position="bottom-right" richColors />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
