import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

interface LanguageCardProps {
  name: string
  slug: string
  description: string
  color: string
  icon: React.ReactNode
}

export function LanguageCard({ name, slug, description, color, icon }: LanguageCardProps) {
  return (
    <Link href={`/learn/${slug}`}>
      <Card className="group relative overflow-hidden border-border/50 bg-card hover:border-border hover:bg-secondary/30 transition-all duration-300 h-full">
        <div 
          className="absolute top-0 left-0 w-full h-1 opacity-80 group-hover:opacity-100 transition-opacity"
          style={{ backgroundColor: color }}
        />
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${color}20` }}
            >
              <div style={{ color }}>{icon}</div>
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
          </div>
          <h3 className="text-xl font-semibold mb-2">{name}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
          <div className="mt-4 flex gap-2">
            {["Básico", "Intermedio", "Avanzado"].map((level) => (
              <span 
                key={level}
                className="text-xs px-2 py-1 rounded bg-secondary text-muted-foreground"
              >
                {level}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
