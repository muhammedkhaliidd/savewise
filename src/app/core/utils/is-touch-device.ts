/** True on phones/tablets (any touch-capable device). Safe to call outside the browser. */
export function isTouchDevice(): boolean {
  return (
    typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)
  );
}
