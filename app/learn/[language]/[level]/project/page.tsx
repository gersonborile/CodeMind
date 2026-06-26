"use client"

import { useState, use } from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Rocket } from "lucide-react"
import { Header } from "@/components/landing/header"
import { projectData } from "@/lib/project-data"

const languages: Record<string, { name: string; color: string }> = {
  python: { name: "Python", color: "#3776AB" },
  javascript: { name: "JavaScript", color: "#F7DF1E" },
  typescript: { name: "TypeScript", color: "#3178C6" },
  sql: { name: "SQL", color: "#E48E00" },
}

const levels: Record<string, string> = {
  basico: "Básico",
  intermedio: "Intermedio",
  avanzado: "Avanzado",
}

interface ProjectPageProps {
  params: Promise<{ language: string; level: string }>
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const { language, level } = use(params)
  const lang = languages[language]
  const levelName = levels[level]
  const project = projectData[language]?.[level]

  if (!lang || !levelName || !project) {
    notFound()
  }

  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)

  const updateAnswer = (id: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }))
    setIsCorrect(null)
  }

  const checkAnswer = () => {
    const allCorrect = project.blanks.every((blank) => {
      const userAnswer = (answers[blank.id] || "").trim().toLowerCase()
      const correctAnswer = blank.answer.trim().toLowerCase()
      return userAnswer === correctAnswer
    })

    setIsCorrect(allCorrect)
    if (allCorrect) {
      setShowFeedback(true)
    }
  }

  const renderCode = () => {
    const parts = project.codeTemplate.split(/(\{\{[^}]+\}\})/g)

    return parts.map((part, index) => {
      const match = part.match(/\{\{([^}]+)\}\}/)
      if (match) {
        const blankId = match[1]
        const blank = project.blanks.find((b) => b.id === blankId)
        return (
          <input
            key={index}
            type="text"
            value={answers[blankId] || ""}
            onChange={(e) => updateAnswer(blankId, e.target.value)}
            placeholder="???"
            className="inline-block w-24 h-7 px-2 mx-1 text-sm font-mono bg-input border border-primary/50 rounded focus:outline-none focus:border-primary"
            disabled={showFeedback}
          />
        )
      }
      return <span key={index}>{part}</span>
    })
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-3xl mx-auto px-6 py-8">
        <div className="flex items-center gap-2 mb-8">
          <Link
            href={`/learn/${language}/${level}`}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a {lang.name} {levelName}
          </Link>
        </div>

        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
            <Rocket className="w-5 h-5 text-accent" />
          </div>
          <div>
            <p className="text-xs font-medium text-accent uppercase tracking-wide">Mini Proyecto</p>
            <h1 className="text-2xl font-bold">{project.title}</h1>
          </div>
        </div>

        <p className="text-muted-foreground mb-8 ml-13">{project.description}</p>

        <div className="rounded-lg border border-border/50 overflow-hidden mb-6">
          <div className="flex items-center gap-2 px-4 py-2 border-b border-border/50 bg-secondary/50">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-destructive/60" />
              <div className="w-3 h-3 rounded-full bg-accent/60" />
              <div className="w-3 h-3 rounded-full bg-primary/60" />
            </div>
            <span className="text-xs text-muted-foreground font-mono ml-2">{language}</span>
          </div>
          <div className="p-4 bg-[oklch(0.11_0.01_260)]">
            <pre className="font-mono text-sm whitespace-pre-wrap leading-8">
              {renderCode()}
            </pre>
          </div>
        </div>

        <div className="flex flex-col gap-1.5 mb-6">
          {project.blanks.map((blank, index) => (
            <p key={blank.id} className="text-xs text-muted-foreground">
              Espacio {index + 1}: {blank.hint}
            </p>
          ))}
        </div>

        {isCorrect === false && (
          <p className="text-sm text-destructive mb-4">Alguna respuesta no es correcta. Revisá la sintaxis.</p>
        )}

        {!showFeedback && (
          <button
            onClick={checkAnswer}
            disabled={project.blanks.some((b) => !answers[b.id]?.trim())}
            className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
          >
            Verificar proyecto
          </button>
        )}

        {showFeedback && (
          <div className="rounded-xl border border-green-500/30 bg-green-500/5 p-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                <span className="text-green-500 text-sm">✓</span>
              </div>
              <span className="text-green-500 font-semibold">¡Proyecto completado!</span>
            </div>
            <p className="text-sm text-muted-foreground">{project.explanation}</p>
            <Link
              href={`/learn/${language}`}
              className="inline-flex items-center gap-2 mt-4 text-sm text-primary hover:underline font-medium"
            >
              Continuar con otro nivel →
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}