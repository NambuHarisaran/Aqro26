import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion'

export default function TimeWalletVideo() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  // 1. Phone entry scale & opacity animation
  const phoneScale = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 100 },
  })
  const phoneOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' })

  // 2. Keyboard typing simulation for Hourly Rate
  // Let's type "300" at frames 30 to 50
  const rateValue = interpolate(frame, [30, 36, 42, 48], [0, 3, 30, 300], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
  const typedRate = Math.floor(rateValue)

  // 3. Hourly Rate screen fade out & Dashboard screen fade in
  const rateScreenOpacity = interpolate(frame, [60, 70], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
  const dashboardOpacity = interpolate(frame, [68, 78], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  // 4. Live earning ticker (EARN mode)
  // Let's count up earnings in real time during frames 80 to 220
  const secondsElapsed = Math.max(0, (frame - 80) / fps)
  const ratePerSecond = 300 / 3600 // ₹300 per hour = ₹0.083 per second
  const liveEarning = (secondsElapsed * ratePerSecond).toFixed(2)
  const liveEarningTime = Math.floor(secondsElapsed)

  // 5. Expense entry sliding in from bottom
  const expenseTranslateY = spring({
    frame: frame - 130,
    fps,
    config: { damping: 12, stiffness: 90 },
  })
  const expenseY = interpolate(expenseTranslateY, [0, 1], [150, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const expenseOpacity = interpolate(frame, [130, 140], [0, 1], { extrapolateLeft: 'clamp' })

  // 6. Time Conversion Reveal
  const conversionScale = spring({
    frame: frame - 165,
    fps,
    config: { damping: 10, stiffness: 110 },
  })
  const conversionOpacity = interpolate(frame, [165, 175], [0, 1], { extrapolateLeft: 'clamp' })

  // 7. Success checkmark / Reclaimed message
  const successScale = spring({
    frame: frame - 235,
    fps,
    config: { damping: 12, stiffness: 130 },
  })
  const successOpacity = interpolate(frame, [235, 245], [0, 1], { extrapolateLeft: 'clamp' })

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle, #1a1d26 0%, #0f1116 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
        fontFamily: '"Space Grotesk", sans-serif',
      }}
    >
      {/* Decorative stars/glowing background spots */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '20%',
          width: 300,
          height: 300,
          background: 'rgba(242, 169, 59, 0.12)',
          filter: 'blur(100px)',
          borderRadius: '50%',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '20%',
          right: '20%',
          width: 350,
          height: 350,
          background: 'rgba(110, 147, 201, 0.08)',
          filter: 'blur(120px)',
          borderRadius: '50%',
        }}
      />

      {/* ── PHONE CHASSIS ── */}
      <div
        style={{
          width: 320,
          height: 640,
          borderRadius: 48,
          border: '12px solid #232733',
          background: '#14161c',
          boxShadow: '0 25px 60px -15px rgba(0,0,0,0.8), 0 0 40px rgba(242,169,59,0.15)',
          opacity: phoneOpacity,
          transform: `scale(${phoneScale})`,
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Dynamic Island / Speaker */}
        <div
          style={{
            position: 'absolute',
            top: 10,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 100,
            height: 18,
            borderRadius: 9,
            background: '#0f1116',
            zIndex: 100,
          }}
        />

        {/* ── SCREEN CONTENT ── */}
        <div style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column', paddingTop: 36, paddingLeft: 20, paddingRight: 20, paddingBottom: 20 }}>
          
          {/* SCREEN 1: Setup Wage (Frame 0 - 68) */}
          {frame < 68 && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                padding: '48px 20px 20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                opacity: rateScreenOpacity,
                background: '#14161c',
              }}
            >
              <div style={{ textAlign: 'center', marginBottom: 32 }}>
                <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.25em', color: '#f2a93b' }}>Setup Wage</span>
                <h3 style={{ fontSize: 24, fontWeight: 600, color: '#f0f2f6', marginTop: 8 }}>What is your real hourly wage?</h3>
              </div>

              <div
                style={{
                  background: '#232733',
                  borderRadius: 20,
                  padding: 24,
                  textAlign: 'center',
                  border: '1px solid rgba(124, 133, 151, 0.15)',
                }}
              >
                <div style={{ fontSize: 44, fontWeight: 700, color: '#f2a93b' }}>
                  ₹ {typedRate}
                  {frame >= 30 && frame < 54 && (
                    <span style={{ display: 'inline-block', width: 3, height: 38, background: '#f2a93b', marginLeft: 4, animation: 'blink 1s infinite' }}></span>
                  )}
                </div>
                <div style={{ fontSize: 12, color: '#7c8597', marginTop: 6 }}>per working hour</div>
              </div>

              <div style={{ marginTop: 40, fontSize: 12, color: '#7c8597', textAlign: 'center', lineHeight: 1.6 }}>
                Factors in your commute costs, tax, and work preparation time automatically.
              </div>
            </div>
          )}

          {/* SCREEN 2: Dashboard (Frame 68+) */}
          {frame >= 68 && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                padding: '48px 20px 20px',
                display: 'flex',
                flexDirection: 'column',
                opacity: dashboardOpacity,
                background: '#14161c',
              }}
            >
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <div>
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#7c8597', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Welcome back</span>
                  <div style={{ fontSize: 16, fontWeight: 600, color: '#f0f2f6' }}>Harisaran</div>
                </div>
                <div style={{ padding: '6px 12px', borderRadius: 12, background: 'rgba(242,169,59,0.1)', border: '1px solid rgba(242,169,59,0.2)' }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: '#f2a93b' }}>₹ 300 / hr</span>
                </div>
              </div>

              {/* Earn Section (Ticker) */}
              <div
                style={{
                  background: 'linear-gradient(135deg, #232733 0%, #1a1d26 100%)',
                  borderRadius: 24,
                  padding: 20,
                  border: '1px solid rgba(124,133,151,0.15)',
                  marginBottom: 16,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <span style={{ fontSize: 9, fontWeight: 700, color: '#7c8597', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Earning Live</span>
                <div style={{ display: 'flex', alignItems: 'baseline', marginTop: 8 }}>
                  <div style={{ fontSize: 32, fontWeight: 700, color: '#f0f2f6' }}>₹ {frame >= 80 ? liveEarning : '0.00'}</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, borderTop: '1px solid rgba(124,133,151,0.1)', paddingTop: 10 }}>
                  <div style={{ fontSize: 11, color: '#7c8597' }}>Time logged</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#f2a93b' }}>{frame >= 80 ? `${liveEarningTime} seconds` : '0s'}</div>
                </div>
              </div>

              {/* Expense Capture Simulation (Frame 130+) */}
              {frame >= 130 && (
                <div
                  style={{
                    background: '#1a1d26',
                    borderRadius: 20,
                    padding: 16,
                    border: '1px solid rgba(239, 68, 68, 0.15)',
                    opacity: expenseOpacity,
                    transform: `translateY(${expenseY}px)`,
                    marginBottom: 16,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <span style={{ fontSize: 9, fontWeight: 700, color: '#f87171', textTransform: 'uppercase', letterSpacing: '0.1em' }}>New Expense</span>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#f0f2f6', marginTop: 2 }}>Impulse Coffee</div>
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#f87171' }}>- ₹ 250</div>
                  </div>

                  {/* Conversion Reveal */}
                  {frame >= 165 && (
                    <div
                      style={{
                        marginTop: 12,
                        paddingTop: 10,
                        borderTop: '1px dotted rgba(124,133,151,0.2)',
                        textAlign: 'center',
                        opacity: conversionOpacity,
                        transform: `scale(${conversionScale})`,
                      }}
                    >
                      <div style={{ fontSize: 11, color: '#7c8597' }}>This cost you:</div>
                      <div style={{ fontSize: 20, fontWeight: 700, color: '#f2a93b', marginTop: 2 }}>50m of your life</div>
                    </div>
                  )}
                </div>
              )}

              {/* Reclaimed Celebration (Frame 235+) */}
              {frame >= 235 && (
                <div
                  style={{
                    background: 'linear-gradient(135deg, rgba(79, 178, 134, 0.1) 0%, rgba(20, 22, 28, 0.4) 100%)',
                    border: '1px solid rgba(79, 178, 134, 0.25)',
                    borderRadius: 20,
                    padding: 16,
                    textAlign: 'center',
                    opacity: successOpacity,
                    transform: `scale(${successScale})`,
                    marginTop: 'auto',
                  }}
                >
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#4fb286', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Decision Reclaimed</span>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#f0f2f6', marginTop: 4 }}>You skipped the buy!</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#4fb286', marginTop: 2 }}>+50 minutes of life saved</div>
                </div>
              )}

            </div>
          )}

        </div>
      </div>
    </div>
  )
}
