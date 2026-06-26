"use client"

import Link from "next/link"
import { Code2 } from "lucide-react"
import { useSession, signOut } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

export function Header() {
  const { data: session } = useSession()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
    router.push("/")
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="max-w-8xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Code2 className="w-5 h-5 text-primary-foreground" />
          </div>
          <span>CodeMind</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="#languages" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Lenguajes
          </Link>
          <Link href="#exercises" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Ejercicios
          </Link>
          {session ? (
            <>
              <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Mi progreso
              </Link>
              <button
                onClick={handleSignOut}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link href="/sign-in" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Iniciar sesión
              </Link>
              <Link
                href="/sign-up"
                className="text-sm bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition"
              >
                Registrarse
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}