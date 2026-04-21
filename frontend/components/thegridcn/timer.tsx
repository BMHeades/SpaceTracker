import * as React from "react"
import { cn } from '../../lib/utils'
import "@fontsource/orbitron/400.css"; // normal
import "@fontsource/orbitron/700.css"; // bold

interface TimerProps extends React.HTMLAttributes<HTMLDivElement> {
  hours?: number
  minutes?: number
  seconds?: number
  label?: string
  sublabel?: string
  size?: "sm" | "md" | "lg" | "xl"
  variant?: "default" | "countdown" | "elapsed"
}

export function Timer({
  hours = 0,
  minutes = 0,
  seconds = 0,
  label = "ELAPSED",
  sublabel,
  size = "lg",
  variant = "default",
  className,
  ...props
}: TimerProps) {
  const formatNumber = (num: number) => String(num).padStart(2, "0")

  const sizeStyles = {
    sm: "text-5xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl",
    md: "text-4xl",
    lg: "text-6xl",
    xl: "text-8xl",
  }

  const variantStyles = {
    default: "text-foreground/80",
    countdown: "text-red-500",
    elapsed: "text-foreground/80",
  }

  return (
    <div className={cn("text-center", className)} {...props}>
      <div className="flex items-baseline justify-center gap-1">
        <span
          data-slot="tron-timer-value"
          data-variant={variant}
          className={cn(
            "orbitron uppercase tracking-tighter",
            sizeStyles[size],
            variantStyles[variant]
          )}
        >
          {formatNumber(hours)}:{formatNumber(minutes)}:{formatNumber(seconds)}
        </span>
        {label && (
          <span
            className={cn(
              "ml-2 font-mono uppercase tracking-widest text-foreground/80",
              size === "xl" && "text-2xl",
              size === "lg" && "text-xl",
              size === "md" && "text-base",
              size === "sm" && "text-sm"
            )}
          >
            {label}
          </span>
        )}
      </div>
      {sublabel && (
        <div
          className={cn(
            "mt-2 font-mono uppercase tracking-widest text-foreground/60",
            size === "xl" && "text-3xl",
            size === "lg" && "text-2xl",
            size === "md" && "text-lg",
            size === "sm" && "text-base"
          )}
        >
          {sublabel}
        </div>
      )}
    </div>
  )
}