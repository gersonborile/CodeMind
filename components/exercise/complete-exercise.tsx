"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ExerciseBadge } from "./exercise-badge"
import { FeedbackPanel } from "./feedback-panel"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"

interface BlankSlot {
  id: string
  answer: string
  hint?: string
}

interface CompleteExerciseProps {
  codeTemplate: string // Use {{id}} for blanks
  language: string
  blanks: BlankSlot[]
  explanation: string
  onCorrect: () => void
}

export function CompleteExercise({
  codeTemplate,
  language,
  blanks,
  explanation,
  onCorrect,
}: CompleteExerciseProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)

  const updateAnswer = (id: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }))
  }

  const checkAnswer = () => {
    const allCorrect = blanks.every((blank) => {
      const userAnswer = (answers[blank.id] || "").trim().toLowerCase()
      const correctAnswer = blank.answer.trim().toLowerCase()
      return userAnswer === correctAnswer
    })
    
    setIsCorrect(allCorrect)
    if (allCorrect) {
      setShowFeedback(true)
      onCorrect()
    }
  }

  // Render code with input fields
  const renderCode = () => {
    const parts = codeTemplate.split(/(\{\{[^}]+\}\})/g)
    
    return parts.map((part, index) => {
      const match = part.match(/\{\{([^}]+)\}\}/)
      if (match) {
        const blankId = match[1]
        const blank = blanks.find((b) => b.id === blankId)
        return (
          <Input
            key={index}
            type="text"
            value={answers[blankId] || ""}
            onChange={(e) => updateAnswer(blankId, e.target.value)}
            placeholder="???"
            className="inline-block w-24 h-7 px-2 mx-1 text-sm font-mono bg-input border-primary/50 focus:border-primary"
            disabled={showFeedback}
          />
        )
      }
      return <span key={index}>{part}</span>
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <ExerciseBadge type="complete" />
      </div>
      
      <p className="text-foreground">
        Completa los espacios en blanco para que el código funcione correctamente.
      </p>
      
      {/* Code with blanks */}
      <div className="rounded-lg border border-border/50 overflow-hidden">
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
      
      {/* Hints */}
      <FieldGroup>
        {blanks.map((blank, index) => (
          <Field key={blank.id}>
            <FieldLabel className="text-xs text-muted-foreground">
              Espacio {index + 1}: {blank.hint}
            </FieldLabel>
          </Field>
        ))}
      </FieldGroup>
      
      {isCorrect === false && (
        <p className="text-sm text-destructive">
          Alguna respuesta no es correcta. Revisa la sintaxis.
        </p>
      )}
      
      {!showFeedback && (
        <Button 
          onClick={checkAnswer} 
          disabled={blanks.some((b) => !answers[b.id]?.trim())}
        >
          Verificar respuesta
        </Button>
      )}
      
      {showFeedback && (
        <FeedbackPanel
          exerciseType="complete"
          explanation={explanation}
        />
      )}
    </div>
  )
}
