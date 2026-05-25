import { useState, useEffect, useCallback } from 'react'
import { type Word, EMOJI_MAP } from '../data/types'
import { useSpeak } from '../hooks/useSpeak'

interface Props {
  words: Word[]
  onCorrect: (word: string) => void
}

export function ListenPick({ words, onCorrect }: Props) {
  const picturable = words.filter(w => EMOJI_MAP[w.w])
  const { speak } = useSpeak()
  const [current, setCurrent] = useState<Word>(picturable[0])
  const [options, setOptions] = useState<Word[]>([])
  const [result, setResult] = useState<'correct' | 'wrong' | null>(null)

  const next = useCallback(() => {
    const word = picturable[Math.floor(Math.random() * picturable.length)]
    const others = picturable.filter(w => w.w !== word.w).sort(() => Math.random() - 0.5).slice(0, 3)
    setCurrent(word)
    setOptions([...others, word].sort(() => Math.random() - 0.5))
    setResult(null)
    setTimeout(() => speak(word.w), 400)
  }, [picturable, speak])

  useEffect(() => { next() }, [])

  const pick = (w: Word) => {
    if (result) return
    if (w.w === current.w) {
      setResult('correct')
      onCorrect(w.w)
      setTimeout(next, 1500)
    } else {
      setResult('wrong')
      speak(current.w)
      setTimeout(() => setResult(null), 1000)
    }
  }

  return (
    <div className="game-container">
      <div className="prompt-area">
        <span className="listen-icon">👂</span>
        <button className="speak-btn big" onClick={() => speak(current.w)}>🔊 再听一次</button>
      </div>
      <div className="choices grid-2x2">
        {options.map(w => (
          <button
            key={w.w}
            className={`choice-btn emoji-choice ${result === 'correct' && w.w === current.w ? 'correct' : ''}`}
            onClick={() => pick(w)}
          >
            <span className="big-emoji">{EMOJI_MAP[w.w]}</span>
            <span className="choice-zh">{w.zh.split(',')[0]}</span>
          </button>
        ))}
      </div>
      {result === 'correct' && <div className="reward">🌟🎊</div>}
    </div>
  )
}
