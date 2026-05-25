import { useState, useCallback } from 'react'

interface Progress {
  learned: string[]
  stars: number
  day: string
}

const KEY = 'ogden-kids-progress'

function load(): Progress {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  return { learned: [], stars: 0, day: new Date().toDateString() }
}

function save(p: Progress) {
  localStorage.setItem(KEY, JSON.stringify(p))
}

export function useProgress() {
  const [progress, setProgress] = useState(load)

  const markLearned = useCallback((word: string) => {
    setProgress(prev => {
      const next = {
        ...prev,
        learned: prev.learned.includes(word) ? prev.learned : [...prev.learned, word],
        stars: prev.stars + 1
      }
      save(next)
      return next
    })
  }, [])

  const reset = useCallback(() => {
    const fresh: Progress = { learned: [], stars: 0, day: new Date().toDateString() }
    save(fresh)
    setProgress(fresh)
  }, [])

  return { progress, markLearned, reset }
}
