import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown, ArrowRight, ArrowUpRight, Bike, Check, Clock3, Heart, Wrench } from 'lucide-react'

const services = [
  { number: '01', icon: Wrench, title: 'Revisão com calma', description: 'Travões, mudanças, rodas e tudo o que mantém a sua bicicleta pronta para o próximo passeio.', note: 'A partir de 29 €' },
  { number: '02', icon: Bike, title: 'Reparações do dia a dia', description: 'Um furo a meio do caminho? Uma corrente que pede atenção? Tratamos do essencial sem complicar.', note: 'Orçamento antes de avançar' },
  { number: '03', icon: Heart, title: 'Bicicletas com história', description: 'Damos uma segunda vida às bicicletas que merecem continuar a contar histórias pelas ruas de Lisboa.', note: 'Restauro e afinação' },
]

const steps = [
  { number: '01', title: 'Conte-nos o que se passa', description: 'Marque online ou passe por cá. Queremos ouvir a história da sua bicicleta.' },
  { number: '02', title: 'Receba um plano claro', description: 'Vemos tudo consigo e explicamos o que faz falta — sem surpresas no fim.' },
  { number: '03', title: 'Volte à estrada', description: 'Quando estiver pronta, recebe uma mensagem. Só falta escolher o caminho.' },
]

const testimonials = [
  { quote: 'Deram uma nova vida à minha pasteleira. Já voltou a subir a Graça sem protestar.', name: 'Inês M.', detail: 'Bicicleta urbana · Intendente' },
  { quote: 'Explicaram tudo antes de mexer em qualquer coisa. É raro encontrar este cuidado.', name: 'Tiago R.', detail: 'Gravel · Arroios' },
  { quote: 'A minha bicicleta ficou pronta no próprio dia. E ainda saí com dicas para a próxima volta.', name: 'Marta C.', detail: 'Elétrica · Anjos' },
]

export default function HomePage() {
  const shopName = process.env.NEXT_PUBLIC_SHOP_NAME || 'Oficina Lume'
  return (
    <main>
      <section className="paper-grain overflow-hidden">
        <div className="mx-auto grid max-w-[1280px] items-center gap-10 px-5 pb-16 pt-12 md:grid-cols-[0.92fr_1.08fr] md:px-8 md:pb-24 md:pt-16">
          <div className="relative z-10 max-w-[560px]">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground"><span className="size-1.5 rounded-full bg-terracotta" /> Lisboa · Intendente</div>
            <h1 className="font-editorial text-[clamp(3.45rem,7.4vw,6.5rem)] leading-[0.92] tracking-[-0.065em] text-foreground">A cidade é sua.<br /><span className="italic text-terracotta">A bicicleta também.</span></h1>
            <p className="mt-7 max-w-[430px] text-base leading-7 text-muted-foreground md:text-[17px]">Reparamos bicicletas com tempo, cuidado e conversa. Para que Lisboa continue a ser melhor sobre duas rodas.</p>
            <div className="mt-8 flex flex-wrap items-center gap-3"><Link href="/marcar" className="inline-flex items-center gap-3 rounded-full bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5"><Wrench size={16} aria-hidden="true" />Marcar reparação<ArrowUpRight size={15} aria-hidden="true" /></Link><Link href="/precos" className="rounded-full border border-border px-6 py-4 text-sm font-semibold text-foreground transition hover:bg-muted">Ver serviços e preços</Link></div>
            <div className="mt-11 flex items-center gap-4"><div className="flex -space-x-2"><span className="flex size-9 items-center justify-center rounded-full border-2 border-background bg-[#d2a78c] text-[10px] font-bold text-white">IM</span><span className="flex size-9 items-center justify-center rounded-full border-2 border-background bg-[#80917b] text-[10px] font-bold text-white">TR</span><span className="flex size-9 items-center justify-center rounded-full border-2 border-background bg-[#c57a61] text-[10px] font-bold text-white">MC</span></div><div><p className="text-sm font-semibold">Mais de 1.200 bicicletas felizes</p><p className="mt-0.5 text-xs text-muted-foreground">O bairro também gosta de pedalar.</p></div></div>
          </div>
          <div className="relative min-h-[390px] md:min-h-[590px]">
            <div className="absolute -right-10 top-7 h-[78%] w-[78%] rounded-[48%_48%_8px_8px] bg-[#e7e2d4] md:right-0" />
            <div className="absolute right-0 top-0 h-[94%] w-[94%] overflow-hidden rounded-[48%_48%_8px_8px] md:right-5">
              <Image src="/oficina-lume-workshop.png" alt="Mecânico a afinar uma bicicleta clássica na oficina" fill priority sizes="(max-width: 768px) 100vw, 55vw" className="object-cover object-center" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#17261e]/45 via-transparent to-transparent" />
              <div className="absolute bottom-7 right-7 max-w-[260px] text-right text-white"><p className="font-editorial text-2xl italic">Feito à mão. Feito para durar.</p><p className="mt-2 text-[11px] uppercase tracking-[0.15em] text-white/75">Oficina aberta desde 2018</p></div>
            </div>
            <div className="absolute bottom-2 left-0 flex items-center gap-3 rounded-2xl border border-border/60 bg-card p-4 shadow-lg md:bottom-8"><span className="flex size-10 items-center justify-center rounded-full bg-[#e6e8df] text-primary"><Clock3 size={18} aria-hidden="true" /></span><div><p className="text-xs font-semibold">Pequenas reparações</p><p className="mt-1 text-[11px] text-muted-foreground">Muitas vezes no próprio dia</p></div></div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-card">
        <div className="mx-auto grid max-w-[1280px] gap-7 px-5 py-7 sm:grid-cols-3 md:px-8">
          {[['01', 'Transparência sempre', 'Sabe o que vamos fazer e quanto custa.'], ['02', 'Peças que respeitam', 'Escolhemos soluções duráveis e sensatas.'], ['03', 'Bairro, perto de si', 'No Intendente, a poucos minutos de casa.']].map(([n, title, text]) => <div key={n} className="flex gap-4"><span className="font-editorial text-xl italic text-terracotta">{n}</span><div><p className="text-sm font-semibold">{title}</p><p className="mt-1 text-xs leading-5 text-muted-foreground">{text}</p></div></div>)}
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-5 py-20 md:px-8 md:py-28">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-terracotta">O que fazemos</p><h2 className="font-editorial mt-4 max-w-[570px] text-4xl leading-[1.05] tracking-[-0.045em] md:text-6xl">Pequenos cuidados.<br />Grandes caminhos.</h2></div><p className="max-w-[360px] text-sm leading-6 text-muted-foreground">Da revisão mais simples a uma bicicleta que precisa de recomeçar, fazemos cada trabalho como se fosse nosso.</p></div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">{services.map(({ number, icon: Icon, title, description, note }) => <article key={number} className="group rounded-2xl border border-border bg-card p-7 transition hover:-translate-y-1 hover:shadow-lg md:p-8"><div className="flex items-center justify-between"><span className="font-editorial text-sm italic text-terracotta">{number}</span><span className="flex size-11 items-center justify-center rounded-full bg-muted text-primary"><Icon size={19} aria-hidden="true" /></span></div><h3 className="font-editorial mt-8 text-[26px] tracking-[-0.03em]">{title}</h3><p className="mt-3 min-h-[72px] text-sm leading-6 text-muted-foreground">{description}</p><div className="mt-6 flex items-center justify-between border-t border-border pt-5"><span className="text-[11px] font-medium text-muted-foreground">{note}</span><Link href="/precos" aria-label={`Saber mais sobre ${title}`} className="text-terracotta transition group-hover:translate-x-1"><ArrowRight size={18} /></Link></div></article>)}</div>
      </section>

      <section className="bg-[#e9e7dd] dark:bg-[#202f26]">
        <div className="mx-auto grid max-w-[1280px] gap-12 px-5 py-20 md:grid-cols-[0.85fr_1.15fr] md:px-8 md:py-24">
          <div><p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-terracotta">Sem complicações</p><h2 className="font-editorial mt-4 text-4xl leading-[1.05] tracking-[-0.045em] md:text-5xl">Como funciona</h2><p className="mt-5 max-w-[340px] text-sm leading-6 text-muted-foreground">Uma oficina de bairro deve ser simples. Chega, falamos, resolvemos.</p><Link href="/marcar" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary">Vamos começar <ArrowRight size={16} /></Link></div>
          <div className="flex flex-col">{steps.map((step, i) => <div key={step.number} className={`flex gap-5 py-6 ${i < steps.length - 1 ? 'border-b border-foreground/10' : ''}`}><span className="font-editorial flex size-11 shrink-0 items-center justify-center rounded-full border border-foreground/20 text-sm italic text-terracotta">{step.number}</span><div><h3 className="font-editorial text-2xl tracking-[-0.03em]">{step.title}</h3><p className="mt-2 max-w-[430px] text-sm leading-6 text-muted-foreground">{step.description}</p></div></div>)}</div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-5 py-20 md:px-8 md:py-28">
        <div className="flex items-end justify-between"><div><p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-terracotta">Palavra de quem pedala</p><h2 className="font-editorial mt-4 text-4xl tracking-[-0.045em] md:text-5xl">Do bairro, com carinho.</h2></div><span className="hidden text-sm text-muted-foreground sm:block">★★★★★ <span className="ml-2 text-foreground">4,9 / 5</span></span></div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">{testimonials.map((item) => <figure key={item.name} className="rounded-2xl border border-border bg-card p-7"><span aria-label="5 em 5 estrelas" className="text-sm tracking-[0.15em] text-terracotta">★★★★★</span><blockquote className="font-editorial mt-5 text-[21px] leading-[1.35] tracking-[-0.02em]">“{item.quote}”</blockquote><figcaption className="mt-7 border-t border-border pt-5"><p className="text-sm font-semibold">{item.name}</p><p className="mt-1 text-xs text-muted-foreground">{item.detail}</p></figcaption></figure>)}</div>
      </section>

      <section className="mx-5 mb-20 overflow-hidden rounded-[28px] bg-primary text-primary-foreground md:mx-auto md:mb-28 md:max-w-[1216px]">
        <div className="flex flex-col gap-8 px-7 py-10 md:flex-row md:items-center md:justify-between md:px-14 md:py-12"><div><p className="text-[10px] font-semibold uppercase tracking-[0.2em] opacity-70">A sua bicicleta merece</p><h2 className="font-editorial mt-3 max-w-[650px] text-3xl leading-tight tracking-[-0.04em] md:text-5xl">Um cuidado de cada vez. Um caminho de cada vez.</h2></div><Link href="/marcar" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#e7a17f] px-6 py-4 text-sm font-semibold text-[#26372d] transition hover:bg-[#f0b394]">Marcar agora <ArrowUpRight size={16} /></Link></div>
      </section>
      <span className="sr-only">{shopName}</span>
    </main>
  )
}
