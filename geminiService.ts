
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import type { ChatMessage, MessageAuthor } from '../types';
import { MessageAuthor as MessageAuthorEnum } from '../types';


// Ensure the API key is available
if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

let chatInstance: Chat | null = null;

export const initChat = (history: ChatMessage[]): Chat => {
  const formattedHistory = history.map(message => ({
    role: message.author === MessageAuthorEnum.USER ? 'user' : 'model',
    parts: [{ text: message.text }]
  }));

  chatInstance = ai.chats.create({
    model: 'gemini-2.5-flash',
    history: formattedHistory,
    config: {
      systemInstruction: 'You are a helpful and versatile AI assistant named Nexus. Provide accurate, well-formatted responses, including code snippets when appropriate.',
    },
  });
  return chatInstance;
};

export const sendMessageToAI = async (
  message: string,
  history: ChatMessage[]
): Promise<string> => {
  if (!chatInstance) {
    chatInstance = initChat(history);
  }

  try {
    const response: GenerateContentResponse = await chatInstance.sendMessage({ message });
    return response.text;
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    return "Sorry, I encountered an error. Please try again.";
  }
};

export async function* sendMessageToAIStream(
  message: string,
  history: ChatMessage[]
): AsyncGenerator<string> {
    if (!chatInstance) {
      chatInstance = initChat(history);
    }
    
    try {
        const result = await chatInstance.sendMessageStream({ message });
        for await (const chunk of result) {
            yield chunk.text;
        }
    } catch (error) {
        console.error("Error streaming message to Gemini:", error);
        yield "Sorry, I encountered an error while streaming the response. Please try again.";
    }
}
