import { createContext, useCallback, useContext, useState } from 'react'
import type { ReactNode } from 'react'

type State = {
  openIds: string[]
  open: (id: string) => void
  close: (id: string) => void
  bringToFront: (id: string) => void
}

const Ctx = createContext<State | null>(null)

export function FileWindowsProvider({ children }: { children: ReactNode }) {
  const [openIds, setOpenIds] = useState<string[]>([])
  const open = useCallback((id: string) => {
    setOpenIds((cur) => (cur.includes(id) ? [...cur.filter((x) => x !== id), id] : [...cur, id]))
  }, [])
  const close = useCallback((id: string) => {
    setOpenIds((cur) => cur.filter((x) => x !== id))
  }, [])
  const bringToFront = useCallback((id: string) => {
    setOpenIds((cur) => [...cur.filter((x) => x !== id), id])
  }, [])
  return <Ctx.Provider value={{ openIds, open, close, bringToFront }}>{children}</Ctx.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useFileWindows() {
  const v = useContext(Ctx)
  if (!v) throw new Error('useFileWindows outside provider')
  return v
}
