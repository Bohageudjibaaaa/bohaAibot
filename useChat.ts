
import { useState, useCallback, useEffect } from 'react';
import { ChatMessage, MessageAuthor } from '../types';
import { sendMessageToAIStream } from '../services/geminiService';

export const useChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      author: MessageAuthor.MODEL,
      text: "Hello! I'm Nexus, your AI assistant. How can I help you today?",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;

    const userMessage: ChatMessage = { author: MessageAuthor.USER, text };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsLoading(true);

    const currentHistory = [...messages, userMessage];

    try {
      const stream = sendMessageToAIStream(text, currentHistory);
      let firstChunk = true;
      
      for await (const chunk of stream) {
        if (firstChunk) {
          setMessages((prev) => [...prev, { author: MessageAuthor.MODEL, text: chunk }]);
          firstChunk = false;
        } else {
          setMessages((prev) => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1].text += chunk;
            return newMessages;
          });
        }
      }
    } catch (error) {
      console.error("Error in chat stream:", error);
      const errorMessage: ChatMessage = {
        author: MessageAuthor.MODEL,
        text: "Sorry, something went wrong. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [messages]);

  return { messages, isLoading, sendMessage };
};
