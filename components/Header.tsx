import React from 'react'
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { setLoading } from "@/redux/slice"
import { MessageSquare, Cpu, Loader2 } from 'lucide-react'

interface HeaderProps {
  onChatOpen: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onChatOpen }) => {
  const dispatch = useAppDispatch()
  const loading = useAppSelector((store) => store.code.loading)

  const handleCompile = () => {
    dispatch(setLoading(true))
   
  }

  return (
    <header className="bg-black border-b border-green-800/30 py-4">
      <div className="container mx-auto flex items-center justify-between px-4">
        <button
          onClick={onChatOpen}
          className="px-6 py-3 bg-green-500 hover:bg-green-600 text-black font-bold rounded-full transition-colors duration-200 flex items-center gap-2"
        >
          <MessageSquare className="w-5 h-5" />
          <span>Ask AI</span>
        </button>

        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold bg-gradient-to-r from-green-400 to-green-500 text-transparent bg-clip-text hover:from-green-300 hover:to-green-400 transition-all duration-300">
            SwayCraft
          </span>
          <span className="text-green-500 text-sm font-medium mt-1">
            Forge Your Fuel Contracts
          </span>
        </div>

        <button
          onClick={handleCompile}
          className={`px-6 py-3 ${
            loading
              ? 'bg-green-700 cursor-not-allowed'
              : 'bg-green-500 hover:bg-green-600'
          } text-black font-bold rounded-full transition-colors duration-200 flex items-center gap-2`}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Compiling</span>
            </>
          ) : (
            <>
              <Cpu className="w-5 h-5" />
              <span>Compile</span>
            </>
          )}
        </button>
      </div>
    </header>
  )
}