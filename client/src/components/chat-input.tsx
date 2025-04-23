import { useState, useRef, ChangeEvent, FormEvent } from "react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

export default function ChatInput({ onSendMessage }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    
    // Auto-resize the textarea
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  };
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
      
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };
  
  return (
    <div className="border-t border-border p-4 bg-chat-light dark:bg-chat-dark">
      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="relative">
          <div className="rounded-lg border border-border bg-input-light dark:bg-input-dark shadow-sm">
            <textarea 
              ref={textareaRef}
              value={message}
              onChange={handleTextareaChange}
              rows={1} 
              placeholder="Message AI assistant..." 
              className="block w-full resize-none border-0 bg-transparent py-3 pl-4 pr-10 text-text-light dark:text-text-dark focus:ring-0 focus:outline-none"
            />
            <button 
              type="submit" 
              className="absolute bottom-2 right-2 p-1 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 transform rotate-90">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
              </svg>
            </button>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
            AI assistant is designed to be helpful, harmless, and honest.
          </p>
        </form>
      </div>
    </div>
  );
}
