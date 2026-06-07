import { useMailbox } from '@/lib/useMailbox'

export default function MailIndicator() {
  const { unreadCount, open, setOpen } = useMailbox()
  const hasNew = unreadCount > 0
  return (
    <button
      onClick={() => setOpen(!open)}
      className={`fixed top-1 right-1 z-40 font-mono text-[11px] px-2 py-0.5 border-2 border-black bg-yellow-300 ${hasNew ? 'blink' : ''}`}
      aria-label={`open mail. ${unreadCount} unread.`}
      title="open mail"
      style={{ boxShadow: '3px 3px 0 #000' }}
    >
      📬 NEW MAIL ({unreadCount})
    </button>
  )
}
