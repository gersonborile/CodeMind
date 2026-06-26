import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Rocket, ArrowRight } from "lucide-react"

interface MiniProjectCardProps {
  title: string
  description: string
  href: string
}

export function MiniProjectCard({ title, description, href }: MiniProjectCardProps) {
  return (
    <Link href={href}>
      <Card className="group border-accent/30 bg-accent/5 hover:border-accent/50 hover:bg-accent/10 transition-all">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center shrink-0">
              <Rocket className="w-6 h-6 text-accent" />
            </div>
            <div className="flex-1">
              <span className="text-xs font-medium text-accent uppercase tracking-wide">
                Ahora construí algo con esto
              </span>
              <h3 className="text-lg font-semibold mt-1 group-hover:text-accent transition-colors">
                {title}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">{description}</p>
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all shrink-0" />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
