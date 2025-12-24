import React, { useState } from 'react';
import { generateDietPlan } from '../services/geminiService';
import { DietPlan } from '../types';
import { ChefHat, Loader, Utensils, Flame, Leaf, Target, Edit3 } from 'lucide-react';

const Diet: React.FC = () => {
  const [calories, setCalories] = useState<string>('2000');
  const [dietType, setDietType] = useState<string>('Vegetarian');
  const [goal, setGoal] = useState<string>('Muscle Gain');
  const [notes, setNotes] = useState<string>('');
  
  const [plan, setPlan] = useState<DietPlan | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const preferences = `Target Calories: ${calories}. Diet Type: ${dietType}. Goal: ${goal}. Additional Notes: ${notes}`;
      const data = await generateDietPlan(preferences);
      setPlan(data);
    } catch (e) {
      alert("System Failed to generate supplies.");
    }
    setLoading(false);
  };

  return (
    <div className="p-5 pb-24">
      <h2 className="text-2xl font-system text-white mb-4 flex items-center gap-2">
        <ChefHat className="text-green-400" /> NUTRITION SHOP
      </h2>

      {/* Input Section */}
      {!plan && (
        <div className="bg-system-panel p-5 rounded border border-white/10 mb-6 space-y-5 animate-fade-in">
            <div className="border-b border-gray-800 pb-2 mb-2">
                <h3 className="text-sm font-bold text-gray-300 font-system uppercase tracking-wider">Set Parameters</h3>
            </div>

            {/* Calories Input */}
            <div>
                <label className="text-xs font-bold text-gray-500 mb-1 uppercase flex items-center gap-1 font-ui">
                    <Flame size={12} className="text-orange-500"/> Calorie Budget
                </label>
                <div className="relative">
                    <input 
                        type="number" 
                        value={calories}
                        onChange={(e) => setCalories(e.target.value)}
                        className="w-full bg-black/50 border border-gray-700 rounded p-3 text-sm text-white focus:border-system-blue outline-none font-mono pl-3"
                        placeholder="2000"
                    />
                    <span className="absolute right-3 top-3 text-xs text-gray-500">KCAL</span>
                </div>
            </div>

            {/* Diet Type Select */}
            <div>
                <label className="text-xs font-bold text-gray-500 mb-1 uppercase flex items-center gap-1 font-ui">
                    <Leaf size={12} className="text-green-500"/> Diet Class
                </label>
                <div className="grid grid-cols-3 gap-2">
                    {['Vegetarian', 'Non-Veg', 'Eggetarian'].map(type => (
                        <button
                            key={type}
                            onClick={() => setDietType(type)}
                            className={`p-2 rounded text-[10px] font-bold border transition-all uppercase tracking-wider ${
                                dietType === type 
                                ? 'bg-green-600/20 border-green-500 text-green-400 shadow-[0_0_10px_rgba(34,197,94,0.2)]' 
                                : 'bg-gray-800 border-gray-700 text-gray-500 hover:bg-gray-700'
                            }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            {/* Goal Select */}
            <div>
                <label className="text-xs font-bold text-gray-500 mb-1 uppercase flex items-center gap-1 font-ui">
                    <Target size={12} className="text-red-500"/> Objective
                </label>
                <select 
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    className="w-full bg-black/50 border border-gray-700 rounded p-3 text-sm text-white focus:border-system-blue outline-none appearance-none"
                >
                    <option value="Muscle Gain">Muscle Gain (Hypertrophy)</option>
                    <option value="Fat Loss">Fat Loss (Cutting)</option>
                    <option value="Maintenance">Maintenance (Recomp)</option>
                </select>
            </div>

            {/* Additional Notes */}
            <div>
                <label className="text-xs font-bold text-gray-500 mb-1 uppercase flex items-center gap-1 font-ui">
                    <Edit3 size={12} className="text-blue-500"/> Special Requests
                </label>
                <input 
                    type="text" 
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-black/50 border border-gray-700 rounded p-3 text-sm text-white focus:border-system-blue outline-none"
                    placeholder="e.g. No dairy, high protein, spicy..."
                />
            </div>

            <button
                onClick={handleGenerate}
                disabled={loading}
                className="w-full py-4 mt-2 bg-green-600 hover:bg-green-500 text-white font-bold rounded shadow-[0_0_15px_rgba(34,197,94,0.3)] flex justify-center items-center gap-2 transition-all active:scale-95 uppercase tracking-widest text-sm font-system"
            >
                {loading ? <Loader className="animate-spin" /> : 'GENERATE RATION PLAN'}
            </button>
        </div>
      )}

      {/* Result Section */}
      {plan && (
        <div className="space-y-4 animate-fade-in">
          {/* Macros Summary */}
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="bg-gray-800 p-2 rounded border border-gray-700">
                <div className="text-[10px] text-gray-400">KCALS</div>
                <div className="font-bold text-white text-sm">{plan.totalCalories}</div>
            </div>
            <div className="bg-gray-800 p-2 rounded border border-gray-700">
                <div className="text-[10px] text-blue-400">PRO</div>
                <div className="font-bold text-white text-sm">{plan.macros.protein}g</div>
            </div>
            <div className="bg-gray-800 p-2 rounded border border-gray-700">
                <div className="text-[10px] text-yellow-400">CARB</div>
                <div className="font-bold text-white text-sm">{plan.macros.carbs}g</div>
            </div>
            <div className="bg-gray-800 p-2 rounded border border-gray-700">
                <div className="text-[10px] text-red-400">FAT</div>
                <div className="font-bold text-white text-sm">{plan.macros.fats}g</div>
            </div>
          </div>

          {/* Meal List */}
          <div className="space-y-3">
            {plan.meals.map((meal, idx) => (
              <div key={idx} className="bg-white/5 p-4 rounded border-l-2 border-green-500 relative overflow-hidden group">
                <div className="absolute right-[-10px] top-[-10px] text-white/5 group-hover:text-white/10 transition-colors">
                    <Utensils size={60} />
                </div>
                
                <div className="flex justify-between items-start mb-2 relative z-10">
                    <h3 className="font-bold font-ui text-lg text-green-100">{meal.name}</h3>
                    <span className="text-[10px] bg-black/60 px-2 py-1 rounded text-green-400 border border-green-900 font-mono tracking-wider">
                        {meal.calories} KCAL
                    </span>
                </div>
                
                <p className="text-xs text-gray-400 mb-3 italic border-b border-white/5 pb-2">
                    "{meal.description}"
                </p>
                
                <div className="flex flex-wrap gap-1.5 relative z-10">
                    {meal.ingredients.map((ing, i) => (
                        <span key={i} className="text-[10px] bg-gray-800 px-2 py-0.5 rounded text-gray-300 border border-gray-700">
                            {ing}
                        </span>
                    ))}
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={() => setPlan(null)}
            className="w-full py-3 mt-4 border border-gray-600 text-gray-400 rounded hover:bg-gray-800 text-sm font-bold tracking-wider uppercase font-system"
          >
            Reset Parameters
          </button>
        </div>
      )}
    </div>
  );
};

export default Diet;