import Spline from '@splinetool/react-spline'

function Hero() {
  return (
    <section className="relative min-h-[60vh] w-full overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 text-center max-w-3xl mx-auto px-6">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white drop-shadow-lg">AI Merchandise Design Assistant</h1>
        <p className="mt-4 text-base md:text-lg text-white/80">Upload references, specify customizations, and instantly generate production-ready variants for stickers, badges, and posters.</p>
        <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white">
          <span className="text-xs uppercase tracking-wider">Ahmedabad x Anime</span>
          <span className="text-white/40">•</span>
          <span className="text-xs">Pre-order & POD friendly</span>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950/90"></div>
    </section>
  )
}

export default Hero
