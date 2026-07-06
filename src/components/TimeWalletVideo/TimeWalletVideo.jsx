import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion'
import TimeWalletLogo from '../TimeWalletLogo.jsx'

/* Promo film for TimeWallet (in.no1ads.timewallet) — mirrors the real app's
   EARN → SPEND → DECIDE → GROW dashboard flow. Composition: 1080×1350 @ 30fps. */

const C = {
  ink: '#0f1116',
  deep: '#14161c',
  surface: '#1a1d26',
  raise: '#232733',
  amber: '#f2a93b',
  ember: '#f6c77e',
  mint: '#4fb286',
  mist: '#7c8597',
  paper: '#f0f2f6',
  red: '#f87171',
}

const DISPLAY = '"Anton", "Arial Narrow", sans-serif'
const SANS = '"Space Grotesk", sans-serif'

export const SCENES = {
  hook: 90,
  earn: 105,
  spend: 105,
  decide: 105,
  grow: 90,
  outro: 90,
}
export const TOTAL_FRAMES = Object.values(SCENES).reduce((a, b) => a + b, 0) // 585

function Backdrop() {
  return (
    <AbsoluteFill style={{ background: `radial-gradient(circle at 50% 35%, ${C.surface} 0%, ${C.ink} 75%)` }}>
      <div style={{ position: 'absolute', top: '14%', left: '10%', width: 420, height: 420, background: 'rgba(242,169,59,0.10)', filter: 'blur(140px)', borderRadius: '50%' }} />
      <div style={{ position: 'absolute', bottom: '12%', right: '8%', width: 480, height: 480, background: 'rgba(110,147,201,0.08)', filter: 'blur(160px)', borderRadius: '50%' }} />
    </AbsoluteFill>
  )
}

/* Fades a whole scene in/out at its edges */
function Scene({ len, children }) {
  const f = useCurrentFrame()
  const opacity = interpolate(f, [0, 12, len - 12, len], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
  return <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>
}

function Caption({ kicker, title, kickerColor = C.amber }) {
  const f = useCurrentFrame()
  const { fps } = useVideoConfig()
  const rise = spring({ frame: f, fps, config: { damping: 16, stiffness: 120 } })
  const y = interpolate(rise, [0, 1], [40, 0])
  return (
    <div style={{ textAlign: 'center', paddingTop: 76, transform: `translateY(${y}px)` }}>
      <div style={{ fontFamily: SANS, fontSize: 26, fontWeight: 700, letterSpacing: '0.45em', textTransform: 'uppercase', color: kickerColor }}>
        {kicker}
      </div>
      <div style={{ fontFamily: DISPLAY, fontSize: 76, textTransform: 'uppercase', color: C.paper, marginTop: 18, lineHeight: 1 }}>
        {title}
      </div>
    </div>
  )
}

function PhoneFrame({ children, delay = 6 }) {
  const f = useCurrentFrame()
  const { fps } = useVideoConfig()
  const pop = spring({ frame: f - delay, fps, config: { damping: 15, stiffness: 100 } })
  return (
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom: 60 }}>
      <div
        style={{
          width: 480,
          height: 940,
          borderRadius: 72,
          border: `16px solid ${C.raise}`,
          background: C.deep,
          boxShadow: '0 50px 120px -30px rgba(0,0,0,0.85), 0 0 70px rgba(242,169,59,0.14)',
          overflow: 'hidden',
          position: 'relative',
          transform: `scale(${interpolate(pop, [0, 1], [0.85, 1])})`,
          opacity: interpolate(f, [delay, delay + 10], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
        }}
      >
        <div style={{ position: 'absolute', top: 18, left: '50%', transform: 'translateX(-50%)', width: 140, height: 28, borderRadius: 16, background: C.ink, zIndex: 10 }} />
        <div style={{ position: 'absolute', inset: 0, padding: '80px 32px 32px', fontFamily: SANS }}>{children}</div>
      </div>
    </div>
  )
}

function AppHeader() {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
      <div>
        <div style={{ fontSize: 15, fontWeight: 700, color: C.mist, textTransform: 'uppercase', letterSpacing: '0.15em' }}>Welcome back</div>
        <div style={{ fontSize: 26, fontWeight: 600, color: C.paper, marginTop: 4 }}>Harisaran</div>
      </div>
      <div style={{ padding: '10px 18px', borderRadius: 18, background: 'rgba(242,169,59,0.1)', border: '1px solid rgba(242,169,59,0.25)' }}>
        <span style={{ fontSize: 17, fontWeight: 700, color: C.amber }}>₹ 300 / hr</span>
      </div>
    </div>
  )
}

function Card({ children, style = {} }) {
  return (
    <div style={{ background: `linear-gradient(135deg, ${C.raise} 0%, ${C.surface} 100%)`, borderRadius: 32, padding: 30, border: '1px solid rgba(124,133,151,0.16)', ...style }}>
      {children}
    </div>
  )
}

function Label({ children, color = C.mist }) {
  return (
    <span style={{ fontSize: 14, fontWeight: 700, color, textTransform: 'uppercase', letterSpacing: '0.18em' }}>{children}</span>
  )
}

/* ── Scene 1: Hook ── */
function SceneHook() {
  const f = useCurrentFrame()
  const { fps } = useVideoConfig()
  const len = SCENES.hook

  const line1 = interpolate(f, [5, 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const strike = interpolate(f, [30, 42], [0, 100], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const reveal = spring({ frame: f - 44, fps, config: { damping: 12, stiffness: 110 } })
  const sub = interpolate(f, [62, 74], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

  return (
    <Scene len={len}>
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 60 }}>
        <div style={{ fontFamily: SANS, fontSize: 30, fontWeight: 700, letterSpacing: '0.4em', textTransform: 'uppercase', color: C.mist, opacity: line1 }}>
          What did that
        </div>
        <div style={{ position: 'relative', marginTop: 26, opacity: line1 }}>
          <span style={{ fontFamily: DISPLAY, fontSize: 190, color: C.paper, lineHeight: 1 }}>₹500</span>
          <div style={{ position: 'absolute', top: '52%', left: 0, height: 10, width: `${strike}%`, background: C.red, borderRadius: 6 }} />
        </div>
        <div style={{ fontFamily: SANS, fontSize: 30, fontWeight: 700, letterSpacing: '0.4em', textTransform: 'uppercase', color: C.mist, marginTop: 26, opacity: line1 }}>
          really cost?
        </div>
        <div style={{ marginTop: 56, transform: `scale(${reveal})`, opacity: f >= 44 ? 1 : 0 }}>
          <span style={{ fontFamily: DISPLAY, fontSize: 150, color: C.amber, lineHeight: 1 }}>3h 28m</span>
        </div>
        <div style={{ fontFamily: SANS, fontSize: 32, color: C.paper, marginTop: 24, opacity: sub }}>
          of your life — at your real hourly wage.
        </div>
      </AbsoluteFill>
    </Scene>
  )
}

/* ── Scene 2: EARN — live earnings ticker ── */
function SceneEarn() {
  const f = useCurrentFrame()
  const { fps } = useVideoConfig()
  const len = SCENES.earn

  const tickStart = 26
  const seconds = Math.max(0, (f - tickStart) / fps) * 60 // time-lapse: 1 real s = 1 app min
  const earned = (seconds / 3600) * 300 * 60
  const mins = Math.floor(seconds)

  return (
    <Scene len={len}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column' }}>
        <Caption kicker="Earn" title="Your hours pay you, live" />
        <PhoneFrame>
          <AppHeader />
          <Card>
            <Label>Earning live</Label>
            <div style={{ fontSize: 64, fontWeight: 700, color: C.paper, marginTop: 14 }}>
              ₹ {earned.toFixed(2)}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 22, borderTop: '1px solid rgba(124,133,151,0.14)', paddingTop: 18 }}>
              <span style={{ fontSize: 18, color: C.mist }}>Time logged</span>
              <span style={{ fontSize: 19, fontWeight: 700, color: C.amber }}>{mins} min</span>
            </div>
          </Card>
          <Card style={{ marginTop: 22 }}>
            <Label>True hourly wage</Label>
            <div style={{ fontSize: 20, color: C.paper, marginTop: 12, lineHeight: 1.5 }}>
              Commute, taxes and prep time factored in — so every number is honest.
            </div>
          </Card>
        </PhoneFrame>
      </AbsoluteFill>
    </Scene>
  )
}

/* ── Scene 3: SPEND — expense priced in life-hours ── */
function SceneSpend() {
  const f = useCurrentFrame()
  const { fps } = useVideoConfig()
  const len = SCENES.spend

  const slide = spring({ frame: f - 22, fps, config: { damping: 13, stiffness: 95 } })
  const slideY = interpolate(slide, [0, 1], [140, 0])
  const convert = spring({ frame: f - 52, fps, config: { damping: 11, stiffness: 115 } })

  return (
    <Scene len={len}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column' }}>
        <Caption kicker="Spend" title="Every price, in life-hours" />
        <PhoneFrame>
          <AppHeader />
          <div style={{ transform: `translateY(${slideY}px)`, opacity: f >= 22 ? 1 : 0 }}>
            <Card style={{ border: '1px solid rgba(248,113,113,0.25)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <Label color={C.red}>New expense</Label>
                  <div style={{ fontSize: 26, fontWeight: 600, color: C.paper, marginTop: 8 }}>Impulse Coffee</div>
                </div>
                <div style={{ fontSize: 30, fontWeight: 700, color: C.red }}>− ₹250</div>
              </div>
              {f >= 52 && (
                <div style={{ marginTop: 26, paddingTop: 22, borderTop: '1px dotted rgba(124,133,151,0.25)', textAlign: 'center', transform: `scale(${convert})` }}>
                  <div style={{ fontSize: 19, color: C.mist }}>This cost you</div>
                  <div style={{ fontFamily: DISPLAY, fontSize: 62, color: C.amber, marginTop: 8 }}>50m OF YOUR LIFE</div>
                </div>
              )}
            </Card>
          </div>
          {f >= 78 && (
            <Card style={{ marginTop: 22, opacity: interpolate(f, [78, 88], [0, 1], { extrapolateRight: 'clamp' }) }}>
              <Label>Invisible work</Label>
              <div style={{ fontSize: 20, color: C.paper, marginTop: 12, lineHeight: 1.5 }}>
                Subscriptions surface as the work-days they quietly cost every year.
              </div>
            </Card>
          )}
        </PhoneFrame>
      </AbsoluteFill>
    </Scene>
  )
}

/* ── Scene 4: DECIDE — the "What's it worth?" quiz ── */
function SceneDecide() {
  const f = useCurrentFrame()
  const { fps } = useVideoConfig()
  const len = SCENES.decide

  const verdict = spring({ frame: f - 48, fps, config: { damping: 12, stiffness: 120 } })

  return (
    <Scene len={len}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column' }}>
        <Caption kicker="Decide" title={'"What’s it worth?"'} />
        <PhoneFrame>
          <AppHeader />
          <Card>
            <Label>Worth-it quiz</Label>
            <div style={{ fontSize: 26, fontWeight: 600, color: C.paper, marginTop: 12 }}>
              New headphones — ₹3,000?
            </div>
            <div style={{ fontSize: 19, color: C.mist, marginTop: 8 }}>= 10 hours of your work</div>
            {f >= 48 && (
              <div
                style={{
                  marginTop: 28,
                  padding: '20px 26px',
                  borderRadius: 24,
                  textAlign: 'center',
                  background: 'rgba(242,169,59,0.12)',
                  border: '1px solid rgba(242,169,59,0.35)',
                  transform: `scale(${verdict})`,
                }}
              >
                <div style={{ fontFamily: DISPLAY, fontSize: 44, color: C.amber }}>SLEEP ON IT</div>
                <div style={{ fontSize: 18, color: C.paper, marginTop: 8 }}>Put on a 24-hour hold ⏳</div>
              </div>
            )}
          </Card>
          {f >= 74 && (
            <Card style={{ marginTop: 22, border: '1px solid rgba(79,178,134,0.3)', opacity: interpolate(f, [74, 84], [0, 1], { extrapolateRight: 'clamp' }) }}>
              <div style={{ textAlign: 'center' }}>
                <Label color={C.mint}>Skipped it next day</Label>
                <div style={{ fontSize: 24, fontWeight: 700, color: C.mint, marginTop: 10 }}>+10 hours of life reclaimed</div>
              </div>
            </Card>
          )}
        </PhoneFrame>
      </AbsoluteFill>
    </Scene>
  )
}

/* ── Scene 5: GROW — goals counted in work-days ── */
function SceneGrow() {
  const f = useCurrentFrame()
  const len = SCENES.grow

  const progress = interpolate(f, [20, 62], [0, 62], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

  return (
    <Scene len={len}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column' }}>
        <Caption kicker="Grow" title="Goals in work-days" />
        <PhoneFrame>
          <AppHeader />
          <Card>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <Label>Goal</Label>
                <div style={{ fontSize: 26, fontWeight: 600, color: C.paper, marginTop: 8 }}>Goa Trip</div>
              </div>
              <div style={{ fontSize: 26, fontWeight: 700, color: C.paper }}>₹18,000</div>
            </div>
            <div style={{ marginTop: 26, height: 18, borderRadius: 10, background: C.ink, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${progress}%`, borderRadius: 10, background: `linear-gradient(90deg, ${C.amber}, ${C.ember})` }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 14 }}>
              <span style={{ fontSize: 18, color: C.mist }}>{Math.round(progress)}% saved</span>
              <span style={{ fontSize: 18, fontWeight: 700, color: C.amber }}>9 work-days left</span>
            </div>
          </Card>
          <Card style={{ marginTop: 22 }}>
            <Label>Weekly life receipt</Label>
            <div style={{ fontSize: 20, color: C.paper, marginTop: 12, lineHeight: 1.5 }}>
              Every Sunday: your week in hours — category split, best skip, one share card.
            </div>
          </Card>
        </PhoneFrame>
      </AbsoluteFill>
    </Scene>
  )
}

/* ── Scene 6: Outro — logo + store CTA ── */
function SceneOutro() {
  const f = useCurrentFrame()
  const { fps } = useVideoConfig()
  const len = SCENES.outro

  const logo = spring({ frame: f - 4, fps, config: { damping: 13, stiffness: 110 } })
  const tag = interpolate(f, [20, 32], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const badge = spring({ frame: f - 36, fps, config: { damping: 12, stiffness: 120 } })

  return (
    <Scene len={len}>
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 60 }}>
        <div style={{ transform: `scale(${logo})`, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <TimeWalletLogo style={{ width: 280, height: 280, color: C.paper }} />
        </div>
        <div style={{ fontFamily: SANS, fontSize: 34, color: C.mist, marginTop: 30, opacity: tag }}>
          Save your time the way you save your money.
        </div>
        <div
          style={{
            marginTop: 64,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 20,
            padding: '26px 44px',
            borderRadius: 32,
            background: C.amber,
            transform: `scale(${badge})`,
            opacity: f >= 36 ? 1 : 0,
          }}
        >
          <svg viewBox="0 0 24 24" width="44" height="44" style={{ fill: C.ink }} aria-hidden="true">
            <path d="M3 22.0003V2.00032C3 1.54732 3.25 1.13432 3.656 0.922316L14.77 12.0003L3.656 23.0783C3.25 22.8663 3 22.4533 3 22.0003ZM16.184 13.4143L20.344 15.8143C21.219 16.3193 21.219 17.6813 20.344 18.1863L16.184 20.5863L12.77 17.1723L16.184 13.4143ZM12.77 6.82832L16.184 10.2423L20.344 7.84232C21.219 7.33732 21.219 5.97532 20.344 5.47032L16.184 7.87032L12.77 6.82832Z" />
          </svg>
          <div style={{ textAlign: 'left', fontFamily: SANS }}>
            <div style={{ fontSize: 16, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: C.ink }}>Free on</div>
            <div style={{ fontSize: 30, fontWeight: 700, color: C.ink }}>Google Play</div>
          </div>
        </div>
        <div style={{ fontFamily: SANS, fontSize: 24, color: C.mist, marginTop: 44, opacity: tag, letterSpacing: '0.2em' }}>
          AQRO.IN/TIMEWALLET
        </div>
      </AbsoluteFill>
    </Scene>
  )
}

export default function TimeWalletVideo() {
  const s = SCENES
  let at = 0
  const seq = []
  for (const [name, len] of Object.entries(s)) {
    seq.push({ name, from: at, len })
    at += len
  }
  const byName = Object.fromEntries(seq.map((x) => [x.name, x]))

  return (
    <AbsoluteFill style={{ fontFamily: SANS }}>
      <Backdrop />
      <Sequence from={byName.hook.from} durationInFrames={byName.hook.len}>
        <SceneHook />
      </Sequence>
      <Sequence from={byName.earn.from} durationInFrames={byName.earn.len}>
        <SceneEarn />
      </Sequence>
      <Sequence from={byName.spend.from} durationInFrames={byName.spend.len}>
        <SceneSpend />
      </Sequence>
      <Sequence from={byName.decide.from} durationInFrames={byName.decide.len}>
        <SceneDecide />
      </Sequence>
      <Sequence from={byName.grow.from} durationInFrames={byName.grow.len}>
        <SceneGrow />
      </Sequence>
      <Sequence from={byName.outro.from} durationInFrames={byName.outro.len}>
        <SceneOutro />
      </Sequence>
    </AbsoluteFill>
  )
}
