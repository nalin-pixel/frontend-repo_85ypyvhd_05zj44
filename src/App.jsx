import Hero from './components/Hero'
import Workflow from './components/Workflow'
import DesignForm from './components/DesignForm'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Hero />
      <Workflow />
      <DesignForm />
      <Footer />
    </div>
  )
}

export default App
