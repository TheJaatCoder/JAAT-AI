import React from "react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSettings: () => void;
}

// Sample conversation groups for the sidebar
// In a real app, these would come from an API or state management
const conversationGroups = [
  {
    title: "Today",
    conversations: [
      { id: 1, title: "Language model capabilities", isActive: false },
      { id: 2, title: "AI dashboard implementation", isActive: true }
    ]
  },
  {
    title: "Yesterday",
    conversations: [
      { id: 3, title: "Project roadmap discussion", isActive: false },
      { id: 4, title: "Marketing strategy ideas", isActive: false },
      { id: 5, title: "Technical documentation help", isActive: false }
    ]
  },
  {
    title: "Previous 7 Days",
    conversations: [
      { id: 6, title: "Machine learning concepts", isActive: false },
      { id: 7, title: "Frontend optimization", isActive: false }
    ]
  }
];

export default function Sidebar({ isOpen, onClose, onOpenSettings }: SidebarProps) {
  const sidebarClasses = `fixed inset-y-0 left-0 z-30 flex w-72 flex-col bg-sidebar-light dark:bg-sidebar-dark border-r border-border transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
    !isOpen ? "-translate-x-full lg:translate-x-0" : ""
  }`;

  return (
    <div className={sidebarClasses}>
      {/* Sidebar Header */}
      <div className="flex h-14 items-center justify-between px-3 border-b border-border">
        <button className="flex items-center gap-2 text-sm font-medium p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
          <span>New chat</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
        </button>
        
        <button 
          onClick={onClose}
          className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      
      {/* Conversation History */}
      <div className="flex-1 overflow-y-auto scrollbar-thin p-2 space-y-2">
        {conversationGroups.map((group) => (
          <div key={group.title}>
            <div className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-2 px-2">
              {group.title}
            </div>
            
            {group.conversations.map((convo) => (
              <button 
                key={convo.id}
                className={`w-full text-left px-3 py-2 rounded-md transition-colors text-sm mb-1 flex items-center group
                  ${convo.isActive 
                    ? 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
              >
                <span className="truncate flex-1">{convo.title}</span>
                <span className="invisible group-hover:visible flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                  </svg>
                </span>
              </button>
            ))}
          </div>
        ))}
      </div>
      
      {/* Sidebar Footer */}
      <div className="border-t border-border p-4 space-y-3">
        <button className="w-full text-left flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
          <span>My Account</span>
        </button>
        
        <button 
          onClick={onOpenSettings}
          className="w-full text-left flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
          <span>Settings</span>
        </button>
        
        <button className="w-full text-left flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
          </svg>
          <span>Log out</span>
        </button>
      </div>
    </div>
  );
}
