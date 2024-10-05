import React, { useEffect, useState } from "react"
import { Editor } from "./Editor"
import { Header } from "./Header"
import ChatPopup from "./ChatPopup";
import { startNewContract, writeFirstPseudoCode } from "@/ai/openai"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { setLoading, setPseudoCode } from "@/redux/slice"
import { Loader2 } from 'lucide-react'

export const CodeScreen: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const title = useAppSelector((state) => state.code.title)
  const loading = useAppSelector((state) => state.code.loading)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const initPseudo = async () => {
      try {
        dispatch(setLoading(true))
        const response = await writeFirstPseudoCode(title)
        console.log(response)

        if (response['response']) {
          dispatch(setPseudoCode(response['response']))
        }
      } catch (e) {
        console.error('Error initializing pseudo code:', e)
      } finally {
        dispatch(setLoading(false))
      }
    }
    initPseudo()
  }, [dispatch, title])

  return (
    <div className='flex flex-col h-screen bg-black text-green-400'>
      <Header onChatOpen={() => setIsChatOpen(true)} />
      {loading ? (
        <div className="flex-1 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="w-12 h-12 text-green-400 animate-spin" />
            <p className="text-green-400 font-medium">Initializing Pseudo Code...</p>
          </div>
        </div>
      ) : (
        <div className='flex flex-1 p-4 space-x-4 overflow-hidden'>
          <Editor 
            type="pseudo" 
            showAction 
            padding={8} 
            className="flex-1" 
            title='Pseudo Code' 
            name='writing-window' 
          />
          <Editor 
            type="contract" 
            className="flex-1" 
            title='Generated Contract' 
            name='code-window' 
          />
        </div>
      )}
      <ChatPopup isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/5 via-black/0 to-green-900/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.05),transparent_70%)]" />
      </div>
    </div>
  )
}