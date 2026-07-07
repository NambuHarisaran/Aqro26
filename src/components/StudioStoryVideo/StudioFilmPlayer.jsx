import { Player } from '@remotion/player'
import StudioStoryVideo, { TOTAL_FRAMES } from './StudioStoryVideo.jsx'

/* Lazy-loaded on Home so the Remotion player stays out of the initial bundle */
export default function StudioFilmPlayer() {
  return (
    <Player
      component={StudioStoryVideo}
      durationInFrames={TOTAL_FRAMES}
      fps={30}
      compositionWidth={1920}
      compositionHeight={1080}
      style={{ width: '100%', height: '100%' }}
      controls
      loop
      autoPlay
      acknowledgeRemotionLicense
    />
  )
}
