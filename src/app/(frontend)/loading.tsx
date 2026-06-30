export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Pagina wordt geladen"
      className="min-h-[70vh] flex items-center justify-center bg-surface"
    >
      <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
    </div>
  )
}
