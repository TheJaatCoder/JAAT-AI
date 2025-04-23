import { useState } from "react";
import { useTheme } from "@/hooks/use-theme";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { isDarkMode, toggleTheme } = useTheme();
  const [messageHistory, setMessageHistory] = useState("save-all");
  const [fontSize, setFontSize] = useState(50); // Percentage of slider (0-100)
  const [notifications, setNotifications] = useState({
    newMessages: true,
    mentions: true
  });

  if (!isOpen) return null;

  const handleSave = () => {
    // In a real app, you would save these settings to a database or local storage
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold">Settings</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <div className="p-4 space-y-4">
          {/* Theme Toggle */}
          <div className="flex items-center justify-between">
            <label htmlFor="theme-toggle" className="font-medium">Theme</label>
            <div className="relative inline-block w-12 h-6 rounded-full bg-gray-200 dark:bg-gray-700">
              <input 
                type="checkbox" 
                id="theme-toggle" 
                className="peer sr-only" 
                checked={isDarkMode}
                onChange={toggleTheme}
              />
              <span className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white dark:bg-gray-400 transition-transform duration-200 ease-in-out ${isDarkMode ? 'translate-x-6' : ''}`}></span>
              <span className="absolute inset-0 cursor-pointer rounded-full"></span>
            </div>
          </div>
          
          {/* Message History */}
          <div>
            <label className="font-medium block mb-2">Message History</label>
            <select 
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              value={messageHistory}
              onChange={(e) => setMessageHistory(e.target.value)}
            >
              <option value="save-all">Save all messages</option>
              <option value="save-30">Save for 30 days</option>
              <option value="dont-save">Don't save history</option>
            </select>
          </div>
          
          {/* Font Size */}
          <div>
            <label className="font-medium block mb-2">Font Size</label>
            <div className="flex items-center space-x-2">
              <button 
                className="p-1 w-8 h-8 flex items-center justify-center border border-gray-300 dark:border-gray-600 rounded-md"
                onClick={() => setFontSize(Math.max(0, fontSize - 10))}
              >
                A-
              </button>
              <div className="flex-1 h-1 bg-gray-200 dark:bg-gray-700 rounded-full">
                <div 
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${fontSize}%` }}
                ></div>
              </div>
              <button 
                className="p-1 w-8 h-8 flex items-center justify-center border border-gray-300 dark:border-gray-600 rounded-md"
                onClick={() => setFontSize(Math.min(100, fontSize + 10))}
              >
                A+
              </button>
            </div>
          </div>
          
          {/* Notification Settings */}
          <div>
            <label className="font-medium block mb-2">Notifications</label>
            <div className="space-y-2">
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="notif-new-message" 
                  className="w-4 h-4 text-primary border-gray-300 rounded" 
                  checked={notifications.newMessages}
                  onChange={() => setNotifications(prev => ({ ...prev, newMessages: !prev.newMessages }))}
                />
                <label htmlFor="notif-new-message" className="ml-2 text-sm">New messages</label>
              </div>
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="notif-mentions" 
                  className="w-4 h-4 text-primary border-gray-300 rounded" 
                  checked={notifications.mentions}
                  onChange={() => setNotifications(prev => ({ ...prev, mentions: !prev.mentions }))}
                />
                <label htmlFor="notif-mentions" className="ml-2 text-sm">Mentions</label>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-2">
          <button 
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-opacity-90"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
