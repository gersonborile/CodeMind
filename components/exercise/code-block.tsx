"use client"

import { Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface CodeBlockProps {
  code: string
  language: string
  highlightLines?: number[]
  errorLines?: number[]
}

export function CodeBlock({ code, language, highlightLines = [], errorLines = [] }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const lines = code.split("\n")
  
  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  
  return (
    <div className="rounded-lg border border-border/50 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border/50 bg-secondary/50">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-destructive/60" />
            <div className="w-3 h-3 rounded-full bg-accent/60" />
            <div className="w-3 h-3 rounded-full bg-primary/60" />
          </div>
          <span className="text-xs text-muted-foreground font-mono ml-2">{language}</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 w-7 p-0"
          onClick={copyToClipboard}
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-primary" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
        </Button>
      </div>
      <div className="p-4 bg-[oklch(0.11_0.01_260)] overflow-x-auto">
        <pre className="font-mono text-sm">
          {lines.map((line, index) => {
            const lineNum = index + 1
            const isHighlighted = highlightLines.includes(lineNum)
            const isError = errorLines.includes(lineNum)
            
            return (
              <div
                key={index}
                className={`flex gap-4 ${
                  isError
                    ? "bg-destructive/10 -mx-4 px-4 border-l-2 border-destructive"
                    : isHighlighted
                    ? "bg-primary/10 -mx-4 px-4 border-l-2 border-primary"
                    : ""
                }`}
              >
                <span className="text-muted-foreground select-none w-6 text-right shrink-0">
                  {lineNum}
                </span>
                <span className="text-foreground">{line || " "}</span>
              </div>
            )
          })}
        </pre>
      </div>
    </div>
  )
}
