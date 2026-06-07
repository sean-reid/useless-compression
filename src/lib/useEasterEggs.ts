import { useEffect, useState } from 'react'
import { pushEgg } from './eggBus'

const KONAMI = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a',
]

// keywords typed anywhere on the page → events.
// the value array is a pool of weird short fragments; one is picked at random.
const KEYWORDS: Record<string, string[]> = {
  soup: ['soup acknowledged', '+1 soup', 'soup confirmed', 'the soup record'],
  greg: ['greg logged on', 'greg has questions', 'greg is here', 'greg approaches'],
  cube: ['the cube draws nearer', 'cube tracking enabled', 'cube +1'],
  snail: ['a 4th snail was found', 'snail census updated', 'snail roll call'],
  wat: ['wat', 'wat indeed', 'wat. yes.'],
  orang: ['ORANG sees you', 'fwd: orang', 'orang is fwding everything'],
  garfielf: ['garfielf says hi', 'garfielf says hi.'],
  hello: ['no'],
  help: ['no'],
  stop: ['no'],
  please: ['no'],
  why: ['no'],
  fmt: ['fmt#884 wants water'],
  '1003': ['the count is wrong'],
  '884': ['fmt#884 is in the basement'],
}

const KONAMI_KEY = '__konami__'

export function useDeepFryMode() {
  const [on, setOn] = useState(false)

  useEffect(() => {
    let buf: string[] = []
    let charBuf = ''
    function onKey(e: KeyboardEvent) {
      buf.push(e.key)
      if (buf.length > KONAMI.length) buf = buf.slice(-KONAMI.length)
      if (buf.length === KONAMI.length && buf.every((k, i) => k.toLowerCase() === KONAMI[i]!.toLowerCase())) {
        setOn((v) => !v)
        pushEgg('deep fry mode toggled', 'warn')
        buf = []
      }
      if (e.key.length === 1) {
        charBuf = (charBuf + e.key.toLowerCase()).slice(-30)
        if (charBuf.endsWith('deepfry')) {
          setOn((v) => !v)
          pushEgg('deep fry mode', 'warn')
          charBuf = ''
        }
        for (const k of Object.keys(KEYWORDS)) {
          if (charBuf.endsWith(k) && k !== KONAMI_KEY) {
            const pool = KEYWORDS[k]!
            pushEgg(pool[Math.floor(Math.random() * pool.length)]!, 'info')
            charBuf = ''
            break
          }
        }
      }
      if (e.key === 'F' || e.key === 'f') {
        if (Math.random() < 0.04) pushEgg('press F to pay respects (you did)', 'ok')
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('deep-fry-mode', on)
  }, [on])

  return { on, toggle: () => setOn((v) => !v) }
}

const TAB_TITLES = [
  'USELESS COMPRESSION',
  'come back',
  'are you still here',
  '1003 formats. zero work.',
  '🅱️🅱️🅱️🅱️',
  'i can see you',
  'compressing...',
  'compressing... still',
  'never finished',
  'pls help',
  '— greg',
  'do not minimize',
  'the cube knows',
  'soup?',
]
export function useMutatingTabTitle(active = true) {
  useEffect(() => {
    if (!active) return
    const original = document.title
    let i = 0
    let blurred = false
    const handle = window.setInterval(() => {
      if (blurred) return
      i = (i + 1 + Math.floor(Math.random() * 3)) % TAB_TITLES.length
      document.title = TAB_TITLES[i]!
    }, 4200)
    function onBlur() {
      blurred = true
      document.title = 'where are you going'
    }
    function onFocus() {
      blurred = false
      document.title = 'oh good. you came back.'
      pushEgg('welcome back', 'ok')
    }
    window.addEventListener('blur', onBlur)
    window.addEventListener('focus', onFocus)
    return () => {
      window.clearInterval(handle)
      window.removeEventListener('blur', onBlur)
      window.removeEventListener('focus', onFocus)
      document.title = original
    }
  }, [active])
}

// idle detector — no keyboard/mouse for N seconds, fire something.
export function useIdleDetector(seconds = 30) {
  useEffect(() => {
    let last = Date.now()
    function activity() { last = Date.now() }
    function tick() {
      if (Date.now() - last > seconds * 1000) {
        pushEgg('are you still there', 'warn')
        last = Date.now() // reset so it doesnt fire every second
      }
    }
    const i = window.setInterval(tick, 1000)
    window.addEventListener('mousemove', activity)
    window.addEventListener('keydown', activity)
    window.addEventListener('scroll', activity, { passive: true })
    window.addEventListener('touchstart', activity, { passive: true })
    return () => {
      window.clearInterval(i)
      window.removeEventListener('mousemove', activity)
      window.removeEventListener('keydown', activity)
      window.removeEventListener('scroll', activity)
      window.removeEventListener('touchstart', activity)
    }
  }, [seconds])
}

// scroll-to-bottom of page → fire once per visit.
export function useScrollEdges() {
  useEffect(() => {
    let firedBottom = false
    let firedTop = false
    function onScroll() {
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (!firedBottom && window.scrollY >= max - 4) {
        firedBottom = true
        pushEgg('you have reached the bottom of the website', 'ok')
      }
      if (firedBottom && !firedTop && window.scrollY < 200) {
        firedTop = true
        pushEgg('you have come back from the bottom', 'ok')
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
}

// right-click → toast it. don't actually prevent the default menu.
export function useRightClickEgg() {
  useEffect(() => {
    function onCtx() { pushEgg('there is nothing in there', 'info') }
    window.addEventListener('contextmenu', onCtx)
    return () => window.removeEventListener('contextmenu', onCtx)
  }, [])
}
