import Link from "next/link"
import { notFound } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, BookOpen, Star, Trophy } from "lucide-react"
import { Header } from "@/components/landing/header"

const languages: Record<string, { name: string; color: string; description: string }> = {
  python: {
    name: "Python",
    color: "#3776AB",
    description: "El lenguaje más popular para aprender. Sintaxis clara, ideal para scripting, data science y automatización.",
  },
  javascript: {
    name: "JavaScript",
    color: "#F7DF1E",
    description: "El lenguaje de la web. Esencial para frontend, cada vez más usado en backend con Node.js.",
  },
  typescript: {
    name: "TypeScript",
    color: "#3178C6",
    description: "JavaScript con tipos. Menos errores, mejor autocompletado, código más mantenible a escala.",
  },
  sql: {
    name: "SQL",
    color: "#E48E00",
    description: "El lenguaje de las bases de datos. Consulta, filtra y transforma datos de forma declarativa.",
  },
}

const levels = [
  {
    id: "basico",
    name: "Básico",
    description: "Variables, tipos de datos, operadores básicos y estructuras de control simples.",
    icon: BookOpen,
    exercises: 8,
  },
  {
    id: "intermedio",
    name: "Intermedio",
    description: "Funciones, estructuras de datos, manejo de errores y patrones comunes.",
    icon: Star,
    exercises: 10,
  },
  {
    id: "avanzado",
    name: "Avanzado",
    description: "Programación orientada a objetos, algoritmos, optimización y mejores prácticas.",
    icon: Trophy,
    exercises: 12,
  },
]

interface LanguagePageProps {
  params: Promise<{ language: string }>
}

export default async function LanguagePage({ params }: LanguagePageProps) {
  const { language } = await params
  const lang = languages[language]
  
  if (!lang) {
    notFound()
  }
  
  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-3xl mx-auto px-6 py-12">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al inicio
        </Link>
        
        {/* Language header */}
        <div className="mb-12">
          <div
            className="w-16 h-16 rounded-xl flex items-center justify-center mb-6"
            style={{ backgroundColor: `${lang.color}20` }}
          >
            <span className="text-3xl font-bold" style={{ color: lang.color }}>
              {lang.name[0]}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{lang.name}</h1>
          <p className="text-muted-foreground text-lg">{lang.description}</p>
        </div>
        
        {/* Levels */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Niveles</h2>
          
          {levels.map((level, index) => (
            <Link key={level.id} href={`/learn/${language}/${level.id}`}>
              <Card className="group border-border/50 bg-card hover:border-border hover:bg-secondary/30 transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${lang.color}15` }}
                    >
                      <level.icon className="w-6 h-6" style={{ color: lang.color }} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">Nivel {index + 1}</span>
                      </div>
                      <h3 className="text-lg font-semibold">{level.name}</h3>
                      <p className="text-sm text-muted-foreground">{level.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">{level.exercises} ejercicios</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all shrink-0" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}

export function generateStaticParams() {
  return Object.keys(languages).map((language) => ({ language }))
}
