import { CheckCircle2 } from 'lucide-react'

const steps = [
  { title: 'Upload reference images', desc: 'We detect pose, proportions, key features, and colors.' },
  { title: 'Describe customizations', desc: 'Pose, background, composition, narrative — your call.' },
  { title: 'Pick styles', desc: 'Choose format, art style, and color palette combinations.' },
  { title: 'Generate 2–4 variants', desc: 'Preview labeled outputs ready for production.' },
]

function Workflow() {
  return (
    <section className="py-16 md:py-24 bg-slate-950">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tight">How it works</h2>
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <CheckCircle2 className="text-emerald-400" />
              <h3 className="mt-4 font-semibold text-white">{s.title}</h3>
              <p className="mt-2 text-white/70 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Workflow
