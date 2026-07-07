import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "gold" | "green" | "outline-white" | "sm-green" | "sm-outline";
type Size = "default" | "sm";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

// Lookup tables map each variant/size name to its Tailwind classes.
// This keeps the component body clean — no long ternary chains in JSX.
const variantStyles: Record<Variant, string> = {
  primary:
    "bg-gold text-gd font-bold hover:bg-gold2 hover:-translate-y-px active:translate-y-0 transition-all",
  ghost:
    "bg-transparent text-white border border-white/30 hover:border-white/70 transition-all",
  gold:
    "bg-gold text-gd font-semibold hover:bg-gold2 transition-colors",
  green:
    "bg-gm text-white font-semibold hover:bg-gd transition-colors",
  "outline-white":
    "bg-transparent border border-white/30 text-white hover:bg-white/10 transition-colors",
  "sm-green":
    "bg-gl text-white font-semibold hover:bg-gm transition-colors",
  "sm-outline":
    "bg-transparent border border-white/30 text-white hover:bg-white/10 transition-colors",
};

const sizeStyles: Record<Size, string> = {
  default: "px-7 py-3.5 text-[15px] rounded-[5px]",
  sm: "px-4 py-2 text-[13px] rounded",
};

// forwardRef lets parent components attach a ref to the underlying <button>
// element (e.g. to focus it programmatically) without breaking the abstraction.
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "default", className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          // Base reset shared by all buttons: flex centring, cursor, no outline, disabled state
          "inline-flex items-center justify-center cursor-pointer border-none outline-none disabled:opacity-50 disabled:cursor-not-allowed",
          variantStyles[variant],
          sizeStyles[size],
          // className prop lets callers add one-off overrides without losing the defaults
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export { Button };
