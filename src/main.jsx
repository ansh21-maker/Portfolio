import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Home from './pages/home/home'
import About from "./pages/about/about"
import './index.css'
import { Skills } from './pages/skills/skills'
import { Navbar } from './pages/navbar'
import { Project } from './pages/projects/project'
import {Contact} from './pages/contact/contact'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Navbar/>
      <Home/>
      <About/> 
      <Skills/>
      <Project/>
      <Contact/>
      
  </StrictMode>,
)
