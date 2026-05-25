import { useState, useEffect, useCallback } from 'react'
import { type Word, EMOJI_MAP } from '../data/types'
import { useSpeak } from '../hooks/useSpeak'

interface Props {
  words: Word[]
  onCorrect: (word: string) => void
}

function pickChoices(correct: Word, pool: Word[], count: number): Word[] {
  const others = pool.filter(w => w.w !== correct.w && EMOJI_MAP[w.w])
  const shuffled = others.sort(() => Math.random() - 0.5).slice(0, count - 1)
  const choices = [...shuffled, correct].sort(() => Math.random() - 0.5)
  return choices
}

export function PictureMatch({ words, onCorrect }: Props) {
  const picturable = words.filter(w => EMOJI_MAP[w.w])
  const { speak } = useSpeak()
  const [current, setCurrent] = useState<Word>(picturable[0])
  const [choices, setChoices] = useState<Word[]>([])
  const [result, setResult] = useState<'correct' | 'wrong' | null>(null)

  const nextWord = useCallback(() => {
    const word = picturable[Math.floor(Math.random() * picturable.length)]
    setCurrent(word)
    setChoices(pickChoices(word, picturable, 3))
    setResult(null)
    setTimeout(() => speak(word.w), 300)
  }, [picturable, speak])

  useEffect(() => { nextWord() }, [])

  const handlePick = (word: Word) => {
    if (result) return
    if (word.w === current.w) {
      setResult('correct')
      onCorrect(word.w)
      setTimeout(nextWord, 1500)
    } else {
      setResult('wrong')
      setTimeout(() => setResult(null), 800)
    }
  }

  return (
    <div className="game-container">
      <div className="prompt-area">
        <span className="big-emoji">{EMOJI_MAP[current.w]}</span>
        <button className="speak-btn" onClick={() => speak(current.w)}>🔊</button>
      </div>
      <div className="choices">
        {choices.map(w => (
          <button
            key={w.w}
            className={`choice-btn ${result === 'correct' && w.w === current.w ? 'correct' : ''} ${result === 'wrong' && w.w !== current.w ? '' : ''}`}
            onClick={() => handlePick(w)}
          >
            <span className="choice-word">{w.w}</span>
            <span className="choice-zh">{w.zh.split(',')[0]}</span>
          </button>
        ))}
      </div>
      {result === 'correct' && <div className="reward">⭐🎉</div>}
    </div>
  )
}
