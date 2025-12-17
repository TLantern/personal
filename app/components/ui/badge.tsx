import * as React from "react"
import { cn } from "../../../lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline"
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variantStyles = {
    default: "border-transparent bg-blue-500/20 text-blue-300 border-blue-500/30",
    secondary: "border-transparent bg-white/10 text-white/80 border-white/20",
    destructive: "border-transparent bg-red-500/20 text-red-300 border-red-500/30",
    outline: "text-white/80 border-white/20",
  }

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  )
}

export { Badge }

