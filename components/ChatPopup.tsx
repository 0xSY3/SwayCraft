import React, { useState } from 'react';
import { X, Send } from 'lucide-react';
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addMessages } from "@/redux/slice";
import { updateSmartContract } from "@/ai/openai";

interface ChatPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatPopup: React.FC<ChatPopupProps> = ({ isOpen, onClose }) => {
    const [message, setMessage] = useState('');
  const dispatch = useAppDispatch();
  const messages = useAppSelector((state) => state.code.messages);
  const contractCode = useAppSelector((state) => state.code.contractCode);

  const handleSend = async () => {
    if (!message.trim()) return;

    const newMessage = { role: 'user', content: message };
    dispatch(addMessages([newMessage]));
    setMessage('');

    try {
      const response = await updateSmartContract([...messages, newMessage]);
      if (response) {
        dispatch(addMessages([{ role: 'assistant', content: response }]));
      }
    } catch (error) {
      console.error('Error in chat:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-black border border-green-800/30 w-full max-w-2xl h-3/4 flex flex-col">
        <div className="flex justify-between items-center p-4 border-b border-green-800/30">
          <h2 className="text-xl font-bold text-green-400">Chat with AI</h2>
          <button onClick={onClose} className="text-green-400 hover:text-green-300">
            <X size={24} />
          </button>
        </div>
        <div className="flex-1 overflow-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-3/4 p-3 rounded ${msg.role === 'user' ? 'bg-green-800 text-white' : 'bg-green-200 text-black'}`}>
                {msg.content}
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-green-800/30 flex">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 bg-green-900/20 text-green-300 p-2 rounded-l focus:outline-none"
            placeholder="Type your message..."
          />
          <button onClick={handleSend} className="bg-green-500 text-black p-2 rounded-r hover:bg-green-400">
            <Send size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPopup;
