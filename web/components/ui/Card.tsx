import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

// forwardRef is used on every card so parent components can attach a DOM ref
// (e.g. to measure height or focus the card) without breaking composition.

/* Base card shell — white background with a border and rounded corners */
const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "bg-white border border-eborder rounded-[6px] overflow-hidden",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

/* Card header row — flex row with a bottom border separator */
const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center gap-3 px-[18px] py-[14px] border-b border-eborder",
        className
      )}
      {...props}
    />
  )
);
CardHeader.displayName = "CardHeader";

/* Card body — consistent padding for the content area beneath the header */
const CardBody = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("px-[18px] py-[14px]", className)}
      {...props}
    />
  )
);
CardBody.displayName = "CardBody";

/* Dark variant — used for calls to action that need visual weight (dark green bg) */
const DarkCard = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <Card
      ref={ref}
      className={cn("bg-gd border-gd text-white", className)}
      {...props}
    />
  )
);
DarkCard.displayName = "DarkCard";

/* Royal blue variant — diagonal gradient, gold border; used for Kingdom/event cards */
const RoyalCard = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "bg-gradient-to-br from-royal to-[#0d2660] border-2 border-gold rounded-[6px] overflow-hidden",
        className
      )}
      {...props}
    />
  )
);
RoyalCard.displayName = "RoyalCard";

export { Card, CardHeader, CardBody, DarkCard, RoyalCard };
