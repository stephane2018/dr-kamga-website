export function AnimatedBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/30 rounded-full blur-[100px] animate-blob"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/25 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] animate-blob animation-delay-4000"></div>
      <div className="absolute bottom-0 right-1/3 w-[500px] h-[500px] bg-primary/30 rounded-full blur-[100px] animate-blob animation-delay-6000"></div>
    </div>
  )
}
