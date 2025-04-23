import { useState } from 'react';

export interface Message {
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export interface Conversation {
  id: number;
  title: string;
  isActive: boolean;
  messages: Message[];
  createdAt: Date;
}

export function useChatStore() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<number | null>(null);

  // Add a new message to the current chat
  const addMessage = (message: Message) => {
    setMessages(prevMessages => [...prevMessages, message]);
    
    // If this is part of an active conversation, update that conversation too
    if (activeConversationId) {
      setConversations(prevConversations => 
        prevConversations.map(convo => 
          convo.id === activeConversationId 
            ? { ...convo, messages: [...convo.messages, message] }
            : convo
        )
      );
    }
  };

  // Create a new conversation
  const createConversation = (title: string) => {
    const newConversation: Conversation = {
      id: Date.now(),
      title,
      isActive: true,
      messages: [],
      createdAt: new Date()
    };
    
    // Deactivate all other conversations
    setConversations(prevConversations => 
      prevConversations.map(convo => ({ ...convo, isActive: false }))
    );
    
    // Add new conversation
    setConversations(prevConversations => [...prevConversations, newConversation]);
    setActiveConversationId(newConversation.id);
    setMessages([]);
  };

  // Switch to a different conversation
  const switchConversation = (conversationId: number) => {
    // Find the selected conversation
    const selectedConvo = conversations.find(c => c.id === conversationId);
    if (!selectedConvo) return;
    
    // Update active status
    setConversations(prevConversations => 
      prevConversations.map(convo => ({
        ...convo,
        isActive: convo.id === conversationId
      }))
    );
    
    // Load messages
    setMessages(selectedConvo.messages);
    setActiveConversationId(conversationId);
  };

  return {
    messages,
    conversations,
    activeConversationId,
    addMessage,
    createConversation,
    switchConversation
  };
}
