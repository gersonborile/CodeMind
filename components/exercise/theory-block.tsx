import { BookOpen } from "lucide-react"

interface TheoryBlockProps {
  content: string
}

export function TheoryBlock({ content }: TheoryBlockProps) {
  return (
    <div className="rounded-lg border border-border/50 bg-secondary/30 p-4">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
          <BookOpen className="w-4 h-4 text-primary" />
        </div>
        <div>
          <span className="text-xs font-medium text-primary uppercase tracking-wide">Teoría</span>
          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{content}</p>
        </div>
      </div>
    </div>
  )
}
