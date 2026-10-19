import { Suspense } from 'react'
import type { Metadata } from 'next'
import { BookingForm } from '@/components/booking-form'

export const metadata: Metadata = { title: 'Marcar reparação' }

export default function MarcarPage() {
  return <main className="mx-auto max-w-[1280px] px-5 pb-24 pt-14 md:px-8 md:pt-20"><div className="mb-9 max-w-[680px]"><p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-terracotta">Um primeiro passo, sem compromisso</p><h1 className="font-editorial mt-3 text-5xl leading-[1.02] tracking-[-0.055em] md:text-6xl">Vamos pôr a sua<br /><span className="italic text-terracotta">bicicleta a andar.</span></h1><p className="mt-4 max-w-[520px] text-sm leading-6 text-muted-foreground">Conte-nos o que precisa. Entramos em contacto para confirmar o melhor dia e esclarecer qualquer dúvida.</p></div><Suspense fallback={<div className="min-h-[500px] rounded-2xl border border-border bg-card" />}><BookingForm /></Suspense></main>
}
