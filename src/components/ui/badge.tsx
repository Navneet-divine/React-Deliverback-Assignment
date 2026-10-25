import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-rose-600 text-white shadow-xs",
        secondary:
          "border-transparent bg-emerald-100 text-emerald-800",
        destructive:
          "border-transparent bg-red-600 text-white shadow-xs",
        outline: "text-slate-700 border-slate-300",
        festive: "border-amber-300 bg-amber-50 text-amber-800",
        purple: "border-purple-200 bg-purple-50 text-purple-700",
        blue: "border-sky-200 bg-sky-50 text-sky-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
