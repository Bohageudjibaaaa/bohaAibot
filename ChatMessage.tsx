
import React, { useState } from 'react';
import type { ChatMessage as ChatMessageType } from '../types';
import { MessageAuthor } from '../types';
import { User, Bot, Clipboard, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const [hasCopied, setHasCopied] = useState(false);
  const isModel = message.author === MessageAuthor.MODEL;

  const handleCopy = () => {
    navigator.clipboard.writeText(message.text);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  const authorIcon = isModel ? (
    <div className="w-8 h-8 bg-brand-500 rounded-full flex items-center justify-center shrink-0">
      <Bot size={20} className="text-white" />
    </div>
  ) : (
    <div className="w-8 h-8 bg-gray-300 dark:bg-dark-secondary rounded-full flex items-center justify-center shrink-0">
      <User size={20} className="text-gray-700 dark:text-dark-text-primary" />
    </div>
  );

  return (
    <div className={`flex items-start gap-4 p-4 md:p-6 ${isModel ? '' : 'bg-gray-50 dark:bg-dark-primary/50'}`}>
      {authorIcon}
      <div className="flex-1 pt-1">
        <div className="flex justify-between items-start">
            <div className="prose prose-sm dark:prose-invert max-w-none prose-p:my-0 prose-pre:my-2 prose-pre:bg-[#282c34] prose-pre:p-4 prose-pre:rounded-md">
                 <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.text}</ReactMarkdown>
            </div>
          {isModel && (
            <button
              onClick={handleCopy}
              className="ml-4 p-1.5 text-gray-500 dark:text-dark-text-secondary hover:bg-gray-200 dark:hover:bg-dark-secondary rounded-md transition-colors"
              aria-label="Copy message"
            >
              {hasCopied ? <Check size={16} className="text-green-500" /> : <Clipboard size={16} />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
