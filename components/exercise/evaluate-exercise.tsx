"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ExerciseBadge } from "./exercise-badge"
import { CodeBlock } from "./code-block"
import { FeedbackPanel } from "./feedback-panel"
import { User, Bot } from "lucide-react"

interface ReasonOption {
  id: string
  text: string
}

interface EvaluateExerciseProps {
  userPrompt: string
  aiResponse: string
  code: string
  language: string
  isCodeCorrect: boolean
  correctReasonId: string
  reasonOptions: ReasonOption[]
  explanation: string
  onCorrect: () => void
}

export function EvaluateExercise({
  userPrompt,
  aiResponse,
  code,
  language,
  isCodeCorrect,
  correctReasonId,
  reasonOptions,
  explanation,
  onCorrect,
}: EvaluateExerciseProps) {
  const [selectedVerdict, setSelectedVerdict] = useState<"correct" | "incorrect" | null>(null)
  const [selectedReason, setSelectedReason] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)

  const handleSubmit = () => {
    if (!selectedVerdict || !selectedReason) return
    const verdictCorrect = selectedVerdict === (isCodeCorrect ? "correct" : "incorrect")
    const reasonCorrect = selectedReason === correctReasonId
    const correct = verdictCorrect && reasonCorrect
    setIsCorrect(correct)
    if (correct) {
      setSubmitted(true)
      onCorrect()
    }
  }

  const getReasonBorderColor = (id: string) => {
    if (!submitted) return selectedReason === id ? "border-primary" : "border-border"
    if (id === correctReasonId) return "border-green-500"
    if (id === selectedReason && selectedReason !== correctReasonId) return "border-destructive"
    return "border-border"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <ExerciseBadge type="evaluate" />
      </div>

      <p className="text-foreground">Evalúa si la respuesta de la IA es correcta y explica por qué.</p>

      <div className="space-y-4">
        <Card className="border-border/50 bg-secondary/30">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                <User className="w-4 h-4 text-primary" />
              </div>
              <div>
                <span className="text-xs font-medium text-muted-foreground">Usuario</span>
                <p className="text-sm mt-1">{userPrompt}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-accent" />
              </div>
              <div className="flex-1">
                <span className="text-xs font-medium text-muted-foreground">IA</span>
                <p className="text-sm mt-1 mb-3">{aiResponse}</p>
                <CodeBlock code={code} language={language} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-3">
        <Button
          variant={selectedVerdict === "correct" ? "default" : "outline"}
          onClick={() => { if (!submitted) { setSelectedVerdict("correct"); setIsCorrect(null) } }}
          disabled={submitted}
          className="flex-1"
        >
          El código es correcto
        </Button>
        <Button
          variant={selectedVerdict === "incorrect" ? "default" : "outline"}
          onClick={() => { if (!submitted) { setSelectedVerdict("incorrect"); setIsCorrect(null) } }}
          disabled={submitted}
          className="flex-1"
        >
          El código tiene errores
        </Button>
      </div>

      <p className="text-sm text-muted-foreground font-medium">¿Por qué?</p>

      <div className="flex flex-col gap-2">
        {(reasonOptions ?? []).map((option) => (
          <button
            key={option.id}
            onClick={() => { if (!submitted) { setSelectedReason(option.id); setIsCorrect(null) } }}
            className={`text-left px-4 py-3 rounded-xl border-2 transition-all text-sm ${getReasonBorderColor(option.id)} ${submitted ? "cursor-default" : "cursor-pointer hover:border-primary"}`}
          >
            {option.text}
          </button>
        ))}
      </div>

      {isCorrect === false && (
        <p className="text-sm text-destructive">Incorrecto, intentá de nuevo.</p>
      )}

      {!submitted && (
        <Button
          onClick={handleSubmit}
          disabled={!selectedVerdict || !selectedReason}
        >
          Verificar respuesta
        </Button>
      )}

      {submitted && (
        <FeedbackPanel
          exerciseType="evaluate"
          explanation={explanation}
        />
      )}
    </div>
  )
}