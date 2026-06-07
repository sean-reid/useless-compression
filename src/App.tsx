import { HashRouter, Routes, Route } from 'react-router-dom'
import Layout from '@/components/Layout'
import Home from '@/pages/Home'
import Library from '@/pages/Library'
import FormatDetail from '@/pages/FormatDetail'
import About from '@/pages/About'
import NotFound from '@/pages/NotFound'
import Cube from '@/pages/Cube'
import Greg from '@/pages/Greg'
import Soup from '@/pages/Soup'
import SnailCensus from '@/pages/SnailCensus'
import Wat from '@/pages/Wat'
import Vegetal from '@/pages/Vegetal'
import { MailboxProvider } from '@/lib/useMailbox'
import { FileWindowsProvider } from '@/lib/useFileWindows'
import {
  useDeepFryMode,
  useMutatingTabTitle,
  useIdleDetector,
  useScrollEdges,
  useRightClickEgg,
} from '@/lib/useEasterEggs'

function Globals() {
  useDeepFryMode()
  useMutatingTabTitle(true)
  useIdleDetector(45)
  useScrollEdges()
  useRightClickEgg()
  return null
}

export default function App() {
  return (
    <MailboxProvider>
      <FileWindowsProvider>
        <Globals />
        <HashRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/library" element={<Library />} />
              <Route path="/format/:id" element={<FormatDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/cube" element={<Cube />} />
              <Route path="/greg" element={<Greg />} />
              <Route path="/soup" element={<Soup />} />
              <Route path="/snail" element={<SnailCensus />} />
              <Route path="/wat" element={<Wat />} />
              <Route path="/vegetal" element={<Vegetal />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </HashRouter>
      </FileWindowsProvider>
    </MailboxProvider>
  )
}
