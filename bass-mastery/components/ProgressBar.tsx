import React from 'react';

interface ProgressBarProps {
  progress: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="w-full bg-slate-800 rounded-full h-4 mb-6 shadow-inner border border-slate-700">
      <div 
        className="bg-gradient-to-r from-blue-600 via-violet-600 to-violet-500 h-4 rounded-full transition-all duration-700 ease-out shadow-[0_0_10px_rgba(139,92,246,0.5)]"
        style={{ width: `${progress}%` }}
      ></div>
      <div className="text-right text-xs text-violet-300 mt-1 font-mono">{Math.round(progress)}% Complété</div>
    </div>
  );
};