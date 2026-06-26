"use client"

import { useState } from "react"
import { ExerciseBadge } from "./exercise-badge"
import { CodeBlock } from "./code-block"
import { FeedbackPanel } from "./feedback-panel"

interface Option {
  id: string
  code: string
}

interface DebugExerciseProps {
  code: string
  language: string
  errorLine: number
  prompt: string
  options: Option[]
  correctOptionId: string
  explanation: string
  aiErrorReason: string
  onCorrect: () => void
}

export function DebugExercise({
  code,
  language,
  errorLine,
  prompt,
  options,
  correctOptionId,
  explanation,
  aiErrorReason,
  onCorrect,
}: DebugExerciseProps) {
  const [selected, setSelected] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)

  const handleSelect = (id: string) => {
    if (submitted) return
    setSelected(id)
    setIsCorrect(null)
  }

  const handleSubmit = () => {
    if (!selected) return
    const correct = selected === correctOptionId
    setIsCorrect(correct)
    if (correct) {
      setSubmitted(true)
      onCorrect()
    }
  }

  const getBorderColor = (id: string) => {
    if (!submitted && isCorrect === null) return selected === id ? "border-primary" : "border-border"
    if (submitted && id === correctOptionId) return "border-green-500"
    if (!submitted && isCorrect === false && id === selected) return "border-destructive"
    return "border-border"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <ExerciseBadge type="debug" />
      </div>

      <p className="text-foreground">{prompt}</p>

      <CodeBlock code={code} language={language} errorLines={[errorLine]} />

      <p className="text-sm text-muted-foreground font-medium">¿Cuál de estas versiones corrige el bug?</p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {(options ?? []).map((option) => (
          <button
            key={option.id}
            onClick={() => handleSelect(option.id)}
            className={`text-left rounded-xl border-2 p-3 transition-all ${getBorderColor(option.id)} ${submitted ? "cursor-default" : "cursor-pointer hover:border-primary"}`}
          >
            <span className="text-xs text-muted-foreground font-semibold mb-2 block">
              Opción {option.id.toUpperCase()}
            </span>
            <CodeBlock code={option.code} language={language} />
          </button>
        ))}
      </div>

      {isCorrect === false && !submitted && (
        <p className="text-sm text-destructive">Incorrecto, intentá de nuevo.</p>
      )}

      {!submitted && (
        <button
          onClick={handleSubmit}
          disabled={!selected}
          className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
        >
          Verificar respuesta
        </button>
      )}

      {submitted && isCorrect && (
        <FeedbackPanel
          exerciseType="debug"
          explanation={explanation}
          aiErrorReason={aiErrorReason}
        />
      )}
    </div>
  )
}