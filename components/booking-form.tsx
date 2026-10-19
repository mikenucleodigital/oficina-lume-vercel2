'use client'

import { useEffect, useState, type FormEvent } from 'react'
import { useSearchParams } from 'next/navigation'
import { z } from 'zod'
import { toast } from 'sonner'
import { ArrowRight, CalendarDays, CheckCircle2, Clock3 } from 'lucide-react'
import { saveBookings, type Booking } from '@/lib/bookings'

const schema = z.object({
  name: z.string().trim().min(2, 'Indique o seu nome (pelo menos 2 caracteres).'),
  email: z.email('Introduza um endereço de email válido.'),
  phone: z.string().trim().min(9, 'Introduza um número de telefone válido.').max(20, 'Número de telefone demasiado longo.').regex(/^[+\d\s().-]+$/, 'Use apenas números e símbolos habituais.'),
  bikeType: z.string().min(1, 'Escolha o tipo de bicicleta.'),
  service: z.string().min(1, 'Escolha o serviço pretendido.'),
  date: z.string().min(1, 'Escolha uma data.').refine((date) => date >= new Date().toLocaleDateString('sv-SE'), 'Escolha uma data igual ou posterior a hoje.'),
  notes: z.string().max(500, 'As notas não podem exceder 500 caracteres.'),
})

type FormValues = z.infer<typeof schema>
const initialValues: FormValues = { name: '', email: '', phone: '', bikeType: '', service: '', date: '', notes: '' }
const inputClass = 'focus-ring w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70'
const labelClass = 'mb-2 block text-xs font-semibold text-foreground'

export function BookingForm() {
  const searchParams = useSearchParams()
  const [values, setValues] = useState<FormValues>(initialValues)
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({})
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const service = searchParams.get('servico')
    if (service && ['Básica', 'Completa', 'Pro'].includes(service)) setValues((current) => ({ ...current, service }))
  }, [searchParams])

  function update<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((current) => ({ ...current, [key]: value }))
    setErrors((current) => ({ ...current, [key]: undefined }))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const result = schema.safeParse(values)
    if (!result.success) {
      const nextErrors: Partial<Record<keyof FormValues, string>> = {}
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof FormValues
        if (!nextErrors[field]) nextErrors[field] = issue.message
      }
      setErrors(nextErrors)
      toast.error('Há alguns campos a rever.')
      return
    }
    const booking: Booking = { ...result.data, id: crypto.randomUUID(), status: 'Recebida', createdAt: new Date().toISOString() }
    const existing = JSON.parse(window.localStorage.getItem('oficina-lume-bookings') || '[]') as Booking[]
    saveBookings([booking, ...existing])
    setValues(initialValues)
    setErrors({})
    setSent(true)
    toast.success('Pedido enviado. Falamos consigo em breve.')
  }

  return <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
    <form onSubmit={handleSubmit} noValidate className="rounded-2xl border border-border bg-card p-6 md:p-9">
      <div className="mb-7"><h2 className="font-editorial text-3xl tracking-[-0.04em]">Conte-nos sobre a sua bicicleta</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">Respondemos normalmente no próprio dia útil.</p></div>
      {sent && <div role="status" className="mb-6 flex items-start gap-3 rounded-xl border border-[#aab99f] bg-[#e8ede5] p-4 text-sm text-[#264336] dark:bg-[#2b4032] dark:text-[#eaf0e6]"><CheckCircle2 size={18} className="mt-0.5 shrink-0" /><span><strong>Pedido recebido.</strong> A sua marcação fica guardada neste dispositivo. Em breve entraremos em contacto para confirmar.</span></div>}
      <div className="grid gap-x-5 gap-y-5 sm:grid-cols-2">
        <div><label className={labelClass} htmlFor="name">Nome completo</label><input id="name" name="name" autoComplete="name" value={values.name} onChange={(event) => update('name', event.target.value)} placeholder="Como se chama?" aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined} className={inputClass} />{errors.name && <p id="name-error" className="mt-1.5 text-xs text-destructive">{errors.name}</p>}</div>
        <div><label className={labelClass} htmlFor="email">Email</label><input id="email" name="email" type="email" autoComplete="email" value={values.email} onChange={(event) => update('email', event.target.value)} placeholder="ola@exemplo.pt" aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined} className={inputClass} />{errors.email && <p id="email-error" className="mt-1.5 text-xs text-destructive">{errors.email}</p>}</div>
        <div><label className={labelClass} htmlFor="phone">Telefone</label><input id="phone" name="phone" type="tel" autoComplete="tel" value={values.phone} onChange={(event) => update('phone', event.target.value)} placeholder="+351 912 345 678" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'phone-error' : undefined} className={inputClass} />{errors.phone && <p id="phone-error" className="mt-1.5 text-xs text-destructive">{errors.phone}</p>}</div>
        <div><label className={labelClass} htmlFor="bikeType">Tipo de bicicleta</label><select id="bikeType" name="bikeType" value={values.bikeType} onChange={(event) => update('bikeType', event.target.value)} aria-invalid={!!errors.bikeType} aria-describedby={errors.bikeType ? 'bikeType-error' : undefined} className={inputClass}><option value="">Selecione uma opção</option><option>Bicicleta urbana</option><option>Estrada</option><option>Montanha (BTT)</option><option>Gravel</option><option>Elétrica</option><option>Clássica / restauro</option><option>Outra</option></select>{errors.bikeType && <p id="bikeType-error" className="mt-1.5 text-xs text-destructive">{errors.bikeType}</p>}</div>
        <div><label className={labelClass} htmlFor="service">Serviço pretendido</label><select id="service" name="service" value={values.service} onChange={(event) => update('service', event.target.value)} aria-invalid={!!errors.service} aria-describedby={errors.service ? 'service-error' : undefined} className={inputClass}><option value="">Selecione um serviço</option><option>Básica</option><option>Completa</option><option>Pro</option><option>Reparação pontual</option><option>Restauro / outro</option></select>{errors.service && <p id="service-error" className="mt-1.5 text-xs text-destructive">{errors.service}</p>}</div>
        <div><label className={labelClass} htmlFor="date">Data preferida</label><input id="date" name="date" type="date" min={new Date().toLocaleDateString('sv-SE')} value={values.date} onChange={(event) => update('date', event.target.value)} aria-invalid={!!errors.date} aria-describedby={errors.date ? 'date-error' : undefined} className={inputClass} />{errors.date && <p id="date-error" className="mt-1.5 text-xs text-destructive">{errors.date}</p>}</div>
        <div className="sm:col-span-2"><label className={labelClass} htmlFor="notes">O que se passa? <span className="font-normal text-muted-foreground">(opcional)</span></label><textarea id="notes" name="notes" rows={4} value={values.notes} onChange={(event) => update('notes', event.target.value)} placeholder="Um ruído estranho, uma mudança que não entra, ou só uma revisão…" aria-invalid={!!errors.notes} aria-describedby={errors.notes ? 'notes-error' : 'notes-help'} className={`${inputClass} resize-y`} /><p id={errors.notes ? 'notes-error' : 'notes-help'} className={`mt-1.5 text-xs ${errors.notes ? 'text-destructive' : 'text-muted-foreground'}`}>{errors.notes || 'Até 500 caracteres.'}</p></div>
      </div>
      <button type="submit" className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground transition hover:opacity-90">Pedir marcação <ArrowRight size={16} /></button>
      <p className="mt-4 text-[11px] leading-5 text-muted-foreground">O pedido fica guardado apenas neste dispositivo. Ainda não é uma confirmação de marcação.</p>
    </form>
    <aside className="flex flex-col gap-4">
      <div className="rounded-2xl bg-primary p-7 text-primary-foreground"><span className="flex size-10 items-center justify-center rounded-full bg-primary-foreground/10"><CalendarDays size={18} /></span><h2 className="font-editorial mt-5 text-2xl">Falamos antes de começar.</h2><p className="mt-3 text-sm leading-6 text-primary-foreground/75">A sua marcação é um pedido. Confirmamos a disponibilidade e qualquer custo adicional consigo.</p></div>
      <div className="rounded-2xl border border-border bg-card p-7"><div className="flex items-center gap-3"><Clock3 size={18} className="text-terracotta" /><h3 className="text-sm font-semibold">Horário da oficina</h3></div><p className="mt-4 text-sm leading-6 text-muted-foreground">Segunda a sexta · 09:00–18:30<br />Sábado · 10:00–14:00<br />Domingo · fechado</p><p className="mt-4 border-t border-border pt-4 text-xs leading-5 text-muted-foreground">Rua do Forno do Tijolo, 38<br />1170-132 Lisboa · Intendente</p></div>
    </aside>
  </div>
}
