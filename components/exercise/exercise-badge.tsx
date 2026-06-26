import { Bug, HelpCircle, PenLine, MessageSquare, type LucideIcon } from "lucide-react"

export type ExerciseType = "debug" | "evaluate" | "complete" | "explain"

interface ExerciseBadgeProps {
  type: ExerciseType
}

const badgeConfig: Record<ExerciseType, { icon: LucideIcon; label: string; color: string; bgColor: string }> = {
  debug: {
    icon: Bug,
    label: "Encontrá el bug",
    color: "text-destructive",
    bgColor: "bg-destructive/10",
  },
  evaluate: {
    icon: HelpCircle,
    label: "Evaluá el código",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  complete: {
    icon: PenLine,
    label: "Completá el código",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  explain: {
    icon: MessageSquare,
    label: "Explicá el código",
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
  },
}

export function ExerciseBadge({ type }: ExerciseBadgeProps) {
  const config = badgeConfig[type]
  const Icon = config.icon
  
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${config.bgColor}`}>
      <Icon className={`w-4 h-4 ${config.color}`} />
      <span className={`text-sm font-medium ${config.color}`}>{config.label}</span>
    </div>
  )
}
