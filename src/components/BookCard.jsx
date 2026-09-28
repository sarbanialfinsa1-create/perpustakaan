import { ArrowRight, BookMarked } from 'lucide-react'

export default function BookCard({ book }) {
  const bgColor = book.color ?? '#E3EEFB'
  const accentColor = book.accent ?? '#1D5FAE'

  return (
    <div className="group flex flex-col rounded-2xl border border-slate-100 bg-white p-4 shadow-card transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative mb-4 flex h-40 items-center justify-center overflow-hidden rounded-xl" style={{ backgroundColor: bgColor }}>
        <BookMarked className="h-8 w-8 opacity-30" style={{ color: accentColor }} />
        <span className="absolute inset-x-3 bottom-3 text-center text-sm font-extrabold leading-tight" style={{ color: accentColor }}>{book.title}</span>
      </div>
      <h4 className="font-bold text-navy-900">{book.title}</h4>
      <p className="mt-0.5 text-sm text-slate-copy">{book.category}</p>
      <button type="button" className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full border border-brand px-4 py-2 text-xs font-semibold text-brand transition group-hover:bg-brand group-hover:text-white">
        Lihat Detail
        <ArrowRight className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}
