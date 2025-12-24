import React, { useState } from 'react';
import { SKILL_TREE } from '../constants';
import { Lock, Unlock, ChevronRight, Activity, Dumbbell } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { StatType } from '../types';

const Training: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'Push' | 'Pull'>('Push');
  const { addXp, updateStat } = useGame();
  const [workoutActive, setWorkoutActive] = useState(false);

  const skills = SKILL_TREE.filter(s => s.category === activeCategory);

  const startWorkout = () => {
    setWorkoutActive(true);
    // Simulate workout session
    setTimeout(() => {
        setWorkoutActive(false);
        addXp(50);
        updateStat(StatType.STR, 1);
        alert("DUNGEON CLEARED: +50 XP, +1 STR");
    }, 2000);
  };

  return (
    <div className="p-5 h-full flex flex-col">
      <h2 className="text-2xl font-system text-white mb-4">SKILL TREE</h2>
      
      {/* Category Tabs */}
      <div className="flex gap-2 mb-6">
        {['Push', 'Pull'].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat as any)}
            className={`flex-1 py-2 text-sm font-bold font-ui uppercase border-b-2 transition-colors ${
              activeCategory === cat ? 'border-system-blue text-system-blue' : 'border-transparent text-gray-600'
            }`}
          >
            {cat} Force
          </button>
        ))}
      </div>

      {/* Skills List */}
      <div className="flex-1 space-y-4 overflow-y-auto pb-20">
        {skills.map((skill, index) => (
          <div 
            key={skill.id} 
            className={`relative p-4 rounded-lg border ${
              skill.status === 'locked' ? 'border-gray-800 bg-gray-900/50 opacity-60' : 
              skill.status === 'mastered' ? 'border-yellow-500/30 bg-yellow-900/10' : 
              'border-blue-500/30 bg-blue-900/10'
            }`}
          >
            {/* Connecting Line (Visual only for list) */}
            {index < skills.length - 1 && (
                <div className="absolute left-8 bottom-[-20px] w-0.5 h-6 bg-gray-800 -z-10"></div>
            )}

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${
                    skill.status === 'locked' ? 'border-gray-700 bg-gray-800' : 'border-blue-500 bg-blue-900'
                }`}>
                    {skill.status === 'locked' ? <Lock size={16} /> : <span className="font-bold text-lg">{skill.level}</span>}
                </div>
                <div>
                  <h3 className="font-ui font-bold text-white text-lg">{skill.name}</h3>
                  <p className="text-xs text-gray-400">{skill.description}</p>
                </div>
              </div>
              <div className="text-right">
                {skill.status === 'available' && (
                    <span className="text-xs text-green-400 animate-pulse">Available</span>
                )}
                {skill.status === 'mastered' && (
                    <span className="text-xs text-yellow-500">Mastered</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Action Button for Quick Workout */}
      <button 
        onClick={startWorkout}
        disabled={workoutActive}
        className="fixed bottom-24 right-6 w-16 h-16 bg-system-blue rounded-full shadow-[0_0_20px_#00a8ff] flex items-center justify-center text-black font-bold z-50 active:scale-95 transition-transform"
      >
        {workoutActive ? <Activity className="animate-spin" /> : <Dumbbell />}
      </button>
    </div>
  );
};

export default Training;