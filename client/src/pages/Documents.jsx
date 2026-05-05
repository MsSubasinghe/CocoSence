import { useState } from 'react'
import { FileText, Download, Eye, Search, X } from 'lucide-react'
import { useInView } from '../hooks/useInView'

const DOCUMENTS = [
  { id: 1, name: 'Research Proposal Report', filename: 'IT22186638_Proposal_report_draft.pdf', size: '1.1 MB', date: 'Aug 2025', tag: 'Proposal' },
]

const tagLight = {
  Proposal:    'bg-blue-50   text-blue-600   border-blue-100',
  Review:      'bg-purple-50 text-purple-600 border-purple-100',
  Methodology: 'bg-orange-50 text-orange-600 border-orange-100',
  Paper:       'bg-green-50  text-green-600  border-green-100',
}
const tagDark = {
  Proposal:    'dark:bg-blue-500/10   dark:text-blue-400   dark:border-blue-500/20',
  Review:      'dark:bg-purple-500/10 dark:text-purple-400 dark:border-purple-500/20',
  Methodology: 'dark:bg-orange-500/10 dark:text-orange-400 dark:border-orange-500/20',
  Paper:       'dark:bg-green-500/10  dark:text-green-400  dark:border-green-500/20',
}

function DocCard({ doc, index, onPreview }) {
  const [ref, inView] = useInView()
  return (
    <div ref={ref}
      className={`card card-hover rounded-2xl p-6 ${inView ? 'anim-fade-up' : 'opacity-0'}`}
      style={{ animationDelay: `${index * 100}ms` }}>
      <div className="flex items-start gap-4 mb-5">
        <div className="w-12 h-12 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 flex items-center justify-center shrink-0">
          <FileText size={22} className="text-red-400" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-gray-800 dark:text-gray-100 font-semibold text-sm leading-snug mb-2">{doc.name}</h3>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-gray-400 dark:text-gray-500">{doc.size}</span>
            <span className="text-gray-200 dark:text-gray-700">·</span>
            <span className="text-xs text-gray-400 dark:text-gray-500">{doc.date}</span>
            <span className={`px-2 py-0.5 rounded-full border text-xs font-medium ${tagLight[doc.tag]} ${tagDark[doc.tag]}`}>
              {doc.tag}
            </span>
          </div>
        </div>
      </div>
      <div className="flex gap-3">
        <button onClick={() => onPreview(doc)}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gray-50 dark:bg-white/5 hover:bg-green-50 dark:hover:bg-green-500/10 border border-gray-200 dark:border-white/10 hover:border-green-200 dark:hover:border-green-500/30 text-gray-500 dark:text-gray-400 hover:text-green-700 dark:hover:text-green-400 text-xs font-medium transition-all duration-300">
          <Eye size={14} />Preview
        </button>
        <a href={`/documents/${doc.filename}`} download={doc.name}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-green-50 dark:bg-green-500/10 hover:bg-green-100 dark:hover:bg-green-500/15 border border-green-200 dark:border-green-500/25 text-green-700 dark:text-green-400 text-xs font-medium transition-all duration-300">
          <Download size={14} />Download
        </a>
      </div>
    </div>
  )
}

export default function Documents() {
  const [search,      setSearch]      = useState('')
  const [previewUrl,  setPreviewUrl]  = useState(null)
  const [previewName, setPreviewName] = useState('')
  const [headRef,   headInView]   = useInView()
  const [searchRef, searchInView] = useInView()

  const filtered   = DOCUMENTS.filter(d => d.name.toLowerCase().includes(search.toLowerCase()))
  const openPreview  = (doc) => { setPreviewUrl(`/documents/${doc.filename}`); setPreviewName(doc.name) }
  const closePreview = ()    => { setPreviewUrl(null); setPreviewName('') }

  return (
    <main className="min-h-screen bg-[#f4f7f4] dark:bg-[#080f1e] pt-28 pb-24 px-6 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">

        <div ref={headRef} className={`mb-10 ${headInView ? 'anim-fade-up' : 'opacity-0'}`}>
          <span className="inline-block px-3 py-1 rounded-full bg-green-100 dark:bg-green-500/15 text-green-700 dark:text-green-400 text-xs font-semibold uppercase tracking-widest mb-3">
            Repository
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-2">
            Research <span className="text-gradient">Documents</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400">Browse, preview, and download our research publications.</p>
        </div>

        <div ref={searchRef} className={`relative mb-8 ${searchInView ? 'anim-fade-up delay-100' : 'opacity-0'}`}>
          <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
          <input type="text" placeholder="Search documents..." value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-white dark:bg-[#162035] border border-gray-200 dark:border-white/10 focus:border-green-400 dark:focus:border-green-500/50 outline-none text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-600 text-sm transition-all duration-300 shadow-sm" />
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-24 anim-fade-in">
            <FileText size={48} className="mx-auto text-gray-300 dark:text-gray-700 mb-4" />
            <p className="text-gray-400 dark:text-gray-600 text-lg font-medium">No documents found</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {filtered.map((doc, i) => <DocCard key={doc.id} doc={doc} index={i} onPreview={openPreview} />)}
          </div>
        )}
      </div>

      {previewUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm anim-fade-in">
          <div className="w-full max-w-5xl h-[90vh] bg-white dark:bg-[#162035] rounded-2xl border border-gray-200 dark:border-white/10 shadow-2xl flex flex-col overflow-hidden anim-scale-in">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-white/8">
              <span className="text-gray-800 dark:text-gray-100 font-semibold text-sm truncate max-w-md">{previewName}</span>
              <button onClick={closePreview}
                className="text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/8 rounded-lg p-1 transition-all">
                <X size={20} />
              </button>
            </div>
            <iframe src={previewUrl} className="flex-1 w-full" title="PDF Preview" />
          </div>
        </div>
      )}
    </main>
  )
}
