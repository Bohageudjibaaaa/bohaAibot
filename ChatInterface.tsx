
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useChat } from '../hooks/useChat';
import { ChatMessage } from './ChatMessage';
import { Send, Loader, Mic, Paperclip, ArrowDown } from 'lucide-react';

export const ChatInterface: React.FC = () => {
  const { messages, isLoading, sendMessage } = useChat();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const handleSend = useCallback(() => {
    if (input.trim() && !isLoading) {
      sendMessage(input);
      setInput('');
    }
  }, [input, isLoading, sendMessage]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-dark-bg">
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {messages.map((msg, index) => (
            <ChatMessage key={index} message={msg} />
          ))}
          {isLoading && (
            <div className="flex items-start gap-4 p-4 md:p-6">
                <div className="w-8 h-8 bg-brand-500 rounded-full flex items-center justify-center shrink-0">
                    <Loader size={20} className="text-white animate-spin" />
                </div>
                <div className="pt-1.5">
                    <div className="w-4 h-4 bg-gray-300 dark:bg-dark-secondary rounded-full animate-pulse"></div>
                </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="px-4 pb-4 pt-2 bg-white dark:bg-dark-bg">
        <div className="max-w-4xl mx-auto relative">
          <div className="relative flex items-end p-2 bg-gray-100 dark:bg-dark-primary rounded-xl shadow-sm">
            <button className="p-2 text-gray-500 dark:text-dark-text-secondary hover:text-brand-500 dark:hover:text-brand-500 transition-colors">
                <Paperclip size={20} />
            </button>
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message Nexus..."
              className="flex-1 bg-transparent px-2 resize-none outline-none text-gray-800 dark:text-dark-text-primary placeholder-gray-500 dark:placeholder-dark-text-secondary max-h-48"
              rows={1}
              disabled={isLoading}
            />
             <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="p-2 rounded-lg bg-brand-500 text-white disabled:bg-gray-300 dark:disabled:bg-dark-secondary disabled:cursor-not-allowed hover:bg-brand-600 transition-all duration-200"
            >
              {isLoading ? <Loader size={20} className="animate-spin" /> : <ArrowDown size={20} className="-rotate-90"/>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
