import * as React from "react"

import { cn } from "@/lib/utils"

function Input({
  className,
  type,
  ...props
}: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot='input'
      className={cn(
        // Base
        'w-full min-w-0 rounded-[var(--radius)] border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground shadow-sm transition-all outline-none',

        // Height lebih besar
        'h-11',

        // Focus state clean
        'focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/30',

        // Invalid state
        'aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20',

        // Disabled
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',

        className,
      )}
      {...props}
    />
  )
}


export { Input }
