// Merges Tailwind class strings together, filtering out falsy values.
// Use instead of template literals so conditional classes can be passed cleanly.
export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(" ");
}
