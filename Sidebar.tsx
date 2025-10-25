
import React from 'react';
import { Sun, Moon, Plus, MessageSquare, Compass, Settings, User } from 'lucide-react';

interface SidebarProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const SidebarLink: React.FC<{ icon: React.ReactNode; text: string; isActive?: boolean }> = ({ icon, text, isActive }) => (
  <a
    href="#"
    className={`flex items-center w-full px-4 py-2.5 text-sm rounded-lg transition-colors duration-200 ${
      isActive
        ? 'bg-brand-500 text-white'
        : 'text-gray-500 dark:text-dark-text-secondary hover:bg-gray-200 dark:hover:bg-dark-secondary'
    }`}
  >
    {icon}
    <span className="ml-4">{text}</span>
  </a>
);

export const Sidebar: React.FC<SidebarProps> = ({ theme, toggleTheme }) => {
  return (
    <div className="hidden md:flex flex-col w-64 bg-gray-100 dark:bg-dark-surface border-r border-gray-200 dark:border-dark-primary p-4 shrink-0">
      <div className="flex items-center mb-8">
        <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
            <Compass className="text-white w-5 h-5"/>
        </div>
        <h1 className="text-xl font-bold ml-3 text-gray-800 dark:text-dark-text-primary">Nexus AI</h1>
      </div>

      <div className="flex flex-col gap-2 flex-1">
        <button className="flex items-center justify-center w-full px-4 py-2.5 text-sm font-semibold bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors duration-200">
          <Plus size={18} className="mr-2" />
          New Chat
        </button>
        <nav className="mt-4 flex flex-col gap-1">
          <SidebarLink icon={<MessageSquare size={18} />} text="Chat History" />
          <SidebarLink icon={<Compass size={18} />} text="Tools Hub" />
        </nav>
      </div>

      <div className="flex flex-col gap-1">
        <SidebarLink icon={<User size={18} />} text="Account" />
        <SidebarLink icon={<Settings size={18} />} text="Settings" />
        <button
          onClick={toggleTheme}
          className="flex items-center w-full px-4 py-2.5 text-sm text-gray-500 dark:text-dark-text-secondary hover:bg-gray-200 dark:hover:bg-dark-secondary rounded-lg transition-colors duration-200"
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          <span className="ml-4">{theme === 'light' ? 'Dark' : 'Light'} Mode</span>
        </button>
      </div>
    </div>
  );
};
