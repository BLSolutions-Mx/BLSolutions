/**
 * Utility function to merge class names.
 * Filters out falsy values and joins them with spaces.
 * 
 * @param classes - Array of class names (strings, undefined, null, etc.)
 * @returns Combined class string
 */
export function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(" ");
}
