import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Terminal, Sparkles } from "lucide-react"

export function Hero() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
      
      <div className="relative max-w-5xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-8">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm text-primary font-medium">La era de la IA requiere programadores</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-balance">
          Saber programar te da el{" "}
          <span className="text-primary">criterio</span>{" "}
          para usar bien la IA
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-pretty">
          Aprende a programar para evaluar, corregir y dirigir el código que genera la IA. 
          No dependas ciegamente — entiende lo que estás construyendo.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" className="h-12 px-8 text-base font-semibold">
            <Link href="#languages">
              <Terminal className="w-5 h-5 mr-2" />
              Empezar a aprender
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base">
            <Link href="#exercises">
              Ver tipos de ejercicios
            </Link>
          </Button>
        </div>
        
        {/* Code snippet preview */}
        <div className="mt-16 max-w-2xl mx-auto">
          <div className="rounded-lg border bg-card overflow-hidden text-left">
            <div className="flex items-center gap-2 px-4 py-2 border-b bg-secondary/50">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-accent/60" />
                <div className="w-3 h-3 rounded-full bg-primary/60" />
              </div>
              <span className="text-xs text-muted-foreground font-mono">exercise.py</span>
            </div>
            <div className="p-4 font-mono text-sm">
              <div className="flex gap-4">
                <span className="text-muted-foreground select-none w-6 text-right">1</span>
                <span><span className="syntax-keyword">def</span> <span className="syntax-function">calculate_average</span>(numbers):</span>
              </div>
              <div className="flex gap-4">
                <span className="text-muted-foreground select-none w-6 text-right">2</span>
                <span>    total <span className="syntax-operator">=</span> <span className="syntax-number">0</span></span>
              </div>
              <div className="flex gap-4">
                <span className="text-muted-foreground select-none w-6 text-right">3</span>
                <span>    <span className="syntax-keyword">for</span> num <span className="syntax-keyword">in</span> numbers:</span>
              </div>
              <div className="flex gap-4 bg-destructive/10 -mx-4 px-4 border-l-2 border-destructive">
                <span className="text-muted-foreground select-none w-6 text-right">4</span>
                <span>        total <span className="syntax-operator">=</span> num  <span className="syntax-comment"># Bug: should be +=</span></span>
              </div>
              <div className="flex gap-4">
                <span className="text-muted-foreground select-none w-6 text-right">5</span>
                <span>    <span className="syntax-keyword">return</span> total <span className="syntax-operator">/</span> <span className="syntax-function">len</span>(numbers)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
