/* eslint-disable react-refresh/only-export-components */
import type { ReactNode } from 'react'

export type FileSpec = {
  id: string
  icon: string
  title: string
  render: () => ReactNode
  width?: number
  height?: number
}

function FmtZipBody() {
  const items = [
    { name: 'fmt884.bin',           size: '4.0 GB', mod: '04/?? 04:13', who: 'greg' },
    { name: 'fmt884.bin.bak',       size: '4.0 GB', mod: '04/?? 04:14', who: 'greg' },
    { name: 'fmt884.bin.bak.bak',   size: '4.0 GB', mod: '04/?? 04:14', who: 'greg' },
    { name: 'fmt884.bin.bak.bak.bak', size: '8.0 GB', mod: '04/?? 04:15', who: 'greg (different greg)' },
    { name: 'greg.gif',             size: '8 KB',   mod: '03/?? 18:02', who: 'greg' },
    { name: 'the_cube/',            size: '<DIR>',  mod: '02/?? 02:02', who: 'the cube' },
    { name: 'readme.txt',           size: '1 KB',   mod: '01/?? 00:01', who: 'nobody' },
    { name: 'DO_NOT_OPEN.txt',      size: '0 KB',   mod: '??/?? ??:??', who: '?' },
    { name: 'apology.docx',         size: '0 KB',   mod: '??/?? ??:??', who: 'greg' },
    { name: '~$apology.docx',       size: '0 KB',   mod: '??/?? ??:??', who: 'greg' },
    { name: 'soup.dns',             size: '4 bytes', mod: '??/?? ??:??', who: 'dnspls' },
  ]
  return (
    <div className="bg-white">
      <table className="w-full text-[11px] font-mono">
        <thead className="bg-[#c0c0c0]">
          <tr>
            <th className="text-left px-1 border-b border-black/30">name</th>
            <th className="text-right px-1 border-b border-black/30">size</th>
            <th className="text-left px-1 border-b border-black/30 hidden md:table-cell">modified</th>
            <th className="text-left px-1 border-b border-black/30 hidden md:table-cell">by</th>
          </tr>
        </thead>
        <tbody>
          {items.map((it, i) => (
            <tr key={i} className={`hover:bg-[#000080] hover:text-white ${i % 2 ? 'bg-[#f4f0e6]' : ''}`}>
              <td className="px-1">📄 {it.name}</td>
              <td className="px-1 text-right">{it.size}</td>
              <td className="px-1 hidden md:table-cell">{it.mod}</td>
              <td className="px-1 hidden md:table-cell">{it.who}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="border-t border-black/40 bg-[#c0c0c0] text-[10px] font-mono px-1 py-0.5 flex justify-between">
        <span>11 items</span>
        <span>20.0 GB · greg has touched all of these</span>
      </div>
    </div>
  )
}

function DoNotOpenBody() {
  const lines = [
    'you opened it',
    'i told you not to',
    'fine. you opened it.',
    '',
    'this is a list of everything you have forgotten:',
    '',
    '1. ',
    '2. ',
    '3. ',
    '4. you said you would call her back',
    '5. ',
    '6. the song from that car commercial in 2009',
    '7. ',
    '8. ',
    '9. why you walked into the room',
    '10.',
    '11. one of the four (4) horses\' names',
    '12.',
    '',
    'there are 1003 more entries',
    'i will not show them to you',
    '',
    'please close this file',
    'you cannot close this file',
    '',
    '— greg',
    '',
  ]
  return (
    <div className="bg-white p-2 font-mono text-[12px] leading-snug whitespace-pre-wrap">
      {lines.join('\n')}
    </div>
  )
}

function ReadmeBody() {
  return (
    <div className="bg-white p-2 font-mono text-[12px] leading-snug whitespace-pre-wrap">{`
==========================================
   README.TXT  (last updated: ?)
==========================================

hi.

if you are reading this file you have opened
fmt884.zip. you should not have done that.

contents are real but should not be extracted.

if extracted the contents will:
  - rename themselves
  - get larger
  - email greg

greg has been notified.

— mgmt
`}</div>
  )
}

function CubeFolderBody() {
  return (
    <div className="bg-white p-2 font-mono text-[12px]">
      <div className="opacity-60 mb-2">/the_cube/</div>
      <ul className="space-y-0.5">
        <li>🧊 cube_a/</li>
        <li>🧊 cube_b/</li>
        <li>🧊 cube_c/</li>
        <li>🧊 .hidden_cube/</li>
        <li>🧊 cube_real_FINAL/</li>
        <li>🧊 cube_real_FINAL_v2/</li>
        <li>🧊 cube_real_FINAL_v2_actually/</li>
      </ul>
      <div className="mt-3 opacity-60">it is cubes all the way down.</div>
    </div>
  )
}

export const FILES: Record<string, FileSpec> = {
  fmt884: {
    id: 'fmt884',
    icon: '📁',
    title: 'fmt884.zip — winzipper 5',
    render: FmtZipBody,
    width: 520,
    height: 360,
  },
  untitled: {
    id: 'untitled',
    icon: '📄',
    title: 'untitled.txt — notepid',
    render: DoNotOpenBody,
    width: 440,
    height: 380,
  },
  readme: {
    id: 'readme',
    icon: '📄',
    title: 'readme.txt',
    render: ReadmeBody,
    width: 420,
    height: 300,
  },
  cube_folder: {
    id: 'cube_folder',
    icon: '🧊',
    title: 'the_cube — winzipper 5',
    render: CubeFolderBody,
    width: 360,
    height: 280,
  },
}
