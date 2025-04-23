import { useState, useEffect } from "react";
import Sidebar from "@/components/sidebar";
import ChatContainer from "@/components/chat-container";
import ChatInput from "@/components/chat-input";
import SettingsModal from "@/components/settings-modal";
import { useChatStore } from "@/hooks/use-chat-store";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { messages, addMessage } = useChatStore();

  // Handle chat form submission
  const handleSendMessage = (message: string) => {
    if (message.trim()) {
      // Add user message
      addMessage({
        type: "user",
        content: message,
        timestamp: new Date(),
      });

      // Simulate AI response after a short delay
      setTimeout(() => {
        addMessage({
          type: "ai",
          content: "I'm processing your request. This is a placeholder response that would be replaced with the actual AI response from your backend.",
          timestamp: new Date(),
        });
      }, 1000);
    }
  };

  useEffect(() => {
    // If no messages exist, add a welcome message
    if (messages.length === 0) {
      addMessage({
        type: "ai",
        content: "Hello! I'm your AI assistant. How can I help you today?\n\nYou can ask me questions, request information, or get help with various tasks. I'm here to assist you with whatever you need.",
        timestamp: new Date(),
      });
    }
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Mobile Top Bar */}
        <div className="lg:hidden flex items-center justify-between h-14 px-4 border-b border-border">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
          <h1 className="text-lg font-medium">AI Dashboard</h1>
          <button 
            id="mobile-theme-toggle" 
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {/* Sun icon for dark mode (show in dark mode) */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="hidden dark:block w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
            {/* Moon icon for light mode (show in light mode) */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="block dark:hidden w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
            </svg>
          </button>
        </div>

        {/* Chat Container */}
        <ChatContainer messages={messages} />

        {/* Chat Input */}
        <ChatInput onSendMessage={handleSendMessage} />

        {/* Settings Modal */}
        <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
      </main>
    </div>
  );
}
