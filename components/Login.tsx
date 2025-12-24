import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { Power, Fingerprint } from 'lucide-react';

const Login: React.FC = () => {
  const { login, user } = useGame();
  const [name, setName] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  // If previous user data exists, pre-fill name or leave empty to allow change
  const existingName = user.name !== 'Player' ? user.name : '';
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = name || existingName || 'Shadow Monarch';
    
    setIsAnimating(true);
    
    // Simulate "System Boot" delay
    setTimeout(() => {
        login(finalName);
    }, 1500);
  };

  return (
    <div className="h-screen w-full bg-system-dark flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-[#0a0a12] to-[#0a0a12] animate-pulse-glow" />
      
      <div className={`z-10 w-full max-w-md transition-all duration-1000 ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
        
        {/* System Message Box */}
        <div className="bg-system-panel border border-blue-500/30 p-8 rounded-lg shadow-[0_0_50px_rgba(0,168,255,0.1)] text-center relative overflow-hidden">
            {/* Scan Line Effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent h-full w-full animate-pulse pointer-events-none" />

            <div className="mb-6 flex justify-center text-system-blue animate-bounce">
                <Power size={48} />
            </div>

            <h1 className="text-2xl font-system font-bold text-white mb-2 tracking-widest">SYSTEM ALERT</h1>
            <p className="text-sm font-ui text-gray-400 mb-8">
                "You have been chosen as a Player. Will you accept this offer?"
            </p>

            <form onSubmit={handleLogin} className="space-y-6">
                <div className="text-left">
                    <label className="text-xs font-bold text-gray-500 uppercase ml-1">Player Designation</label>
                    <div className="relative mt-1">
                        <Fingerprint className="absolute left-3 top-3 text-gray-500" size={18} />
                        <input 
                            type="text" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder={existingName || "Enter Name"}
                            className="w-full bg-black/50 border border-gray-700 rounded p-3 pl-10 text-white font-system focus:border-system-blue focus:shadow-[0_0_15px_#00a8ff] outline-none transition-all"
                            autoFocus
                        />
                    </div>
                </div>

                <button 
                    type="submit"
                    className="w-full py-4 bg-system-blue text-black font-bold font-system text-lg rounded shadow-[0_0_20px_rgba(0,168,255,0.5)] hover:bg-white hover:shadow-[0_0_30px_rgba(0,168,255,0.8)] transition-all active:scale-95 uppercase tracking-widest"
                >
                    AWAKEN
                </button>
            </form>
            
            <div className="mt-4 text-[10px] text-gray-600 font-mono">
                SYSTEM_ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Login;