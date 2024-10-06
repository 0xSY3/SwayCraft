import React, { useState, useEffect, useRef } from 'react';
import { X, Send } from 'lucide-react';
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addMessages } from "@/redux/slice";
import axios from 'axios';

interface ChatPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const ChatPopup: React.FC<ChatPopupProps> = ({ isOpen, onClose }) => {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const messages = useAppSelector((state) => state.code.messages);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!message.trim()) return;

    const newMessage: Message = { role: 'user', content: message };
    dispatch(addMessages([newMessage]));
    setMessage('');
    setIsLoading(true);

    try {
      const response = await axios.post('/api/claude', {
        messages: [...messages, newMessage].map(msg => ({
          role: msg.role,
          content: msg.content
        }))
      });

      const assistantMessage: Message = {
        role: 'assistant',
        content: response.data.content[0].text
      };
      dispatch(addMessages([assistantMessage]));
    } catch (error) {
      console.error('Error in chat:', error);
      // Optionally, add an error message to the chat
      dispatch(addMessages([{ role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }]));
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-800 border border-green-800/30 w-full max-w-2xl h-3/4 flex flex-col rounded-lg overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-green-800/30">
          <h2 className="text-xl font-bold text-green-400">Chat with AI</h2>
          <button onClick={onClose} className="text-green-400 hover:text-green-300">
            <X size={24} />
          </button>
        </div>
        <div className="flex-1 overflow-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-3/4 p-3 rounded-lg ${msg.role === 'user' ? 'bg-green-700 text-white' : 'bg-gray-700 text-green-300'}`}>
                {msg.content}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
        <div className="p-4 border-t border-green-800/30 flex">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 bg-gray-700 text-green-300 p-2 rounded-l focus:outline-none"
            placeholder="Type your message..."
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            className="bg-green-500 text-black p-2 rounded-r hover:bg-green-400 transition-colors duration-200 flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-black"></div>
            ) : (
              <Send size={24} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPopup;