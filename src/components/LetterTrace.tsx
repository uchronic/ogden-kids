import { useRef, useState, useEffect, useCallback } from 'react'
import { type Word, EMOJI_MAP } from '../data/types'
import { useSpeak } from '../hooks/useSpeak'

interface Props {
  words: Word[]
  onCorrect: (word: string) => void
}

export function LetterTrace({ words, onCorrect }: Props) {
  const picturable = words.filter(w => EMOJI_MAP[w.w] && w.w.length <= 5)
  const { speak } = useSpeak()
  const [current, setCurrent] = useState<Word>(picturable[0])
  const [done, setDone] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const drawing = useRef(false)
  const strokeCount = useRef(0)

  const next = useCallback(() => {
    const word = picturable[Math.floor(Math.random() * picturable.length)]
    setCurrent(word)
    setDone(false)
    strokeCount.current = 0
    clearCanvas()
    setTimeout(() => speak(word.w), 300)
  }, [picturable, speak])

  useEffect(() => { next() }, [])

  const clearCanvas = () => {
    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx || !canvasRef.current) return
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
  }

  const getPos = (e: React.TouchEvent | React.MouseEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect()
    const touch = 'touches' in e ? e.touches[0] : e
    return { x: touch.clientX - rect.left, y: touch.clientY - rect.top }
  }

  const startDraw = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault()
    drawing.current = true
    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx) return
    const { x, y } = getPos(e)
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineWidth = 8
    ctx.lineCap = 'round'
    ctx.strokeStyle = '#ff8c42'
  }

  const draw = (e: React.TouchEvent | React.MouseEvent) => {
    if (!drawing.current) return
    e.preventDefault()
    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx) return
    const { x, y } = getPos(e)
    ctx.lineTo(x, y)
    ctx.stroke()
  }

  const endDraw = () => {
    drawing.current = false
    strokeCount.current++
    if (strokeCount.current >= current.w.length * 2) {
      setDone(true)
      speak(current.w)
      onCorrect(current.w)
    }
  }

  return (
    <div className="game-container trace-game">
      <div className="trace-header">
        <span className="trace-emoji">{EMOJI_MAP[current.w]}</span>
        <span className="trace-word">{current.w}</span>
        <button className="speak-btn" onClick={() => speak(current.w)}>🔊</button>
      </div>
      <div className="trace-area">
        <div className="trace-guide">{current.w}</div>
        <canvas
          ref={canvasRef}
          width={600}
          height={300}
          onTouchStart={startDraw}
          onTouchMove={draw}
          onTouchEnd={endDraw}
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={endDraw}
        />
      </div>
      {done && (
        <div className="trace-done">
          <span className="reward">🌟 太棒了!</span>
          <button className="next-btn" onClick={next}>下一个 →</button>
        </div>
      )}
    </div>
  )
}
