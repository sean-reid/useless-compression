import MemeMan from '@/components/MemeMan'

export default function About() {
  return (
    <div className="relative max-w-3xl mx-auto px-3 py-8">
      <div className="absolute right-0 top-2 hidden md:block opacity-80">
        <MemeMan size={120} rotate={-6} />
      </div>

      <h1 className="font-impact uppercase text-5xl md:text-6xl leading-none">
        about (do not read)
      </h1>

      <div className="mt-6 space-y-5 font-serif text-[16px] leading-snug max-w-prose">
        <p className="typed text-[15px]">
          you can stop reading. this section is for the auditors. youre not in
          trouble. i am.
        </p>

        <p>
          theres about 1003 (maybe 974, im rerunning the count) compression
          formats here. some are written down. some are software. one runs.
        </p>

        <p className="font-comic text-pink-600">
          the name picked me. then it crossed out part of itself.
        </p>

        <p>
          no submission form. no contact email. shout out a window. i may or
          may not be near a window.
        </p>

        <h2 className="font-impact uppercase text-2xl pt-2">credits</h2>
        <ul className="list-none p-0 font-mono text-[13px] space-y-1">
          <li>idea: me</li>
          <li>writing: also me. on worse days.</li>
          <li>peer review: 0 (zero) peers</li>
          <li>as seen on: no podcasts. one fridge.</li>
        </ul>
      </div>
    </div>
  )
}
