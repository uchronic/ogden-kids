import { useState } from 'react'
import wordsData from './data/words.json'
import type { Word } from './data/types'
import { PictureMatch } from './components/PictureMatch'
import { ListenPick } from './components/ListenPick'
import { BubblePop } from './components/BubblePop'
import { LetterTrace } from './components/LetterTrace'
import { useProgress } from './hooks/useProgress'
import './App.css'

type Game = 'home' | 'picture' | 'listen' | 'bubble' | 'trace'

const words = wordsData as Word[]

export default function App() {
  const [game, setGame] = useState<Game>('home')
  const { progress, markLearned } = useProgress()

  if (game === 'home') {
    return (
      <div className="home">
        <h1 className="title">🌈 Ogden Kids</h1>
        <p className="subtitle">⭐ {progress.stars} 颗星 · 学了 {progress.learned.length} 个词</p>
        <div className="menu">
          <button className="menu-btn" onClick={() => setGame('picture')}>
            <span className="menu-icon">🖼️</span>
            <span>看图选词</span>
          </button>
          <button className="menu-btn" onClick={() => setGame('listen')}>
            <span className="menu-icon">👂</span>
            <span>听音选图</span>
          </button>
          <button className="menu-btn" onClick={() => setGame('bubble')}>
            <span className="menu-icon">🫧</span>
            <span>泡泡消消</span>
          </button>
          <button className="menu-btn" onClick={() => setGame('trace')}>
            <span className="menu-icon">✍️</span>
            <span>描红写字</span>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="game-wrapper">
      <button className="back-btn" onClick={() => setGame('home')}>← 回家</button>
      {game === 'picture' && <PictureMatch words={words} onCorrect={markLearned} />}
      {game === 'listen' && <ListenPick words={words} onCorrect={markLearned} />}
      {game === 'bubble' && <BubblePop words={words} onCorrect={markLearned} />}
      {game === 'trace' && <LetterTrace words={words} onCorrect={markLearned} />}
    </div>
  )
}
