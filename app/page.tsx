import { Header } from "@/components/landing/header"
import { Hero } from "@/components/landing/hero"
import { LanguagesSection } from "@/components/landing/languages-section"
import { ExerciseTypesSection } from "@/components/landing/exercise-types-section"
import { CTASection } from "@/components/landing/cta-section"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <LanguagesSection />
        <ExerciseTypesSection />
        <CTASection />
      </main>
      <footer className="border-t border-border/50 py-8 px-6">
        <div className="max-w-5xl mx-auto text-center text-sm text-muted-foreground">
          <p>CodeMind — Aprende a programar en la era de la IA</p>
        </div>
      </footer>
    </div>
  )
}
