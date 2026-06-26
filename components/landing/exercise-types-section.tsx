"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Bug, HelpCircle, PenLine, MessageSquare } from "lucide-react"

const exerciseTypes = [
  {
    icon: Bug,
    badge: "Debug this",
    title: "Encuentra el bug",
    description: "Código generado por IA con errores intencionales de lógica. Operadores incorrectos, loops mal construidos, variables mal usadas. Aprende a identificar lo que la IA hace mal.",
    color: "text-destructive",
    bgColor: "bg-destructive/10",
  },
  {
    icon: HelpCircle,
    badge: "Evaluate this",
    title: "Evalúa la respuesta",
    description: "Un prompt y la respuesta de la IA. Decide si el código es correcto y explica por qué. Desarrolla el criterio para saber cuándo confiar en la IA.",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: PenLine,
    badge: "Complete this",
    title: "Completa el código",
    description: "Fragmentos de código con partes faltantes. Rellena los espacios en blanco para que funcione. Practica la sintaxis y la lógica activamente.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: MessageSquare,
    badge: "Explain this",
    title: "Explica qué hace",
    description: "Lee el código y describe qué hace antes de ejecutarlo. Entrena tu capacidad de leer y entender código — la habilidad más importante de un programador.",
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
  },
]

export function ExerciseTypesSection() {
  return (
    <section id="exercises" className="py-20 px-6 bg-secondary/20">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">4 tipos de ejercicios</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Diseñados específicamente para la era de la IA. No solo escribes código — aprendes a evaluarlo, corregirlo y explicarlo.
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 gap-6">
          {exerciseTypes.map((type) => (
            <Card key={type.badge} className="border-border/50 bg-card/50 backdrop-blur">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${type.bgColor}`}>
                    <type.icon className={`w-6 h-6 ${type.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-sm font-mono ${type.color}`}>{type.badge}</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{type.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{type.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
