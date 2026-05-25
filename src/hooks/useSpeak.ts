import { useCallback, useRef } from 'react'

export function useSpeak() {
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null)

  const speak = useCallback((text: string, lang = 'en-US') => {
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text)
    u.lang = lang
    u.rate = 0.8
    utterRef.current = u
    window.speechSynthesis.speak(u)
  }, [])

  const stop = useCallback(() => window.speechSynthesis.cancel(), [])

  return { speak, stop }
}
