import { useEffect, useRef } from 'react'

// Head position follows the cursor's horizontal position across the window:
// far left of the screen = first frame, far right = last frame.
// Set to true if the head turns the opposite way to the mouse.
const REVERSE = false
// Seconds the head takes to close ~63% of the gap to the cursor (higher = smoother, floatier)
const SMOOTH_TIME = 0.45
// Cap on how fast the video may play while following, in video-seconds per real second
const MAX_SPEED = 1.6
// Fraction of each screen edge that counts as the fully-turned pose
const DEAD_ZONE = 0.05

/** Scrubs the returned video with the mouse, but only while `active` (slide is showing). */
export function useVideoScrub(active = true) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video || !active) return

    let desired = 0 // where the cursor says the video should be (seconds)
    let current = 0 // smoothed value we actually seek to
    let seeking = false
    let raf = 0
    let last = 0
    let moved = false

    const onMove = (e: MouseEvent) => {
      const d = video.duration
      if (!isFinite(d)) return
      let p = (e.clientX / window.innerWidth - DEAD_ZONE) / (1 - 2 * DEAD_ZONE)
      p = Math.min(Math.max(p, 0), 1)
      if (REVERSE) p = 1 - p
      if (!moved) {
        moved = true
        current = video.currentTime
      }
      desired = p * d
    }

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick)
      // Frame-rate independent: same feel on 60Hz and 144Hz screens
      const dt = Math.min((now - last) / 1000, 0.1)
      last = now
      if (!moved || seeking || !isFinite(video.duration)) return

      const alpha = 1 - Math.exp(-dt / SMOOTH_TIME)
      let step = (desired - current) * alpha
      const maxStep = MAX_SPEED * dt
      step = Math.max(-maxStep, Math.min(maxStep, step))
      current += step

      // Skip seeks smaller than about one frame (24 fps) to avoid stutter
      if (Math.abs(video.currentTime - current) < 1 / 24) return
      seeking = true
      video.currentTime = current
    }

    const onSeeked = () => {
      seeking = false
    }

    video.addEventListener('seeked', onSeeked)
    window.addEventListener('mousemove', onMove)
    last = performance.now()
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      video.removeEventListener('seeked', onSeeked)
      window.removeEventListener('mousemove', onMove)
    }
  }, [active])

  return videoRef
}
