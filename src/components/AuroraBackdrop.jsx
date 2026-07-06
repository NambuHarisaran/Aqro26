export default function AuroraBackdrop() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_0%,#1a1d26_0%,#14161c_55%,#0f1116_100%)]" />
      {/* warm ember horizon — single amber light source, TimeWallet style */}
      <div className="absolute -top-44 left-1/2 -translate-x-1/2 h-[40rem] w-[46rem] rounded-full bg-amber/[0.07] blur-[150px] animate-pulse-soft" />
      <div className="absolute top-1/3 -left-56 h-[30rem] w-[30rem] rounded-full bg-denim/[0.06] blur-[130px]" />
      <div className="absolute -bottom-40 -right-40 h-[36rem] w-[36rem] rounded-full bg-amber/[0.05] blur-[140px]" />
    </div>
  )
}
