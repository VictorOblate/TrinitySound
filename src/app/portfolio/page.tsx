
import Portfolio from '@/components/Portfolio'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function PortfolioPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Portfolio />
      </main>
      <Footer />
    </div>
  )
}
