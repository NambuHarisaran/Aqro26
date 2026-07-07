import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion'

/* Brand-story film for AQRO STUDIO — "From Spark to Orbit".
   Mirrors TimeWalletVideo's architecture. Composition: 1920×1080 @ 30fps (landscape homepage film). */

const C = {
  ink: '#0f1116',
  deep: '#14161c',
  surface: '#1a1d26',
  raise: '#232733',
  amber: '#f2a93b',
  ember: '#f6c77e',
  denim: '#6e93c9',
  mint: '#4fb286',
  paper: '#f0f2f6',
  mist: '#7c8597',
  line: '#262a33',
}

const DISPLAY = '"Anton", "Arial Narrow", sans-serif'
const SANS = '"Space Grotesk", sans-serif'
const MONO = 'ui-monospace, "Cascadia Code", "Courier New", monospace'
const CLAMP = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }

/* The protagonist: amber 4-point star (path reused from site's Sparkle.jsx) */
const STAR_PATH = 'M32 2c2 17.5 12.5 28 30 30-17.5 2-28 12.5-30 30-2-17.5-12.5-28-30-30C19.5 30 30 19.5 32 2z'
function Star({ size = 64, fill = C.amber, style = {} }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} style={style} aria-hidden="true">
      <path d={STAR_PATH} fill={fill} />
    </svg>
  )
}

export const SCENES = {
  spark: 110,
  discover: 95,
  design: 100,
  build: 105,
  ship: 110,
  proof: 95,
  outro: 115,
}
export const TOTAL_FRAMES = Object.values(SCENES).reduce((a, b) => a + b, 0) // 730

function Backdrop() {
  return (
    <AbsoluteFill style={{ background: `radial-gradient(circle at 50% 40%, ${C.surface} 0%, ${C.ink} 78%)` }}>
      <div style={{ position: 'absolute', top: '10%', left: '8%', width: 620, height: 620, background: 'rgba(242,169,59,0.09)', filter: 'blur(180px)', borderRadius: '50%' }} />
      <div style={{ position: 'absolute', bottom: '8%', right: '6%', width: 680, height: 680, background: 'rgba(110,147,201,0.06)', filter: 'blur(200px)', borderRadius: '50%' }} />
      <div style={{ position: 'absolute', bottom: '20%', left: '40%', width: 420, height: 420, background: 'rgba(79,178,134,0.04)', filter: 'blur(180px)', borderRadius: '50%' }} />
    </AbsoluteFill>
  )
}

/* Fades a whole scene in/out at its edges */
function Scene({ len, children }) {
  const f = useCurrentFrame()
  const opacity = interpolate(f, [0, 12, len - 12, len], [0, 1, 1, 0], CLAMP)
  return <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>
}

function Caption({ kicker, title, kickerColor = C.amber, titleColor = C.paper }) {
  const f = useCurrentFrame()
  const { fps } = useVideoConfig()
  const rise = spring({ frame: f, fps, config: { damping: 16, stiffness: 120 } })
  const y = interpolate(rise, [0, 1], [50, 0])
  return (
    <div style={{ textAlign: 'center', paddingTop: 92, transform: `translateY(${y}px)` }}>
      <div style={{ fontFamily: SANS, fontSize: 30, fontWeight: 700, letterSpacing: '0.5em', textTransform: 'uppercase', color: kickerColor }}>
        {kicker}
      </div>
      <div style={{ fontFamily: DISPLAY, fontSize: 104, textTransform: 'uppercase', color: titleColor, marginTop: 20, lineHeight: 1 }}>
        {title}
      </div>
    </div>
  )
}

function DottedGrid() {
  return (
    <AbsoluteFill
      style={{
        backgroundImage:
          `repeating-linear-gradient(0deg, ${C.line} 0px, ${C.line} 1px, transparent 1px, transparent 64px),` +
          `repeating-linear-gradient(90deg, ${C.line} 0px, ${C.line} 1px, transparent 1px, transparent 64px)`,
        opacity: 0.28,
      }}
    />
  )
}

/* ── Scene 1: SPARK — the idea at 02:47 AM ── */
function SceneSpark() {
  const f = useCurrentFrame()
  const { fps } = useVideoConfig()
  const len = SCENES.spark

  const flicker = interpolate(f, [3, 5, 7, 9, 12, 15, 21], [0, 0.5, 0.12, 0.72, 0.34, 0.85, 1], CLAMP)
  const l1 = interpolate(f, [22, 32], [0, 1], CLAMP)
  const l2 = interpolate(f, [31, 41], [0, 1], CLAMP)
  const slam = spring({ frame: f - 44, fps, config: { damping: 14, stiffness: 120 } })
  const slamScale = interpolate(slam, [0, 1], [1.5, 1])
  const starPop = spring({ frame: f - 60, fps, config: { damping: 12, stiffness: 110 } })
  const starRot = interpolate(f, [60, len], [0, 46], CLAMP)
  const glow = interpolate(f, [60, 80], [0, 1], CLAMP)
  const drift = interpolate(f, [90, len], [0, -34], CLAMP)

  return (
    <Scene len={len}>
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 1000, height: 1000, borderRadius: '50%', background: 'radial-gradient(circle, rgba(242,169,59,0.22) 0%, rgba(242,169,59,0) 62%)', opacity: glow }} />
      </AbsoluteFill>
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div style={{ transform: `translateY(${drift}px)`, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontFamily: MONO, fontSize: 34, letterSpacing: '0.5em', color: C.mist, opacity: flicker }}>02:47 AM</div>
          <div style={{ fontFamily: SANS, fontSize: 30, fontWeight: 700, letterSpacing: '0.4em', textTransform: 'uppercase', color: C.mist, marginTop: 44, opacity: l1 }}>
            Every big product
          </div>
          <div style={{ fontFamily: SANS, fontSize: 30, fontWeight: 700, letterSpacing: '0.4em', textTransform: 'uppercase', color: C.mist, marginTop: 14, opacity: l2 }}>
            starts as a
          </div>
          <div style={{ position: 'relative', marginTop: 34, opacity: f >= 44 ? 1 : 0, transform: `scale(${slamScale})` }}>
            <span style={{ fontFamily: DISPLAY, fontSize: 182, color: C.paper, lineHeight: 1, letterSpacing: '0.02em' }}>SPARK</span>
            <div style={{ position: 'absolute', top: -44, right: -78, transform: `rotate(${starRot}deg) scale(${starPop})` }}>
              <Star size={112} fill={C.amber} style={{ filter: 'drop-shadow(0 0 26px rgba(242,169,59,0.6))' }} />
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </Scene>
  )
}

/* ── Scene 2: DISCOVER — the questions ── */
function SceneDiscover() {
  const f = useCurrentFrame()
  const { fps } = useVideoConfig()
  const len = SCENES.discover
  const chips = ['Who is it for?', 'Why now?', 'What must it earn?']

  return (
    <Scene len={len}>
      <DottedGrid />
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column' }}>
        <Caption kicker="01 — Discover" title="We ask before we build" />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 44, padding: '0 140px' }}>
          {chips.map((c, i) => {
            const delay = 30 + i * 10
            const s = spring({ frame: f - delay, fps, config: { damping: 14, stiffness: 100 } })
            const x = interpolate(s, [0, 1], [-170, 0])
            const op = interpolate(f, [delay, delay + 8], [0, 1], CLAMP)
            const underline = interpolate(f, [delay + 8, delay + 28], [0, 100], CLAMP)
            return (
              <div key={c} style={{ flex: 1, transform: `translateX(${x}px)`, opacity: op }}>
                <div style={{ border: `2px solid ${C.line}`, borderRadius: 26, padding: '46px 40px', background: 'rgba(26,29,38,0.55)' }}>
                  <div style={{ fontFamily: SANS, fontSize: 20, fontWeight: 700, letterSpacing: '0.32em', color: C.mist }}>{`0${i + 1}`}</div>
                  <div style={{ fontFamily: SANS, fontSize: 42, fontWeight: 700, color: C.paper, marginTop: 18, lineHeight: 1.12 }}>{c}</div>
                  <div style={{ marginTop: 30, height: 5, width: `${underline}%`, background: `linear-gradient(90deg, ${C.amber}, ${C.ember})`, borderRadius: 4 }} />
                </div>
              </div>
            )
          })}
        </div>
      </AbsoluteFill>
    </Scene>
  )
}

function AssembleBlock({ delay, style }) {
  const f = useCurrentFrame()
  const { fps } = useVideoConfig()
  const s = spring({ frame: f - delay, fps, config: { damping: 13, stiffness: 115 } })
  const sc = interpolate(s, [0, 1], [0.55, 1])
  const op = interpolate(f, [delay, delay + 6], [0, 1], CLAMP)
  return <div style={{ transform: `scale(${sc})`, opacity: op, ...style }} />
}

/* ── Scene 3: DESIGN — the UI assembles ── */
function SceneDesign() {
  const f = useCurrentFrame()
  const { fps } = useVideoConfig()
  const len = SCENES.design

  const tilt = interpolate(f, [58, 76], [0, 2.5], CLAMP)
  const cursor = spring({ frame: f - 58, fps, config: { damping: 16, stiffness: 90 } })
  const cursorX = interpolate(cursor, [0, 1], [220, 0])
  const cursorY = interpolate(cursor, [0, 1], [150, 0])
  const clickFlash = interpolate(f, [76, 80, 92], [0, 1, 0], CLAMP)
  const pillSpring = spring({ frame: f - 44, fps, config: { damping: 12, stiffness: 120 } })
  const pillScale = interpolate(pillSpring, [0, 1], [0.55, 1]) * (1 + clickFlash * 0.07)
  const pillOp = interpolate(f, [44, 50], [0, 1], CLAMP)

  return (
    <Scene len={len}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column' }}>
        <Caption kicker="02 — Design" title="Bold. Tested. Sharp." />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div
            style={{
              position: 'relative',
              width: 920,
              height: 540,
              borderRadius: 28,
              border: `2px solid ${C.raise}`,
              background: C.deep,
              overflow: 'hidden',
              boxShadow: '0 50px 120px -30px rgba(0,0,0,0.8)',
              transform: `rotate(${tilt}deg)`,
            }}
          >
            {/* browser top bar */}
            <div style={{ height: 54, borderBottom: `1px solid ${C.line}`, display: 'flex', alignItems: 'center', padding: '0 24px', gap: 12 }}>
              <div style={{ width: 14, height: 14, borderRadius: '50%', background: C.raise }} />
              <div style={{ width: 14, height: 14, borderRadius: '50%', background: C.line }} />
              <div style={{ width: 14, height: 14, borderRadius: '50%', background: C.mist, opacity: 0.5 }} />
              <div style={{ flex: 1, marginLeft: 18, height: 24, borderRadius: 12, background: C.surface }} />
            </div>
            {/* content that assembles */}
            <div style={{ padding: 34 }}>
              <AssembleBlock delay={18} style={{ height: 40, borderRadius: 12, background: C.surface, marginBottom: 22 }} />
              <AssembleBlock delay={26} style={{ height: 158, borderRadius: 18, background: `linear-gradient(135deg, ${C.amber}, ${C.ember})`, marginBottom: 24 }} />
              <div style={{ display: 'flex', gap: 24 }}>
                <AssembleBlock delay={34} style={{ flex: 1, height: 128, borderRadius: 16, background: C.raise }} />
                <AssembleBlock delay={40} style={{ flex: 1, height: 128, borderRadius: 16, background: C.raise }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 26 }}>
                <div style={{ transform: `scale(${pillScale})`, opacity: pillOp, padding: '18px 46px', borderRadius: 999, background: clickFlash > 0.03 ? C.ember : C.amber, fontFamily: SANS, fontSize: 22, fontWeight: 700, color: C.ink }}>
                  Get started
                </div>
              </div>
            </div>
            {/* cursor dot that clicks the pill */}
            <div style={{ position: 'absolute', bottom: 66, right: 104, transform: `translate(${cursorX}px, ${cursorY}px)`, opacity: f >= 58 ? 1 : 0 }}>
              <div style={{ width: 22, height: 22, borderRadius: '50%', background: C.paper, boxShadow: '0 0 18px rgba(240,242,246,0.6)' }} />
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </Scene>
  )
}

/* ── Scene 4: BUILD & SHIP — the terminal ── */
function SceneBuild() {
  const f = useCurrentFrame()
  const len = SCENES.build

  const lines = [
    { text: '$ npm create aqro-app', start: 8, cps: 1.4, color: C.paper },
    { text: '▸ building… done in 3.2s', start: 32, cps: 1.4, color: C.mist },
    { text: '▸ tests 24/24 passed', start: 56, cps: 1.4, color: C.mist, mintFrom: '▸ tests 24/24 '.length },
    { text: '$ ship --to production 🚀', start: 80, cps: 1.4, color: C.paper },
  ]
  const cursorOn = f % 30 < 15
  const progress = interpolate(f, [12, 92], [0, 100], CLAMP)
  const activeIdx = lines.reduce((acc, l, i) => (f >= l.start ? i : acc), -1)

  return (
    <Scene len={len}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column' }}>
        <Caption kicker="03 — Build & Ship" title="Clean code. Weekly demos." />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 1000, borderRadius: 20, border: `1px solid ${C.line}`, background: C.deep, overflow: 'hidden', boxShadow: '0 50px 120px -34px rgba(0,0,0,0.8)' }}>
            <div style={{ height: 50, borderBottom: `1px solid ${C.line}`, display: 'flex', alignItems: 'center', gap: 11, padding: '0 22px' }}>
              <div style={{ width: 13, height: 13, borderRadius: '50%', background: C.raise }} />
              <div style={{ width: 13, height: 13, borderRadius: '50%', background: C.line }} />
              <div style={{ width: 13, height: 13, borderRadius: '50%', background: C.mist, opacity: 0.5 }} />
              <span style={{ marginLeft: 16, fontFamily: MONO, fontSize: 16, color: C.mist, letterSpacing: '0.08em' }}>aqro — zsh</span>
            </div>
            <div style={{ padding: '34px 40px', fontFamily: MONO, fontSize: 30, lineHeight: 1.7, minHeight: 260 }}>
              {lines.map((l, i) => {
                if (i > activeIdx) return null
                const rev = Math.max(0, Math.min(l.text.length, Math.floor((f - l.start) * l.cps)))
                const shown = l.text.slice(0, rev)
                const isActive = i === activeIdx
                let body
                if (l.mintFrom != null) {
                  body = (
                    <>
                      <span style={{ color: l.color }}>{shown.slice(0, l.mintFrom)}</span>
                      <span style={{ color: C.mint }}>{shown.slice(l.mintFrom)}</span>
                    </>
                  )
                } else {
                  body = <span style={{ color: l.color }}>{shown}</span>
                }
                return (
                  <div key={i}>
                    {body}
                    {isActive && cursorOn && (
                      <span style={{ display: 'inline-block', width: 14, height: 30, background: C.amber, marginLeft: 4, verticalAlign: 'text-bottom' }} />
                    )}
                  </div>
                )
              })}
            </div>
            <div style={{ height: 10, background: C.ink }}>
              <div style={{ height: '100%', width: `${progress}%`, background: `linear-gradient(90deg, ${C.amber}, ${C.ember})` }} />
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </Scene>
  )
}

/* ── Scene 5: SHIP — the launch to orbit ── */
function SceneShip() {
  const f = useCurrentFrame()
  const { fps } = useVideoConfig()
  const len = SCENES.ship

  const launchStart = 18
  const launchEnd = 78
  const posAt = (fr) => {
    const p = interpolate(fr, [launchStart, launchEnd], [0, 1], CLAMP)
    const xp = 1 - Math.pow(1 - p, 2) // ease-out
    const yp = Math.pow(p, 1.6) // ease-in
    return { x: interpolate(xp, [0, 1], [50, 80]), y: interpolate(yp, [0, 1], [86, 22]), p }
  }
  const main = posAt(f)
  const rot = interpolate(f, [launchEnd, len], [0, 72], CLAMP)
  const pulse = 1 + (main.p >= 1 ? 0.12 * Math.sin((f - launchEnd) * 0.35) : 0)
  const head = spring({ frame: f - 34, fps, config: { damping: 15, stiffness: 110 } })
  const headY = interpolate(head, [0, 1], [64, 0])
  const headOp = interpolate(f, [34, 46], [0, 1], CLAMP)
  const ghosts = [4, 8, 12, 16]

  return (
    <Scene len={len}>
      <AbsoluteFill style={{ background: `radial-gradient(circle at 50% 60%, ${C.deep} 0%, ${C.ink} 82%)` }} />
      {/* deterministic starfield */}
      {Array.from({ length: 14 }).map((_, i) => {
        const x = (i * 37) % 100
        const y = ((i * 53) % 82) + 6
        const size = 10 + (i % 3) * 6
        const tw = ((f + i * 7) % 44) / 44
        const op = interpolate(tw, [0, 0.5, 1], [0.12, 0.62, 0.12])
        return (
          <div key={i} style={{ position: 'absolute', left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)', opacity: op }}>
            <Star size={size} fill={i % 2 === 0 ? C.paper : C.mist} />
          </div>
        )
      })}
      {/* ember trail ghosts */}
      {ghosts.map((g, i) => {
        const gp = posAt(f - g)
        const op = interpolate(i, [0, ghosts.length - 1], [0.4, 0.08])
        return (
          <div key={`g${g}`} style={{ position: 'absolute', left: `${gp.x}%`, top: `${gp.y}%`, transform: 'translate(-50%, -50%)', opacity: main.p > 0 ? op : 0 }}>
            <Star size={44} fill={C.ember} />
          </div>
        )
      })}
      {/* hero amber star */}
      <div style={{ position: 'absolute', left: `${main.x}%`, top: `${main.y}%`, transform: `translate(-50%, -50%) rotate(${rot}deg) scale(${pulse})` }}>
        <Star size={72} fill={C.amber} style={{ filter: 'drop-shadow(0 0 30px rgba(242,169,59,0.7))' }} />
      </div>
      {/* headline */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', transform: `translateY(${headY}px)`, opacity: headOp }}>
          <div style={{ fontFamily: DISPLAY, fontSize: 150, color: C.paper, lineHeight: 0.95 }}>From idea</div>
          <div style={{ fontFamily: DISPLAY, fontSize: 150, lineHeight: 0.95 }}>
            <span style={{ color: C.paper }}>To </span>
            <span style={{ color: C.amber }}>orbit</span>
          </div>
        </div>
      </AbsoluteFill>
    </Scene>
  )
}

/* ── Scene 6: PROOF — shipped, not promised ── */
function SceneProof() {
  const f = useCurrentFrame()
  const { fps } = useVideoConfig()
  const len = SCENES.proof
  const stats = [
    { target: 6, suffix: '', label: 'Products live' },
    { target: 4, suffix: '', label: 'Industries' },
    { target: 1, suffix: '', label: 'App in the lab' },
    { target: 24, suffix: 'H', label: 'Reply time' },
  ]

  return (
    <Scene len={len}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column' }}>
        <Caption kicker="Shipped, not promised" title="By the numbers" />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 130px' }}>
          <div style={{ display: 'flex', width: '100%' }}>
            {stats.map((st, i) => {
              const delay = 24 + i * 9
              const s = spring({ frame: f - delay, fps, config: { damping: 14, stiffness: 110 } })
              const y = interpolate(s, [0, 1], [72, 0])
              const op = interpolate(f, [delay, delay + 8], [0, 1], CLAMP)
              const val = Math.round(interpolate(f, [delay + 6, delay + 30], [0, st.target], CLAMP))
              return (
                <div
                  key={st.label}
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    padding: '0 22px',
                    transform: `translateY(${y}px)`,
                    opacity: op,
                    borderLeft: i === 0 ? 'none' : `1px solid ${C.line}`,
                  }}
                >
                  <div style={{ fontFamily: DISPLAY, fontSize: 132, color: C.amber, lineHeight: 1 }}>
                    {val}
                    {st.suffix}
                  </div>
                  <div style={{ fontFamily: SANS, fontSize: 24, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: C.mist, marginTop: 18 }}>
                    {st.label}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </AbsoluteFill>
    </Scene>
  )
}

/* ── Scene 7: OUTRO — the wordmark ── */
function SceneOutro() {
  const f = useCurrentFrame()
  const { fps } = useVideoConfig()
  const len = SCENES.outro

  const starPop = spring({ frame: f - 4, fps, config: { damping: 12, stiffness: 110 } })
  const starRot = interpolate(f, [4, len], [0, 52], CLAMP)
  const wm = spring({ frame: f - 22, fps, config: { damping: 14, stiffness: 120 } })
  const wmScale = interpolate(wm, [0, 1], [1.4, 1])
  const wmOp = interpolate(f, [22, 30], [0, 1], CLAMP)
  const tag = interpolate(f, [46, 60], [0, 1], CLAMP)
  const cap = interpolate(f, [86, 100], [0, 1], CLAMP)

  return (
    <Scene len={len}>
      <AbsoluteFill style={{ background: `radial-gradient(circle at 50% 44%, ${C.deep} 0%, ${C.ink} 82%)` }} />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div style={{ transform: `rotate(${starRot}deg) scale(${starPop})` }}>
          <Star size={98} fill={C.amber} style={{ filter: 'drop-shadow(0 0 30px rgba(242,169,59,0.6))' }} />
        </div>
        <div style={{ transform: `scale(${wmScale})`, opacity: wmOp, marginTop: 34 }}>
          <div style={{ fontFamily: DISPLAY, fontSize: 152, color: C.paper, lineHeight: 0.88 }}>AQRO</div>
          <div style={{ fontFamily: DISPLAY, fontSize: 152, color: C.paper, lineHeight: 0.88 }}>STUDIO</div>
        </div>
        <div style={{ fontFamily: SANS, fontSize: 30, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: C.mist, marginTop: 42, opacity: tag }}>
          Create your next <span style={{ color: C.amber, fontWeight: 700 }}>star</span> together.
        </div>
        <div style={{ fontFamily: MONO, fontSize: 22, letterSpacing: '0.42em', color: C.mist, marginTop: 30, opacity: cap }}>AQRO.IN</div>
      </AbsoluteFill>
    </Scene>
  )
}

export default function StudioStoryVideo() {
  let at = 0
  const seq = []
  for (const [name, len] of Object.entries(SCENES)) {
    seq.push({ name, from: at, len })
    at += len
  }
  const byName = Object.fromEntries(seq.map((x) => [x.name, x]))

  return (
    <AbsoluteFill style={{ fontFamily: SANS, background: C.ink }}>
      <Backdrop />
      <Sequence from={byName.spark.from} durationInFrames={byName.spark.len}>
        <SceneSpark />
      </Sequence>
      <Sequence from={byName.discover.from} durationInFrames={byName.discover.len}>
        <SceneDiscover />
      </Sequence>
      <Sequence from={byName.design.from} durationInFrames={byName.design.len}>
        <SceneDesign />
      </Sequence>
      <Sequence from={byName.build.from} durationInFrames={byName.build.len}>
        <SceneBuild />
      </Sequence>
      <Sequence from={byName.ship.from} durationInFrames={byName.ship.len}>
        <SceneShip />
      </Sequence>
      <Sequence from={byName.proof.from} durationInFrames={byName.proof.len}>
        <SceneProof />
      </Sequence>
      <Sequence from={byName.outro.from} durationInFrames={byName.outro.len}>
        <SceneOutro />
      </Sequence>
    </AbsoluteFill>
  )
}
