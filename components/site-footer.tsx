import Link from 'next/link'
import { ArrowUpRight, Clock3, MapPin } from 'lucide-react'

export function SiteFooter({ shopName }: { shopName: string }) {
  const phone = process.env.NEXT_PUBLIC_SHOP_PHONE || '+351 213 456 789'
  return (
    <footer className="bg-[#20372c] text-[#f5f2e9]">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-5 py-14 md:grid-cols-[1.3fr_1fr_1fr] md:px-8 md:py-16">
        <div><Link href="/" className="font-editorial text-[30px] tracking-[-0.04em] text-[#f5f2e9]">{shopName}</Link><p className="mt-4 max-w-[300px] text-sm leading-6 text-[#d2d8cf]">Bicicletas bem cuidadas, conversas sem pressa e Lisboa vista ao ritmo certo.</p><a href={`tel:${phone.replaceAll(' ', '')}`} className="mt-5 inline-flex items-center gap-2 text-sm text-[#e5aa8d]">{phone}<ArrowUpRight size={14} aria-hidden="true" /></a></div>
        <div><h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#b9c5b8]">Encontre-nos</h2><p className="mt-5 flex items-start gap-3 text-sm leading-6 text-[#f5f2e9]"><MapPin size={17} className="mt-1 shrink-0 text-[#e5aa8d]" aria-hidden="true" />Rua do Forno do Tijolo, 38<br />1170-132 Lisboa</p></div>
        <div><h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#b9c5b8]">Horário da oficina</h2><p className="mt-5 flex items-start gap-3 text-sm leading-6 text-[#f5f2e9]"><Clock3 size={17} className="mt-1 shrink-0 text-[#e5aa8d]" aria-hidden="true" /><span>Segunda a sexta · 09:00–18:30<br />Sábado · 10:00–14:00<br />Domingo · fechado</span></p><div className="mt-5 flex gap-5 text-xs text-[#c2cdc1]"><Link href="/precos" className="hover:text-white">Preços</Link><Link href="/sobre" className="hover:text-white">Sobre nós</Link><Link href="/marcar" className="hover:text-white">Marcar</Link></div></div>
      </div>
      <div className="border-t border-white/15"><div className="mx-auto flex max-w-[1280px] flex-col gap-2 px-5 py-5 text-[11px] text-[#b9c5b8] sm:flex-row sm:items-center sm:justify-between md:px-8"><span>© {new Date().getFullYear()} {shopName}. Feito com cuidado em Lisboa.</span><span>Uma oficina independente, desde 2018.</span></div></div>
    </footer>
  )
}
