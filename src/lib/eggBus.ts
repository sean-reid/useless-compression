// tiny pub/sub. surreal events fire here; Toaster listens.
type Listener = (msg: string, tone?: string) => void
const listeners = new Set<Listener>()

export function pushEgg(msg: string, tone?: string) {
  for (const l of listeners) l(msg, tone)
}

export function onEgg(l: Listener) {
  listeners.add(l)
  return () => { listeners.delete(l) }
}
