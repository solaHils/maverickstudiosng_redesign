import { useEffect, useState } from 'react'

export function useTypewriter(text: string, speed = 38, startDelay = 600) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    setCount(0)
    let interval: number | undefined
    const start = window.setTimeout(() => {
      interval = window.setInterval(() => {
        setCount((c) => {
          if (c >= text.length) {
            window.clearInterval(interval)
            return c
          }
          return c + 1
        })
      }, speed)
    }, startDelay)
    return () => {
      window.clearTimeout(start)
      window.clearInterval(interval)
    }
  }, [text, speed, startDelay])

  return { displayed: text.slice(0, count), done: count >= text.length }
}
