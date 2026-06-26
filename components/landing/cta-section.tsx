import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Rocket } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-8 md:p-12">
          <Rocket className="w-12 h-12 text-primary mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Empieza a construir criterio
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
            No necesitas cuenta para empezar. Elige un lenguaje, selecciona un nivel y completa tu primer ejercicio en minutos.
          </p>
          <Button asChild size="lg" className="h-12 px-8 text-base font-semibold">
            <Link href="#languages">
              Empezar ahora
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
