import { useState } from 'react'
import { FileText, Download, Eye, Search, X } from 'lucide-react'
import { useInView } from '../hooks/useInView'

const DOCUMENTS = [
  { id: 1,  name: 'Research Proposal Report (IT22186638)',        filename: 'IT22186638_Proposal_report_draft.pdf',                                                                                         size: '1.1 MB',  date: 'Aug 2025', tag: 'Proposal',     previewable: true  },
  { id: 2,  name: 'Research Proposal Report (IT22266200)',        filename: 'IT22266200_proposal_report_draft.pdf',                                                                                         size: '1.3 MB',  date: 'Aug 2025', tag: 'Proposal',     previewable: true  },
  { id: 3,  name: 'Final Research Paper',                         filename: 'Final_Paper_CocoSense_AI_Powered_Drone_Based_System_for_Comprehensive_Coconut_Tree_Health_Monitoring_and_Yield_Prediction.pdf', size: '2.8 MB',  date: 'Jan 2026', tag: 'Paper',        previewable: true  },
  { id: 4,  name: 'AI-Powered Drone System Presentation',        filename: 'AI-Powered Drone System for Comprehensive Coconut Tree Health Monitoring and Yield Prediction1.pptx',                          size: '5.2 MB',  date: 'Dec 2025', tag: 'Presentation', previewable: false },
  { id: 5,  name: 'CocoSense Product Brochure',                  filename: 'CocoSense_Product_Brochure.pdf',                                                                                               size: '0.9 MB',  date: 'Feb 2026', tag: 'Brochure',     previewable: true  },
  { id: 6,  name: 'CocoSense Research Project',                  filename: 'CocoSense Research Project.xlsx',                                                                                              size: '0.4 MB',  date: 'Nov 2025', tag: 'Report',       previewable: false },
  { id: 7,  name: 'Yield Estimation Module',                     filename: 'Yield Estimation Module.pdf',                                                                                                  size: '1.5 MB',  date: 'Nov 2025', tag: 'Methodology',  previewable: true  },
  { id: 8,  name: 'Research Gap – Yield Prediction',             filename: 'research gap Yield Prediction.txt',                                                                                            size: '0.01 MB', date: 'Sep 2025', tag: 'Methodology',  previewable: true  },
  { id: 9,  name: 'Rubric – Final Report',                       filename: 'Rubric - Final Report.pdf',                                                                                                   size: '0.3 MB',  date: 'Jan 2026', tag: 'Review',       previewable: true  },
  { id: 10, name: 'Project Details',                             filename: 'Project Details.pdf',                                                                                                         size: '0.5 MB',  date: 'Aug 2025', tag: 'Report',       previewable: true  },
  { id: 11, name: 'Letter from Supervisor',                      filename: 'LetterFromSupervisor.pdf',                                                                                                    size: '0.2 MB',  date: 'Mar 2026', tag: 'Letter',       previewable: true  },
  { id: 12, name: 'Sri Lanka Institute of Information Technology', filename: 'Sri Lanka Institute of Information Technology.pdf',                                                                          size: '0.6 MB',  date: 'Aug 2025', tag: 'Admin',        previewable: true  },
  { id: 13, name: 'TAF 25-26J-384',                              filename: 'TAF_25-26J-384.pdf',                                                                                                          size: '0.4 MB',  date: 'Aug 2025', tag: 'Admin',        previewable: true  },
  { id: 14, name: 'Coconut Health Monitor Final Report',         filename: 'Coconut_Health_Monitor_Final_v4.pdf',                                                                                           size: '2.1 MB',  date: 'Apr 2026', tag: 'Paper',        previewable: true  },
  { id: 15, name: 'Ravindu Final Report (with Images)',          filename: 'Ravindu_Final_Report_WITH_IMAGES_v4.pdf',                                                                                       size: '3.4 MB',  date: 'Apr 2026', tag: 'Paper',        previewable: true  },
]

const tagLight = {
  Proposal:     'bg-blue-50    text-blue-600    border-blue-100',
  Review:       'bg-purple-50  text-purple-600  border-purple-100',
  Methodology:  'bg-orange-50  text-orange-600  border-orange-100',
  Paper:        'bg-green-50   text-green-600   border-green-100',
  Presentation: 'bg-pink-50    text-pink-600    border-pink-100',
  Brochure:     'bg-teal-50    text-teal-600    border-teal-100',
  Report:       'bg-indigo-50  text-indigo-600  border-indigo-100',
  Letter:       'bg-yellow-50  text-yellow-600  border-yellow-100',
  Admin:        'bg-gray-50    text-gray-600    border-gray-200',
}
const tagDark = {
  Proposal:     'dark:bg-blue-500/10    dark:text-blue-400    dark:border-blue-500/20',
  Review:       'dark:bg-purple-500/10  dark:text-purple-400  dark:border-purple-500/20',
  Methodology:  'dark:bg-orange-500/10  dark:text-orange-400  dark:border-orange-500/20',
  Paper:        'dark:bg-green-500/10   dark:text-green-400   dark:border-green-500/20',
  Presentation: 'dark:bg-pink-500/10    dark:text-pink-400    dark:border-pink-500/20',
  Brochure:     'dark:bg-teal-500/10    dark:text-teal-400    dark:border-teal-500/20',
  Report:       'dark:bg-indigo-500/10  dark:text-indigo-400  dark:border-indigo-500/20',
  Letter:       'dark:bg-yellow-500/10  dark:text-yellow-400  dark:border-yellow-500/20',
  Admin:        'dark:bg-gray-500/10    dark:text-gray-400    dark:border-gray-500/20',
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
        {doc.previewable ? (
          <button onClick={() => onPreview(doc)}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gray-50 dark:bg-white/5 hover:bg-green-50 dark:hover:bg-green-500/10 border border-gray-200 dark:border-white/10 hover:border-green-200 dark:hover:border-green-500/30 text-gray-500 dark:text-gray-400 hover:text-green-700 dark:hover:text-green-400 text-xs font-medium transition-all duration-300">
            <Eye size={14} />Preview
          </button>
        ) : (
          <span className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-300 dark:text-gray-600 text-xs font-medium cursor-not-allowed select-none">
            <Eye size={14} />No Preview
          </span>
        )}
        <a href={`/documents/${encodeURIComponent(doc.filename)}`} download={doc.name}
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
  const openPreview  = (doc) => { setPreviewUrl(`/documents/${encodeURIComponent(doc.filename)}`); setPreviewName(doc.name) }
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
