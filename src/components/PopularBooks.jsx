import { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import { BookService } from '../services/api.js'
import { popularBooks as fallbackBooks, CATEGORIES } from '../data/books.js'
import BookCard from './BookCard.jsx'

export default function PopularBooks() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('Semua Kategori')
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const handleExternalSearch = (e) => setQuery(e.detail || '')
    window.addEventListener('simpus-search', handleExternalSearch)
    return () => window.removeEventListener('simpus-search', handleExternalSearch)
  }, [])

  useEffect(() => {
    let isMounted = true

    const fetchBooks = async () => {
      setLoading(true)
      try {
        const params = {}
        if (query) params.search = query
        if (category !== 'Semua Kategori') params.category = category

        const res = query || category !== 'Semua Kategori'
          ? await BookService.search(params)
          : await BookService.getPopular()

        if (isMounted) {
          const data = res.data?.data || res.data || []
          setBooks(Array.isArray(data) && data.length > 0 ? data : fallbackBooks)
        }
      } catch (err) {
        if (isMounted) {
          const filtered = fallbackBooks.filter((book) => {
            const matchesQuery = book.title.toLowerCase().includes(query.toLowerCase())
            const matchesCategory = category === 'Semua Kategori' || book.category === category
            return matchesQuery && matchesCategory
          })
          setBooks(filtered)
        }
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    const timer = setTimeout(fetchBooks, 300)
    return () => {
      isMounted = false
      clearTimeout(timer)
    }
  }, [query, category])

  return (
    <section id="katalog" className="bg-brand-soft/60 py-16">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <h2 className="text-3xl font-extrabold text-navy-900 sm:text-4xl">Buku Populer</h2>
            <p className="mt-2 max-w-xl text-slate-copy">
              Buku-buku yang paling banyak dibaca dan dipinjam oleh pengunjung perpustakaan
            </p>
          </div>

          <div className="flex w-full max-w-xl items-center gap-2 rounded-full border border-slate-200 bg-white p-1.5 shadow-sm lg:w-[480px]">
            <Search className="ml-3 h-4 w-4 shrink-0 text-slate-copy" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari judul buku..."
              className="w-full bg-transparent px-1 py-2 text-sm text-navy-900 placeholder:text-slate-copy focus:outline-none"
            />
            <span className="hidden h-6 w-px bg-slate-200 sm:block" />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="shrink-0 rounded-full bg-transparent px-3 py-2 text-sm font-semibold text-navy-900 focus:outline-none"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-64 animate-pulse rounded-2xl bg-slate-200" />
            ))}
          </div>
        ) : books.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center text-slate-copy">
            Buku tidak ditemukan. Coba kata kunci atau kategori lain.
          </div>
        )}
      </div>
    </section>
  )
}
