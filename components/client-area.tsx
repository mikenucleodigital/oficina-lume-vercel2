'use client'

import Link from 'next/link'
import { useMemo } from 'react'
import { toast } from 'sonner'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { ArrowRight, CalendarDays, Check, Clock3, Trash2 } from 'lucide-react'
import { bookingStatuses, saveBookings, type Booking, type BookingStatus } from '@/lib/bookings'
import { useBookings } from '@/lib/use-bookings'

const statusStyles: Record<BookingStatus, string> = {
  Recebida: 'bg-[#f2e9d4] text-[#806229] dark:bg-[#4b402a] dark:text-[#f0dba8]',
  Confirmada: 'bg-[#e1e9dc] text-[#3d6948] dark:bg-[#304536] dark:text-[#b9d8b5]',
  Concluída: 'bg-[#e8e5df] text-[#69685f] dark:bg-[#3b3a34] dark:text-[#d2cfc4]',
}

function monthLabels() {
  const formatter = new Intl.DateTimeFormat('pt-PT', { month: 'short' })
  return Array.from({ length: 6 }, (_, index) => {
    const date = new Date()
    date.setDate(1)
    date.setMonth(date.getMonth() - (5 - index))
    return { key: `${date.getFullYear()}-${date.getMonth()}`, label: formatter.format(date).replace('.', '') }
  })
}

export function ClientArea() {
  const bookings = useBookings()
  const chartData = useMemo(() => {
    const months = monthLabels()
    return months.map(({ key, label }) => ({
      month: label,
      marcações: bookings.filter((booking) => {
        const date = new Date(booking.createdAt)
        return `${date.getFullYear()}-${date.getMonth()}` === key
      }).length,
    }))
  }, [bookings])
  const pending = bookings.filter((booking) => booking.status !== 'Concluída').length
  const completed = bookings.filter((booking) => booking.status === 'Concluída').length

  function updateStatus(id: string, status: BookingStatus) {
    saveBookings(bookings.map((booking) => booking.id === id ? { ...booking, status } : booking))
    toast.success('Estado da marcação atualizado.')
  }

  function removeBooking(id: string) {
    saveBookings(bookings.filter((booking) => booking.id !== id))
    toast.success('Marcação removida deste dispositivo.')
  }

  return <main className="mx-auto max-w-[1280px] px-5 pb-24 pt-14 md:px-8 md:pt-20">
    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-terracotta">A sua bicicleta, por perto</p><h1 className="font-editorial mt-3 text-5xl tracking-[-0.055em] md:text-6xl">Área de cliente</h1><p className="mt-3 text-sm text-muted-foreground">Acompanhe os seus pedidos de marcação neste dispositivo.</p></div><Link href="/marcar" className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground">Nova marcação <ArrowRight size={15} /></Link></div>
    <div className="mt-9 grid gap-4 sm:grid-cols-3"><article className="rounded-2xl border border-border bg-card p-6"><div className="flex items-center justify-between"><p className="text-xs font-medium text-muted-foreground">Marcações no total</p><CalendarDays size={17} className="text-terracotta" /></div><p className="font-editorial mt-4 text-4xl">{bookings.length}</p></article><article className="rounded-2xl border border-border bg-card p-6"><div className="flex items-center justify-between"><p className="text-xs font-medium text-muted-foreground">A acompanhar</p><Clock3 size={17} className="text-terracotta" /></div><p className="font-editorial mt-4 text-4xl">{pending}</p></article><article className="rounded-2xl border border-border bg-card p-6"><div className="flex items-center justify-between"><p className="text-xs font-medium text-muted-foreground">Concluídas</p><Check size={17} className="text-terracotta" /></div><p className="font-editorial mt-4 text-4xl">{completed}</p></article></div>
    <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_1.45fr]">
      <section className="rounded-2xl border border-border bg-card p-6 md:p-7"><div><p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-terracotta">Ao longo do tempo</p><h2 className="font-editorial mt-2 text-2xl">Marcações por mês</h2></div><div className="mt-5 h-[230px] w-full" role="img" aria-label="Gráfico de marcações criadas nos últimos seis meses"><ResponsiveContainer width="100%" height="100%"><BarChart data={chartData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" /><XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }} /><YAxis allowDecimals={false} axisLine={false} tickLine={false} tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }} /><Tooltip cursor={{ fill: 'var(--muted)' }} contentStyle={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, color: 'var(--foreground)', fontSize: 12 }} /><Bar dataKey="marcações" fill="#bd6348" radius={[5, 5, 0, 0]} maxBarSize={34} /></BarChart></ResponsiveContainer></div></section>
      <section className="rounded-2xl border border-border bg-card p-6 md:p-7"><div className="flex items-end justify-between gap-4"><div><p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-terracotta">Pedidos guardados</p><h2 className="font-editorial mt-2 text-2xl">As suas marcações</h2></div><span className="text-xs text-muted-foreground">{bookings.length} {bookings.length === 1 ? 'pedido' : 'pedidos'}</span></div>
        {bookings.length === 0 ? <div className="mt-6 rounded-xl border border-dashed border-border px-5 py-10 text-center"><span className="mx-auto flex size-11 items-center justify-center rounded-full bg-muted text-terracotta"><CalendarDays size={19} /></span><h3 className="font-editorial mt-4 text-xl">Ainda não há marcações.</h3><p className="mx-auto mt-2 max-w-[280px] text-xs leading-5 text-muted-foreground">Quando pedir uma marcação, ela aparece aqui para poder acompanhar o estado.</p><Link href="/marcar" className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-terracotta">Marcar uma reparação <ArrowRight size={14} /></Link></div> : <div className="mt-5 overflow-x-auto"><table className="w-full min-w-[680px] border-collapse text-left"><thead><tr className="border-b border-border text-[10px] uppercase tracking-[0.14em] text-muted-foreground"><th className="pb-3 pr-4 font-semibold">Bicicleta / serviço</th><th className="pb-3 pr-4 font-semibold">Data preferida</th><th className="pb-3 pr-4 font-semibold">Estado</th><th className="pb-3 text-right font-semibold">Acções</th></tr></thead><tbody>{bookings.map((booking) => <tr key={booking.id} className="border-b border-border/70 align-top last:border-0"><td className="py-4 pr-4"><p className="text-sm font-semibold">{booking.bikeType}</p><p className="mt-1 text-xs text-muted-foreground">{booking.service} · {booking.name}</p></td><td className="py-4 pr-4 text-xs text-muted-foreground">{new Date(`${booking.date}T12:00:00`).toLocaleDateString('pt-PT', { day: 'numeric', month: 'short', year: 'numeric' })}</td><td className="py-4 pr-4"><span className={`inline-flex rounded-full px-2.5 py-1.5 text-[10px] font-semibold ${statusStyles[booking.status]}`}>{booking.status}</span></td><td className="py-4 text-right"><div className="flex justify-end gap-2"><label className="sr-only" htmlFor={`status-${booking.id}`}>Alterar estado de {booking.name}</label><select id={`status-${booking.id}`} value={booking.status} onChange={(event) => updateStatus(booking.id, event.target.value as BookingStatus)} className="focus-ring max-w-[126px] rounded-lg border border-input bg-background px-2 py-2 text-[11px]">{bookingStatuses.map((status) => <option key={status} value={status}>{status}</option>)}</select><button type="button" onClick={() => removeBooking(booking.id)} aria-label={`Eliminar marcação de ${booking.name}`} className="focus-ring flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition hover:border-destructive/40 hover:text-destructive"><Trash2 size={15} /></button></div></td></tr>)}</tbody></table></div>}
      </section>
    </div>
    <p className="mt-5 text-[11px] leading-5 text-muted-foreground">As marcações ficam guardadas no armazenamento local do navegador e não são sincronizadas entre dispositivos.</p>
  </main>
}
