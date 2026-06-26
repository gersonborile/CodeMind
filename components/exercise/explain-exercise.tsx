"use client"

import { useState } from "react"
import { ExerciseBadge } from "./exercise-badge"
import { CodeBlock } from "./code-block"
import { FeedbackPanel } from "./feedback-panel"

interface ExplainOption {
  id: string
  text: string
}

interface ExplainExerciseProps {
  code: string
  language: string
  options: ExplainOption[]
  correctOptionId: string
  explanation: string
  onCorrect: () => void
}

export function ExplainExercise({
  code,
  language,
  options,
  correctOptionId,
  explanation,
  onCorrect,
}: ExplainExerciseProps) {
  const [selected, setSelected] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)

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
        <ExerciseBadge type="explain" />
      </div>

      <p className="text-foreground">
        Antes de ejecutar este código, describí qué hace y qué resultado producirá.
      </p>

      <CodeBlock code={code} language={language} />

      <p className="text-sm text-muted-foreground font-medium">¿Qué hace este código?</p>

      <div className="flex flex-col gap-2">
        {(options ?? []).map((option) => (
          <button
            key={option.id}
            onClick={() => !submitted && setSelected(option.id)}
            className={`text-left px-4 py-3 rounded-xl border-2 transition-all text-sm ${getBorderColor(option.id)} ${submitted ? "cursor-default" : "cursor-pointer hover:border-primary"}`}
          >
            {option.text}
          </button>
        ))}
      </div>

      {isCorrect === false && (
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

      {submitted && (
        <FeedbackPanel
          exerciseType="explain"
          explanation={explanation}
        />
      )}
    </div>
  )
}