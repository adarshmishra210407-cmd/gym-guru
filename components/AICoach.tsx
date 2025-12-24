import React, { useState, useRef } from 'react';
import { Camera, RefreshCw, AlertTriangle, Check } from 'lucide-react';
import { analyzeForm } from '../services/geminiService';

const AICoach: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setAnalysis(''); 
      };
      reader.readAsDataURL(file);
    }
  };

  const runAnalysis = async () => {
    if (!image) return;
    setLoading(true);
    const result = await analyzeForm(image, "Pushup"); // Defaulting to Pushup for demo
    setAnalysis(result);
    setLoading(false);
  };

  return (
    <div className="p-5 h-full flex flex-col">
      <div className="mb-4">
        <h2 className="text-2xl font-system text-system-blue flex items-center gap-2">
          <Camera /> AI VISION
        </h2>
        <p className="text-xs text-gray-400 font-ui">
          "The System will analyze your form and calculate efficiency."
        </p>
      </div>

      {/* Camera Viewport / Image Preview */}
      <div className="relative aspect-[3/4] w-full bg-black rounded-xl border-2 border-dashed border-gray-700 overflow-hidden mb-6 flex items-center justify-center group">
        {image ? (
          <img src={image} alt="Form Check" className="w-full h-full object-cover" />
        ) : (
          <div className="text-center p-6">
            <p className="text-gray-500 mb-4">No Input Signal</p>
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="px-6 py-2 bg-white/10 rounded border border-white/20 text-sm hover:bg-white/20"
            >
              Upload / Snap
            </button>
          </div>
        )}
        
        {/* HUD Overlay */}
        <div className="absolute inset-0 pointer-events-none border border-system-blue/30 rounded-xl">
           <div className="absolute top-2 left-2 text-[10px] text-system-blue">REC ●</div>
           <div className="absolute bottom-2 right-2 text-[10px] text-system-blue">AI ACTIVE</div>
           {/* Crosshair */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 border border-white/20">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-2 bg-white/50"></div>
             <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0.5 h-2 bg-white/50"></div>
             <div className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 w-2 bg-white/50"></div>
             <div className="absolute right-0 top-1/2 -translate-y-1/2 h-0.5 w-2 bg-white/50"></div>
           </div>
        </div>
      </div>

      <input 
        type="file" 
        accept="image/*" 
        capture="user"
        ref={fileInputRef} 
        className="hidden" 
        onChange={handleFileChange} 
      />

      {/* Controls */}
      <div className="flex gap-4 mb-6">
        <button 
           onClick={() => fileInputRef.current?.click()}
           className="flex-1 py-3 bg-gray-800 rounded font-bold text-sm border border-gray-600"
        >
           RETAKE
        </button>
        <button 
           onClick={runAnalysis}
           disabled={loading || !image}
           className="flex-1 py-3 bg-system-blue text-black rounded font-bold text-sm shadow-[0_0_10px_#00a8ff] disabled:opacity-50"
        >
           {loading ? 'ANALYZING...' : 'ANALYZE'}
        </button>
      </div>

      {/* Analysis Output */}
      {analysis && (
        <div className="bg-system-panel border-l-4 border-system-blue p-4 rounded shadow-lg animate-fade-in">
           <h3 className="text-sm font-bold text-system-blue mb-2 flex items-center gap-2">
             <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
             SYSTEM ANALYSIS
           </h3>
           <div className="text-sm font-ui text-gray-200 whitespace-pre-line">
             {analysis}
           </div>
        </div>
      )}
    </div>
  );
};

export default AICoach;
