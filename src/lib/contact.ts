export function openContactModal() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("se-contact"));
  }
}
