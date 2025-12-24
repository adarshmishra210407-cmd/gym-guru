import React from 'react';
import { useGame } from '../context/GameContext';
import { LayoutDashboard, Dumbbell, Utensils, User, Zap } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const { user } = useGame();
  const xpPercentage = Math.min(100, (user.xp / user.maxXp) * 100);

  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'System' },
    { id: 'training', icon: Dumbbell, label: 'Train' },
    { id: 'coach', icon: Zap, label: 'Coach' },
    { id: 'diet', icon: Utensils, label: 'Diet' },
    { id: 'profile', icon: User, label: 'Status' },
  ];

  return (
    <div className="flex flex-col h-screen bg-system-dark text-white font-system overflow-hidden">
      {/* Top HUD */}
      <header className="px-4 py-3 bg-system-panel border-b border-white/10 flex justify-between items-center z-10">
        <div className="flex flex-col">
          <span className="text-xs text-gray-400 uppercase tracking-widest">Player Name</span>
          <span className="font-bold text-system-blue tracking-wider">{user.name}</span>
        </div>
        <div className="flex flex-col items-end w-1/2">
           <div className="flex justify-between w-full text-xs mb-1">
             <span className="text-rank-s">LVL {user.level}</span>
             <span className="text-gray-400">Rank: {user.rank}</span>
           </div>
           <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
             <div 
                className="h-full bg-system-blue shadow-[0_0_10px_#00a8ff]"
                style={{ width: `${xpPercentage}%`, transition: 'width 0.5s ease-out' }}
             />
           </div>
           <span className="text-[10px] text-gray-500 mt-1">{user.xp} / {user.maxXp} XP</span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pb-24 relative">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent" />
        {children}
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-system-panel border-t border-white/10 pb-safe pt-2 px-2 z-20">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center justify-center w-16 h-full transition-all duration-300 ${isActive ? 'text-system-blue -translate-y-2' : 'text-gray-500 hover:text-gray-300'}`}
              >
                <div className={`p-2 rounded-full ${isActive ? 'bg-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.5)]' : ''}`}>
                  <item.icon size={20} className={isActive ? 'animate-pulse' : ''} />
                </div>
                <span className={`text-[10px] mt-1 font-ui uppercase ${isActive ? 'opacity-100 font-bold' : 'opacity-70'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Layout;