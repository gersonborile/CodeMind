import { CheckCircle2, Lightbulb, AlertTriangle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { ExerciseType } from "./exercise-badge"

interface FeedbackPanelProps {
  exerciseType: ExerciseType
  explanation: string
  aiErrorReason?: string // Only for debug exercises
}

export function FeedbackPanel({ exerciseType, explanation, aiErrorReason }: FeedbackPanelProps) {
  return (
    <Card className="border-primary/30 bg-primary/5">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-primary">Correcto</h3>
            <p className="text-sm text-muted-foreground">Buen trabajo</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-accent shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-medium text-accent uppercase tracking-wide">Por qué funciona así</span>
              <p className="text-sm text-foreground mt-1 leading-relaxed">{explanation}</p>
            </div>
          </div>
          
          {exerciseType === "debug" && aiErrorReason && (
            <div className="flex items-start gap-3 pt-2 border-t border-border/50">
              <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-medium text-destructive uppercase tracking-wide">
                  Por qué la IA comete este error
                </span>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{aiErrorReason}</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
