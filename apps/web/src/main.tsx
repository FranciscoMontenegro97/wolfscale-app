import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/main.scss'
import CurveWizard from './components/CurveWizard'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CurveWizard />
  </StrictMode>,
)
