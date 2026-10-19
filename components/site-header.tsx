'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Menu, Moon, Sun, Wrench } from 'lucide-react'

const links = [
  { href: '/', label: 'Início' },
  { href: '/precos', label: 'Preços' },
  { href: '/sobre', label: 'A oficina' },
  { href: '/area-cliente', label: 'Área de cliente' },
]

export function SiteHeader({ shopName }: { shopName: string }) {
  const [dark, setDark] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const stored = window.localStorage.getItem('oficina-lume-theme')
    const isDark = stored ? stored === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches
    setDark(isDark)
    document.documentElement.classList.toggle('dark', isDark)
    setMounted(true)
  }, [])

  function toggleTheme() {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    window.localStorage.setItem('oficina-lume-theme', next ? 'dark' : 'light')
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex h-[76px] max-w-[1280px] items-center justify-between px-5 md:px-8">
        <Link href="/" aria-label={`${shopName} — página inicial`} className="flex items-center gap-3 text-foreground no-underline">
          <span className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground"><Wrench aria-hidden="true" size={18} /></span>
          <span className="leading-none"><span className="font-editorial block text-[22px] font-semibold tracking-[-0.04em]">{shopName}</span><span className="mt-1.5 block text-[9px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">Oficina de bicicletas</span></span>
        </Link>
        <nav aria-label="Navegação principal" className="hidden items-center gap-8 md:flex">
          {links.map((link) => <Link key={link.href} href={link.href} className="text-[13px] font-medium text-muted-foreground transition hover:text-foreground">{link.label}</Link>)}
        </nav>
        <div className="flex items-center gap-2">
          <button type="button" onClick={toggleTheme} aria-label={mounted && dark ? 'Ativar tema claro' : 'Ativar tema escuro'} className="focus-ring flex size-10 items-center justify-center rounded-full text-foreground transition hover:bg-muted">
            {dark ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
          </button>
          <Link href="/marcar" className="hidden rounded-full bg-primary px-5 py-3 text-[12px] font-semibold tracking-wide text-primary-foreground transition hover:opacity-90 sm:inline-flex">Marcar reparação <span aria-hidden="true" className="ml-2">↗</span></Link>
          <button type="button" onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={mobileOpen} className="focus-ring flex size-10 items-center justify-center rounded-full text-foreground hover:bg-muted md:hidden"><Menu size={20} aria-hidden="true" /></button>
        </div>
      </div>
      {mobileOpen && <nav aria-label="Navegação móvel" className="border-t border-border bg-background px-5 py-3 md:hidden"><div className="mx-auto flex max-w-[1280px] flex-col">{links.map((link) => <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="border-b border-border/70 py-3 text-sm font-medium">{link.label}</Link>)}<Link href="/marcar" onClick={() => setMobileOpen(false)} className="mt-3 rounded-full bg-primary px-5 py-3 text-center text-sm font-semibold text-primary-foreground">Marcar reparação</Link></div></nav>}
    </header>
  )
}
