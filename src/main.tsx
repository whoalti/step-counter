import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import Bars from './components/bars-chart/index.tsx'
import { Progress } from './components/progressbar/index.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className='main'>
      <Bars />
      <Progress />
    </div>
  </StrictMode>,
)
