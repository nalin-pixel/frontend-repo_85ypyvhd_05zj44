import { useState } from 'react'
import { Plus, Upload, Palette } from 'lucide-react'

const formatOptions = ['Sticker', 'Poster', 'Badge']
const artStyleOptions = ['Anime', 'Manga', 'Chibi', 'Realistic']
const colorPaletteOptions = ['Vibrant', 'Pastel', 'Monochrome']

function DesignForm() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [sessionId, setSessionId] = useState(null)
  const [title, setTitle] = useState('Ahmedabad x Anime Concept')
  const [files, setFiles] = useState([])
  const [pose, setPose] = useState('')
  const [background, setBackground] = useState('')
  const [composition, setComposition] = useState('')
  const [narrative, setNarrative] = useState('')

  const [variations, setVariations] = useState([
    { format: 'Sticker', art_style: 'Anime', color_palette: 'Vibrant' },
    { format: 'Poster', art_style: 'Manga', color_palette: 'Monochrome' },
  ])

  const [output, setOutput] = useState(null)
  const [loading, setLoading] = useState(false)

  const createSession = async () => {
    const res = await fetch(`${baseUrl}/api/session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    })
    const data = await res.json()
    setSessionId(data.id)
  }

  const uploadImages = async () => {
    if (!sessionId) return alert('Create a session first')
    const form = new FormData()
    for (const f of files) form.append('files', f)
    const res = await fetch(`${baseUrl}/api/session/${sessionId}/upload`, { method: 'POST', body: form })
    const data = await res.json()
    return data
  }

  const applyCustomization = async () => {
    if (!sessionId) return alert('Create a session first')
    const payload = { pose_change: pose || undefined, background: background || undefined, composition: composition || undefined, narrative: narrative || undefined }
    const res = await fetch(`${baseUrl}/api/session/${sessionId}/customize`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const data = await res.json()
    return data
  }

  const generate = async () => {
    if (!sessionId) return alert('Create a session first')
    setLoading(true)
    try {
      await uploadImages()
      await applyCustomization()
      const res = await fetch(`${baseUrl}/api/session/${sessionId}/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ variations }),
      })
      const data = await res.json()
      setOutput(data)
    } finally {
      setLoading(false)
    }
  }

  const addVariation = () => {
    if (variations.length >= 4) return
    setVariations([...variations, { format: 'Badge', art_style: 'Chibi', color_palette: 'Pastel' }])
  }
  const updateVariation = (i, key, value) => {
    setVariations(variations.map((v, idx) => (idx === i ? { ...v, [key]: value } : v)))
  }

  return (
    <section className="py-12 md:py-16 bg-slate-950">
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-8">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h3 className="text-white font-semibold text-lg">1) Create a session</h3>
          <div className="mt-3 flex gap-2">
            <input value={title} onChange={(e) => setTitle(e.target.value)} className="flex-1 bg-white/10 border border-white/10 rounded px-3 py-2 text-white placeholder-white/50" placeholder="Session title" />
            <button onClick={createSession} className="px-3 py-2 rounded bg-emerald-500 text-white">Create</button>
          </div>
          {sessionId && <p className="mt-2 text-emerald-300 text-sm">Session created ✓</p>}

          <h3 className="text-white font-semibold text-lg mt-8">2) Upload reference images</h3>
          <label className="mt-3 block">
            <div className="flex items-center gap-2 text-white/80"><Upload size={16}/> <span>Select images</span></div>
            <input type="file" multiple onChange={(e) => setFiles(Array.from(e.target.files || []))} className="mt-2 text-white/70" />
          </label>

          <h3 className="text-white font-semibold text-lg mt-8">3) Describe customizations</h3>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <input className="bg-white/10 border border-white/10 rounded px-3 py-2 text-white" placeholder="Pose change" value={pose} onChange={(e)=>setPose(e.target.value)} />
            <input className="bg-white/10 border border-white/10 rounded px-3 py-2 text-white" placeholder="Background" value={background} onChange={(e)=>setBackground(e.target.value)} />
            <input className="bg-white/10 border border-white/10 rounded px-3 py-2 text-white" placeholder="Composition" value={composition} onChange={(e)=>setComposition(e.target.value)} />
            <input className="bg-white/10 border border-white/10 rounded px-3 py-2 text-white" placeholder="Narrative" value={narrative} onChange={(e)=>setNarrative(e.target.value)} />
          </div>

          <h3 className="text-white font-semibold text-lg mt-8">4) Style variations (2–4)</h3>
          <div className="mt-3 space-y-3">
            {variations.map((v, i) => (
              <div key={i} className="p-3 rounded-lg bg-white/5 border border-white/10 grid grid-cols-3 gap-2">
                <select value={v.format} onChange={(e)=>updateVariation(i,'format', e.target.value)} className="bg-white/10 border border-white/10 rounded px-2 py-2 text-white">
                  {formatOptions.map(o=> <option key={o} value={o}>{o}</option>)}
                </select>
                <select value={v.art_style} onChange={(e)=>updateVariation(i,'art_style', e.target.value)} className="bg-white/10 border border-white/10 rounded px-2 py-2 text-white">
                  {artStyleOptions.map(o=> <option key={o} value={o}>{o}</option>)}
                </select>
                <select value={v.color_palette} onChange={(e)=>updateVariation(i,'color_palette', e.target.value)} className="bg-white/10 border border-white/10 rounded px-2 py-2 text-white">
                  {colorPaletteOptions.map(o=> <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            ))}
            {variations.length < 4 && (
              <button onClick={addVariation} className="inline-flex items-center gap-2 px-3 py-2 rounded bg-white/10 border border-white/10 text-white">
                <Plus size={16}/> Add variation
              </button>
            )}
          </div>

          <button onClick={generate} disabled={!sessionId || loading} className="mt-6 px-4 py-2 rounded bg-blue-500 text-white disabled:opacity-50">
            {loading ? 'Generating…' : 'Generate Variations'}
          </button>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h3 className="text-white font-semibold text-lg flex items-center gap-2"><Palette size={18}/> Output</h3>
          {!output && <p className="mt-3 text-white/70">Create a session, upload references, set customizations, and generate variations. Results will appear here.</p>}
          {output?.variations && (
            <div className="mt-4 grid sm:grid-cols-2 gap-4">
              {output.variations.map((v, i) => (
                <div key={i} className="rounded-lg bg-white/5 border border-white/10 p-4">
                  <div className="aspect-video rounded bg-slate-900/60 flex items-center justify-center text-white/40 text-sm">{v.asset_url}</div>
                  <p className="mt-2 text-white text-sm font-medium">{v.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default DesignForm
