import Link from 'next/link'
import { ArrowLeft, Bike } from 'lucide-react'

export default function NotFound() {
  return <main className="paper-grain flex min-h-[65vh] items-center justify-center px-5 py-20"><div className="max-w-[560px] text-center"><span className="mx-auto flex size-16 items-center justify-center rounded-full bg-secondary text-primary"><Bike size={28} /></span><p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.2em] text-terracotta">404 · Caminho sem saída</p><h1 className="font-editorial mt-3 text-5xl leading-none tracking-[-0.06em] md:text-7xl">Esta página<br /><span className="italic text-terracotta">furou o pneu.</span></h1><p className="mx-auto mt-5 max-w-[380px] text-sm leading-6 text-muted-foreground">Não encontrámos o caminho que procura. Volte ao início e seguimos juntos.</p><Link href="/" className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground"><ArrowLeft size={15} />Voltar ao início</Link></div></main>
}
