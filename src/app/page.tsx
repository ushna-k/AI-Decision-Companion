export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 py-16 text-center">
        
        <div className="mb-6 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
          AI Decision Companion
        </div>

        <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
          Make decisions with
          <span className="text-cyan-400"> more clarity.</span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
          Compare your options, understand the trade-offs, identify potential
          risks, and get structured AI guidance for your next decision.
        </p>

        <a
          href="/decision"
          className="mt-10 rounded-lg bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-950"
        >
          Start a Decision
        </a>

        <div className="mt-16 grid w-full max-w-3xl gap-6 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="font-semibold">Compare</h2>
            <p className="mt-2 text-sm text-slate-400">
              Look at your options side by side.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="font-semibold">Understand</h2>
            <p className="mt-2 text-sm text-slate-400">
              Explore benefits, risks, and trade-offs.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="font-semibold">Reflect</h2>
            <p className="mt-2 text-sm text-slate-400">
              Consider what matters before deciding.
            </p>
          </div>
        </div>

        <p className="mt-10 max-w-xl text-xs leading-5 text-slate-400">
          AI guidance is intended to support your thinking, not make decisions
          for you. For important decisions, consider relevant professional
          advice.
        </p>
      </section>
    </main>
  );
}