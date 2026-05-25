import { useState, useEffect, useRef } from 'react'
import { type Word, EMOJI_MAP } from '../data/types'
import { useSpeak } from '../hooks/useSpeak'

interface Props {
  words: Word[]
  onCorrect: (word: string) => void
}

export function BubblePop({ words, onCorrect }: Props) {
  const picturable = useRef(words.filter(w => EMOJI_MAP[w.w]))
  const { speak } = useSpeak()
  const [items, setItems] = useState<{id: number, word: string, emoji: string, x: number, bottom: number}[]>([])
  const [target, setTarget] = useState('')
  const [targetEmoji, setTargetEmoji] = useState('')
  const [score, setScore] = useState(0)
  const [speed, setSpeed] = useState(2) // 1=慢 2=中 3=快
  const nextId = useRef(0)

  function newTarget() {
    const w = picturable.current[Math.floor(Math.random() * picturable.current.length)]
    setTarget(w.w)
    setTargetEmoji(EMOJI_MAP[w.w])
    speak(w.w)
  }

  useEffect(() => { newTarget() }, [])

  useEffect(() => {
    const id = setInterval(() => {
      const pool = picturable.current
      // Ensure target word appears frequently
      const choices = [target, target]
      for (let i = 0; i < 2; i++) {
        choices.push(pool[Math.floor(Math.random() * pool.length)].w)
      }
      const pick = choices[Math.floor(Math.random() * choices.length)]
      const w = pool.find(p => p.w === pick) || pool[0]
      setItems(prev => [...prev.slice(-10), {
        id: nextId.current++,
        word: w.w,
        emoji: EMOJI_MAP[w.w],
        x: Math.floor(10 + Math.random() * 70),
        bottom: -10
      }])
    }, [2000, 1500, 1000][speed - 1])
    return () => clearInterval(id)
  }, [target, speed])

  useEffect(() => {
    const step = [1, 2, 3][speed - 1]
    const id = setInterval(() => {
      setItems(prev => prev
        .map(b => ({ ...b, bottom: b.bottom + step }))
        .filter(b => b.bottom < 100)
      )
    }, 200)
    return () => clearInterval(id)
  }, [speed])

  function handlePop(word: string, id: number) {
    if (word === target) {
      setItems(prev => prev.filter(b => b.id !== id))
      setScore(s => s + 1)
      onCorrect(word)
      setTimeout(newTarget, 500)
    } else {
      speak(target)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, width: '100%', height: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 12, fontSize: '1.4rem' }}>
        <span>戳 <b>{target}</b> {targetEmoji}</span>
        <button className="speak-btn" onClick={() => speak(target)}>🔊</button>
        <span style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>
          {[1,2,3].map(s => (
            <button key={s} onClick={() => setSpeed(s)} style={{
              padding: '6px 12px', border: 'none', borderRadius: 8,
              background: speed === s ? '#ff8c42' : '#eee',
              color: speed === s ? '#fff' : '#333',
              fontSize: '1rem', cursor: 'pointer'
            }}>{['🐢','🐇','🚀'][s-1]}</button>
          ))}
          <span style={{ marginLeft: 8 }}>⭐ {score}</span>
        </span>
      </div>
      <div style={{ position: 'relative', flex: 1, width: '100%', height: '70vh', overflow: 'hidden', background: '#f0f8ff', borderRadius: 16 }}>
        {items.map(b => (
          <div
            key={b.id}
            onClick={() => handlePop(b.word, b.id)}
            style={{
              position: 'absolute',
              left: `${b.x}%`,
              bottom: `${b.bottom}%`,
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: 'radial-gradient(circle at 30% 30%, #c8f0ff, #4fc3f7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2.5rem',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              transition: 'bottom 0.2s linear',
            }}
          >
            {b.emoji}
          </div>
        ))}
      </div>
    </div>
  )
}
