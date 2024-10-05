import { useAppDispatch } from "@/redux/hooks"
import { useState } from "react"
import { setLoading, setTitle as setReduxTitle } from '@/redux/slice'
import { Terminal, Cpu, Code2 } from 'lucide-react'

export const HomeView = () => {
  const [title, setTitle] = useState('')
  const dispatch = useAppDispatch()

  const handleSubmit = () => {
    dispatch(setReduxTitle(title))
    dispatch(setLoading(true))
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-green-950 to-black opacity-20 animate-pulse"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center max-w-3xl w-full space-y-8">
        {/* Logo and title */}
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-3">
            <Terminal className="w-12 h-12 text-green-400" />
            <h1 className="text-6xl font-bold bg-gradient-to-r from-green-400 via-green-300 to-green-500 text-transparent bg-clip-text">
              SwayCraft
            </h1>
          </div>
          <p className="text-green-400 text-xl font-light tracking-wide">
            Craft Smart Contracts for Fuel with AI Precision
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-6 w-full mb-8">
          <div className="p-4 rounded-lg border border-green-800 bg-black/50 flex flex-col items-center">
            <Cpu className="w-6 h-6 text-green-400 mb-2" />
            <span className="text-green-300 text-sm">Fuel-Powered</span>
          </div>
          <div className="p-4 rounded-lg border border-green-800 bg-black/50 flex flex-col items-center">
            <Code2 className="w-6 h-6 text-green-400 mb-2" />
            <span className="text-green-300 text-sm">AI-Assisted</span>
          </div>
          <div className="p-4 rounded-lg border border-green-800 bg-black/50 flex flex-col items-center">
            <Terminal className="w-6 h-6 text-green-400 mb-2" />
            <span className="text-green-300 text-sm">Sway-Native</span>
          </div>
        </div>

        {/* Input section */}
        <div className="w-full max-w-2xl space-y-2">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="What smart contract would you like to create?"
              className="w-full px-4 py-3 rounded-lg bg-black border border-green-800 text-green-300 placeholder-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={title}
              onChange={(e) => setTitle(e.currentTarget.value)}
              onKeyDown={(k) => k.key === 'Enter' && handleSubmit()}
            />
            <button onClick={handleSubmit}
              className="px-6 py-3 bg-green-500 hover:bg-green-600 text-black font-bold rounded-lg transition-colors duration-200 flex items-center gap-2"
            >
              Generate
              <Terminal className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
