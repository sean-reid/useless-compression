import { createContext, useContext, useEffect, useMemo, useState, useCallback, useRef } from 'react'
import type { ReactNode } from 'react'
import { SEED_MAIL, pickSessionPool, type Mail } from '@/data/mailCorpus'

type MailboxState = {
  inbox: Mail[]
  unreadCount: number
  open: boolean
  selectedId: string | null
  setOpen: (o: boolean) => void
  select: (id: string) => void
  markRead: (id: string) => void
  markAllRead: () => void
}

const Ctx = createContext<MailboxState | null>(null)

let _id = 0
const nextId = () => `m${++_id}_${Math.floor(Math.random() * 1e6)}`

function seedInbox(): Mail[] {
  const now = Date.now()
  return SEED_MAIL.map((m) => ({
    id: nextId(),
    from: m.from,
    subject: m.subject,
    body: m.body,
    read: !!m.read,
    ts: now - m.mAgo * 60 * 1000,
  }))
}

export function MailboxProvider({ children }: { children: ReactNode }) {
  const [inbox, setInbox] = useState<Mail[]>(() => seedInbox())
  const [open, setOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  // session pool — picked once per page load. each visit has a different vibe.
  const poolRef = useRef(pickSessionPool())

  useEffect(() => {
    let cancelled = false
    function schedule() {
      const delay = 10000 + Math.random() * 10000
      window.setTimeout(() => {
        if (cancelled) return
        const pool = poolRef.current
        if (pool.length > 0) {
          const template = pool[Math.floor(Math.random() * pool.length)]!
          const m: Mail = { ...template, id: nextId(), read: false, ts: Date.now() }
          setInbox((prev) => [m, ...prev].slice(0, 200))
        }
        schedule()
      }, delay)
    }
    schedule()
    return () => { cancelled = true }
  }, [])

  const unreadCount = useMemo(() => inbox.filter((m) => !m.read).length, [inbox])

  const select = useCallback((id: string) => {
    setSelectedId(id)
    setInbox((prev) => prev.map((m) => (m.id === id ? { ...m, read: true } : m)))
  }, [])

  const markRead = useCallback((id: string) => {
    setInbox((prev) => prev.map((m) => (m.id === id ? { ...m, read: true } : m)))
  }, [])

  const markAllRead = useCallback(() => {
    setInbox((prev) => prev.map((m) => ({ ...m, read: true })))
  }, [])

  const value: MailboxState = { inbox, unreadCount, open, selectedId, setOpen, select, markRead, markAllRead }

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useMailbox() {
  const v = useContext(Ctx)
  if (!v) throw new Error('useMailbox outside MailboxProvider')
  return v
}
