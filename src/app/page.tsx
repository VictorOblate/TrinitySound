import Hero from '@/components/Hero'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        <Hero />
      </main>
      <Footer />
    </div>
  )
}