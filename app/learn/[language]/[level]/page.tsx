"use client"

import { useState, use, useEffect } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/landing/header"
import { TheoryBlock } from "@/components/exercise/theory-block"
import { ProgressBar } from "@/components/exercise/progress-bar"
import { MiniProjectCard } from "@/components/exercise/mini-project-card"
import { DebugExercise } from "@/components/exercise/debug-exercise"
import { EvaluateExercise } from "@/components/exercise/evaluate-exercise"
import { CompleteExercise } from "@/components/exercise/complete-exercise"
import { ExplainExercise } from "@/components/exercise/explain-exercise"
import { exerciseData } from "@/lib/exercise-data"

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

interface LevelPageProps {
  params: Promise<{ language: string; level: string }>
}

export default function LevelPage({ params }: LevelPageProps) {
  const { language, level } = use(params)
  const [currentExercise, setCurrentExercise] = useState(0)
  const [completedExercises, setCompletedExercises] = useState<Set<number>>(new Set())
  
  const lang = languages[language]
  const levelName = levels[level]
  
  if (!lang || !levelName) {
    notFound()
  }
  
  const exercises = exerciseData[language]?.[level] || []
  const exercise = exercises[currentExercise]
  
  if (!exercise) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="max-w-3xl mx-auto px-6 py-12">
          <p className="text-muted-foreground">No hay ejercicios disponibles para este nivel.</p>
        </main>
      </div>
    )
  }
  
  const handleCorrect = () => {
    setCompletedExercises((prev) => new Set([...prev, currentExercise]))
  }
  
  const goToNext = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise((prev) => prev + 1)
    }
  }
  
  const goToPrev = () => {
    if (currentExercise > 0) {
      setCurrentExercise((prev) => prev - 1)
    }
  }
  
  const isLevelComplete = completedExercises.size === exercises.length

useEffect(() => {
  if (completedExercises.size === exercises.length && exercises.length > 0) {
    const levelNames: Record<string, string> = {
      basico: "Básico",
      intermedio: "Intermedio",
      avanzado: "Avanzado",
    }
    fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ language, level: levelNames[level] || level }),
    })
  }
}, [completedExercises.size])
  
  const renderExercise = () => {
    switch (exercise.type) {
      case "debug":
        return (
          <DebugExercise
            key={currentExercise}
            code={exercise.code}
            language={language}
            errorLine={exercise.errorLine}
            prompt={exercise.prompt}
            options={exercise.options}
            correctOptionId={exercise.correctOptionId}
            explanation={exercise.explanation}
            aiErrorReason={exercise.aiErrorReason}
            onCorrect={handleCorrect}
          />
        )
      case "evaluate":
        return (
          <EvaluateExercise
            key={currentExercise}
            userPrompt={exercise.userPrompt}
            aiResponse={exercise.aiResponse}
            code={exercise.code}
            language={language}
            isCodeCorrect={exercise.isCodeCorrect}
            reasonOptions={exercise.reasonOptions}
            correctReasonId={exercise.correctReasonId}
            explanation={exercise.explanation}
            onCorrect={handleCorrect}
          />
        )
      case "complete":
        return (
          <CompleteExercise
            key={currentExercise}
            codeTemplate={exercise.codeTemplate}
            language={language}
            blanks={exercise.blanks}
            explanation={exercise.explanation}
            onCorrect={handleCorrect}
          />
        )
      case "explain":
        return (
          <ExplainExercise
            key={currentExercise}
            code={exercise.code}
            language={language}
            options={exercise.options}
            correctOptionId={exercise.correctOptionId}
            explanation={exercise.explanation}
            onCorrect={handleCorrect}
          />
        )
      default:
        return null
    }
  }
  
  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-3xl mx-auto px-6 py-8">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href={`/learn/${language}`}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {lang.name}
          </Link>
          <div className="flex items-center gap-2">
            <span
              className="px-3 py-1 rounded-full text-sm font-medium"
              style={{ backgroundColor: `${lang.color}20`, color: lang.color }}
            >
              {levelName}
            </span>
          </div>
        </div>
        
        {/* Progress */}
        <div className="mb-8">
          <ProgressBar current={completedExercises.size} total={exercises.length} />
        </div>
        
        {/* Theory block */}
        <div className="mb-8">
          <TheoryBlock content={exercise.theory} />
        </div>
        
        {/* Exercise */}
        <div className="bg-card border border-border/50 rounded-xl p-6 mb-8">
          {renderExercise()}
        </div>
        
        {/* Navigation buttons */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={goToPrev}
            disabled={currentExercise === 0}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Anterior
          </Button>
          
          <span className="text-sm text-muted-foreground">
            {currentExercise + 1} / {exercises.length}
          </span>
          
          <Button
            onClick={goToNext}
            disabled={currentExercise === exercises.length - 1 || !completedExercises.has(currentExercise)}
          >
            Siguiente
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
        
        {/* Mini project card - shows when level is complete */}
        {isLevelComplete && (
          <div className="mt-12">
            <MiniProjectCard
              title={`Mini Proyecto: ${lang.name} ${levelName}`}
              description="Aplica todo lo que aprendiste en este nivel construyendo algo real."
              href={`/learn/${language}/${level}/project`}
            />
          </div>
        )}
      </main>
    </div>
  )
}
