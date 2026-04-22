import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Education from '@/components/Education'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import Certifications from '@/components/Certifications'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import InfiniteGridBackground from '@/components/ui/the-infinite-grid'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <InfiniteGridBackground>
        <About />
        <Skills />
        <Education />
        <Experience />
        <Projects />
        <Certifications />
        <Contact />
      </InfiniteGridBackground>
      <Footer />
    </main>
  )
}
