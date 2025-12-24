import React from 'react';
import { useGame } from '../context/GameContext';
import { Shield, Clock, Droplets, CheckCircle, Circle } from 'lucide-react';
import { QuestType } from '../types';

const Dashboard: React.FC = () => {
  const { quests, toggleQuestProgress } = useGame();

  const dailyQuests = quests.filter(q => q.type === QuestType.DAILY);
  const lifestyleQuests = quests.filter(q => q.type === QuestType.LIFESTYLE);

  return (
    <div className="p-5 space-y-6">
      {/* Welcome Section */}
      <div className="border border-blue-500/30 bg-blue-900/10 p-4 rounded-lg backdrop-blur-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/20 blur-3xl rounded-full"></div>
        <h2 className="text-xl font-system text-system-blue mb-1">SYSTEM ALERT</h2>
        <p className="text-sm font-ui text-gray-300">
          "The player must complete daily missions to avoid penalty."
        </p>
      </div>

      {/* Daily Quests */}
      <section>
        <h3 className="text-lg font-system text-white mb-3 flex items-center gap-2">
          <Shield className="w-4 h-4 text-rank-s" /> DAILY QUESTS
        </h3>
        <div className="space-y-3">
          {dailyQuests.map(quest => (
            <div 
              key={quest.id} 
              className={`p-4 rounded border ${quest.completed ? 'border-green-500/50 bg-green-900/10' : 'border-white/10 bg-system-panel'} transition-all`}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className={`font-bold font-ui ${quest.completed ? 'text-green-400 line-through' : 'text-white'}`}>
                    {quest.title}
                  </h4>
                  <p className="text-xs text-gray-400">{quest.description}</p>
                </div>
                <div className="flex flex-col items-end">
                   <span className="text-xs text-yellow-400 font-bold">+{quest.xpReward} XP</span>
                   {quest.statReward && <span className="text-[10px] text-blue-400">+{quest.statReward}</span>}
                </div>
              </div>
              
              {/* Progress Bar & Interactive Button */}
              <div className="mt-3">
                <div className="flex justify-between text-xs mb-1 text-gray-400">
                    <span>Progress</span>
                    <span>{quest.current} / {quest.target} {quest.unit}</span>
                </div>
                <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden mb-3">
                    <div 
                        className="bg-system-blue h-full transition-all duration-300" 
                        style={{ width: `${Math.min(100, (quest.current / quest.target) * 100)}%` }}
                    />
                </div>
                {!quest.completed && (
                    <button 
                        onClick={() => toggleQuestProgress(quest.id, quest.target / 5)} // Simulate doing part of it
                        className="w-full py-2 bg-blue-600/20 border border-blue-500/50 text-blue-300 text-xs font-bold uppercase tracking-wider hover:bg-blue-600/40 active:scale-95 transition-all"
                    >
                        Log Activity
                    </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lifestyle Habits */}
      <section>
        <h3 className="text-lg font-system text-white mb-3 flex items-center gap-2">
          <Clock className="w-4 h-4 text-purple-400" /> HABITS
        </h3>
        <div className="grid grid-cols-2 gap-3">
            {lifestyleQuests.map(quest => (
                <div key={quest.id} className="bg-system-panel border border-white/5 p-3 rounded flex flex-col justify-between min-h-[100px]">
                    <div className="flex justify-between items-start">
                        <span className="text-sm font-bold font-ui">{quest.title}</span>
                        {quest.completed ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Circle className="w-4 h-4 text-gray-600" />}
                    </div>
                    <div className="mt-2">
                         <p className="text-[10px] text-gray-400 mb-2">{quest.current} / {quest.target} {quest.unit}</p>
                         <button 
                             onClick={() => toggleQuestProgress(quest.id, quest.target / 4)}
                             disabled={quest.completed}
                             className="w-full bg-white/5 hover:bg-white/10 text-[10px] py-1 rounded"
                         >
                             + Check In
                         </button>
                    </div>
                </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;