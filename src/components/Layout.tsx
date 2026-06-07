import { Outlet, Link, useLocation } from 'react-router-dom'
import MailIndicator from './MailIndicator'
import MailPopup from './MailPopup'
import StockTicker from './StockTicker'
import StatusBar from './StatusBar'
import FallingEmojis from './FallingEmojis'
import PopupAd from './PopupAd'
import MusicWidget from './MusicWidget'
import SnailCrowd from './SnailCrowd'
import Toaster from './Toaster'
import HeroTitle from './HeroTitle'
import SkyscraperAd from './SkyscraperAd'
import FileWindows from './FileWindow'

export default function Layout() {
  const loc = useLocation()
  const onHome = loc.pathname === '/'

  return (
    <div className="min-h-screen relative overflow-x-clip pb-8">
      <StockTicker />

      {/* persistent chrome */}
      <MailIndicator />
      <MailPopup />
      <FallingEmojis />
      <SnailCrowd />
      <PopupAd />
      <MusicWidget />
      <Toaster />
      <SkyscraperAd />
      <FileWindows />

      {/* small in-page header on non-home routes */}
      {!onHome && (
        <header className="px-3 md:px-6 pt-4 pb-1 flex items-end gap-3">
          <Link to="/" className="block">
            <HeroTitle size="sm" />
          </Link>
          <span className="text-xs font-mono opacity-50">/{loc.pathname.slice(1) || 'home'}</span>
        </header>
      )}

      <main className="relative">
        <Outlet />
      </main>

      <footer className="mt-24 mb-8 border-t border-black/30 px-3 md:px-6 py-3 font-mono text-[11px] leading-relaxed">
        <div className="flex flex-wrap justify-between gap-3">
          <div>
            <div>file size: 11 KB</div>
            <div className="opacity-60">file generated: ???</div>
            {/* hidden link. white on white. for the curious. */}
            <Link to="/cube" className="text-white">.</Link>
          </div>
          <div className="text-right opacity-60">
            <div>my email: dont</div>
            <div>updated: april</div>
          </div>
        </div>
      </footer>

      <StatusBar />
    </div>
  )
}
