"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

interface Progress {
  id: string;
  language: string;
  level: string;
  completed: boolean;
}

export default function DashboardPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [progress, setProgress] = useState<Progress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/sign-in");
    }
  }, [session, isPending, router]);

  useEffect(() => {
    if (session) {
      fetch("/api/progress")
        .then((res) => res.json())
        .then((data) => {
          setProgress(data);
          setLoading(false);
        });
    }
  }, [session]);

  const deleteProgress = async (id: string) => {
    await fetch("/api/progress", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setProgress((prev) => prev.filter((p) => p.id !== id));
  };

  if (isPending || loading) return (
    <div className="min-h-screen flex items-center justify-center">Cargando...</div>
  );

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Mi progreso</h1>
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            ← Volver al inicio
          </Link>
        </div>

        {progress.length === 0 ? (
          <p className="text-muted-foreground text-center mt-16">
            No tenés progreso guardado todavía. Completá ejercicios para verlos acá.
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {progress.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between p-4 rounded-xl border border-border bg-card"
              >
                <div>
                  <p className="font-semibold capitalize">{p.language}</p>
                  <p className="text-sm text-muted-foreground">{p.level}</p>
                </div>
                <div className="flex gap-2 items-center">
                  {p.completed ? (
                    <span className="text-green-500 text-sm font-semibold">Completado ✓</span>
                  ) : (
                    <span className="text-yellow-500 text-sm font-semibold">En progreso</span>
                  )}
                  <button
                    onClick={() => deleteProgress(p.id)}
                    className="text-sm px-3 py-1 rounded-lg border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}