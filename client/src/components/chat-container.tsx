import { useRef, useEffect } from "react";
import { Message } from "@/hooks/use-chat-store";

interface ChatContainerProps {
  messages: Message[];
}

export default function ChatContainer({ messages }: ChatContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  const renderMessage = (message: Message, index: number) => {
    if (message.type === "user") {
      return (
        <div key={index} className="flex items-start gap-4 mb-8">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
          </div>
          <div className="flex-1">
            <p>{message.content}</p>
          </div>
        </div>
      );
    } else {
      return (
        <div key={index} className="flex items-start gap-4 mb-8">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
          <div className="flex-1 markdown-content">
            {message.content.split('\n').map((paragraph, i) => (
              <p key={i} className={i < message.content.split('\n').length - 1 ? "mb-4" : ""}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      );
    }
  };

  return (
    <div 
      ref={containerRef}
      className="flex-1 overflow-y-auto scrollbar-thin px-4 md:px-8 lg:px-16 py-4 space-y-8 bg-chat-light dark:bg-chat-dark"
    >
      <div className="max-w-3xl mx-auto">
        {messages.map((message, index) => renderMessage(message, index))}
      </div>
    </div>
  );
}
