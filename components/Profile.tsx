import React from 'react';
import { useGame } from '../context/GameContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { StatType } from '../types';

const Profile: React.FC = () => {
  const { user } = useGame();

  const radarData = Object.entries(user.stats).map(([key, value]) => ({
    subject: key,
    A: value,
    fullMark: 100,
  }));

  return (
    <div className="p-5 space-y-6">
      <div className="flex items-end justify-between border-b border-gray-700 pb-4">
        <div>
            <h1 className="text-3xl font-system font-bold text-white tracking-widest uppercase">Status</h1>
            <p className="text-sm text-system-blue font-ui">PLAYER: {user.name}</p>
        </div>
        <div className="text-right">
            <div className="text-4xl font-bold text-rank-s font-system">{user.rank}</div>
            <div className="text-xs text-gray-500">CURRENT RANK</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-system-panel p-4 rounded border border-white/10">
            <div className="text-xs text-gray-400 mb-1">LEVEL</div>
            <div className="text-2xl font-bold text-white">{user.level}</div>
        </div>
        <div className="bg-system-panel p-4 rounded border border-white/10">
            <div className="text-xs text-gray-400 mb-1">JOB</div>
            <div className="text-lg font-bold text-white">Shadow Monarch</div>
        </div>
      </div>

      {/* Radar Chart for Stats */}
      <div className="h-64 w-full bg-system-panel/50 rounded-lg border border-white/5 relative">
        <div className="absolute top-2 left-2 text-xs text-gray-500">ATTRIBUTE PENTAGON</div>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
            <PolarGrid stroke="#333" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#888', fontSize: 10 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
            <Radar
              name="Stats"
              dataKey="A"
              stroke="#00a8ff"
              strokeWidth={2}
              fill="#00a8ff"
              fillOpacity={0.3}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Stat List */}
      <div className="space-y-2">
        {Object.entries(user.stats).map(([stat, val]) => (
            <div key={stat} className="flex justify-between items-center border-b border-gray-800 pb-2">
                <span className="text-sm text-gray-300 font-ui uppercase">{stat}</span>
                <span className="text-lg font-bold text-white font-system">{val}</span>
            </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-purple-900/20 border border-purple-500/30 rounded">
        <h3 className="text-purple-400 font-bold text-sm mb-2">PASSIVE SKILLS</h3>
        <ul className="text-xs text-gray-400 space-y-1">
            <li>• <span className="text-white">Iron Will:</span> +10% Mental Recovery</li>
            <li>• <span className="text-white">Shadow Step:</span> Agility increases faster</li>
        </ul>
      </div>
    </div>
  );
};

export default Profile;