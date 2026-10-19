'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, Check, Sparkles } from 'lucide-react'

const plans = [
  { name: 'Básica', monthly: 29, description: 'O essencial para pedalar com confiança.', features: ['Verificação de travões e mudanças', 'Pressão e estado dos pneus', 'Aperto de parafusos principais', 'Lubrificação da transmissão'], recommended: false },
  { name: 'Completa', monthly: 59, description: 'Uma revisão a sério, de ponta a ponta.', features: ['Tudo o que inclui a Básica', 'Afinação completa de mudanças', 'Centragem ligeira das rodas', 'Limpeza da transmissão', 'Relatório de estado detalhado'], recommended: true },
  { name: 'Pro', monthly: 99, description: 'Para quem faz da bicicleta o seu dia a dia.', features: ['Tudo o que inclui a Completa', 'Desmontagem e limpeza profunda', 'Verificação de rolamentos', 'Prioridade na marcação', 'Acompanhamento durante 30 dias'], recommended: false },
]

const faqs = [
  ['Os preços incluem peças?', 'Os valores apresentados cobrem mão de obra e afinações indicadas. Se forem necessárias peças, falamos consigo primeiro e apresentamos o preço antes de avançar.'],
  ['Quanto tempo demora uma revisão?', 'A revisão Básica costuma ficar pronta no próprio dia. Para a Completa e a Pro, contamos normalmente com 1 a 2 dias úteis, consoante a agenda e as peças necessárias.'],
  ['Preciso de marcar?', 'Recomendamos que marque para garantirmos tempo para a sua bicicleta. Se surgir um imprevisto, passe pela oficina — faremos o possível para ajudar.'],
  ['Posso cancelar ou alterar a marcação?', 'Claro. Basta responder à mensagem de confirmação ou ligar-nos com pelo menos 24 horas de antecedência.'],
]

export function PricingPage() {
  const [yearly, setYearly] = useState(false)
  return <main className="mx-auto max-w-[1280px] px-5 pb-24 pt-14 md:px-8 md:pt-20">
    <div className="mx-auto max-w-[720px] text-center"><p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-terracotta">Preços honestos, trabalho cuidado</p><h1 className="font-editorial mt-4 text-5xl leading-[1.02] tracking-[-0.055em] md:text-7xl">Escolha o cuidado<br /><span className="italic text-terracotta">que faz sentido.</span></h1><p className="mx-auto mt-5 max-w-[530px] text-sm leading-6 text-muted-foreground md:text-base">Sem letras pequenas. Cada bicicleta é diferente — falamos consigo antes de qualquer trabalho extra.</p></div>
    <div className="mt-9 flex items-center justify-center gap-3"><span className={!yearly ? 'text-sm font-semibold' : 'text-sm text-muted-foreground'}>Mensal</span><button type="button" role="switch" aria-checked={yearly} aria-label="Alternar faturação anual" onClick={() => setYearly(!yearly)} className={`focus-ring relative h-7 w-[50px] rounded-full transition ${yearly ? 'bg-primary' : 'bg-[#c8c9be]'}`}><span className={`absolute top-1 size-5 rounded-full bg-white shadow transition-all ${yearly ? 'left-[26px]' : 'left-1'}`} /></button><span className={yearly ? 'text-sm font-semibold' : 'text-sm text-muted-foreground'}>Anual</span><span className="rounded-full bg-[#e9e5d6] px-2.5 py-1 text-[10px] font-bold text-primary dark:bg-[#314238]">−15%</span></div>
    <div className="mt-10 grid gap-4 lg:grid-cols-3">{plans.map((plan) => { const displayed = yearly ? Math.round(plan.monthly * 0.85 * 100) / 100 : plan.monthly; return <article key={plan.name} className={`relative flex flex-col rounded-2xl border p-7 md:p-8 ${plan.recommended ? 'border-primary bg-primary text-primary-foreground shadow-xl' : 'border-border bg-card'}`}>
      {plan.recommended && <span className="absolute right-6 top-6 inline-flex items-center gap-1.5 rounded-full bg-[#e8a17e] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-[#28382e]"><Sparkles size={12} /> Mais escolhido</span>}
      <h2 className="font-editorial text-3xl tracking-[-0.04em]">{plan.name}</h2><p className={`mt-2 max-w-[260px] text-sm leading-5 ${plan.recommended ? 'text-primary-foreground/75' : 'text-muted-foreground'}`}>{plan.description}</p>
      <div className="mt-8 flex items-baseline gap-1"><span className="font-editorial text-5xl tracking-[-0.06em]">{displayed.toLocaleString('pt-PT', { maximumFractionDigits: 2 })} €</span><span className={`text-xs ${plan.recommended ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>/ mês</span></div>
      {yearly && <p className={`mt-1 text-xs ${plan.recommended ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>Faturado anualmente · {Math.round(displayed * 12).toLocaleString('pt-PT')} € / ano</p>}
      <div className={`my-6 border-t ${plan.recommended ? 'border-primary-foreground/20' : 'border-border'}`} />
      <ul className="flex flex-1 flex-col gap-3">{plan.features.map((feature) => <li key={feature} className="flex items-start gap-2.5 text-[13px] leading-5"><Check size={15} className={`mt-0.5 shrink-0 ${plan.recommended ? 'text-[#e9a783]' : 'text-terracotta'}`} aria-hidden="true" />{feature}</li>)}</ul>
      <Link href={`/marcar?servico=${encodeURIComponent(plan.name)}`} className={`mt-8 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-semibold transition ${plan.recommended ? 'bg-[#e8a17e] text-[#28382e] hover:bg-[#f0b394]' : 'bg-primary text-primary-foreground hover:opacity-90'}`}>Escolher plano <ArrowRight size={15} /></Link>
    </article>})}</div>
    <section className="mx-auto mt-20 max-w-[760px]"><div className="text-center"><p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-terracotta">Dúvidas frequentes</p><h2 className="font-editorial mt-3 text-4xl tracking-[-0.04em]">Antes de pedalar até cá</h2></div><div className="mt-8">{faqs.map(([question, answer]) => <details key={question} className="group border-b border-border py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-sm font-semibold"><span>{question}</span><span className="font-editorial text-xl text-terracotta transition group-open:rotate-45">+</span></summary><p className="max-w-[660px] pt-3 text-sm leading-6 text-muted-foreground">{answer}</p></details>)}</div></section>
  </main>
}
