import React from 'react';

interface TextAreaInputProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
  isListening?: boolean;
  onVoiceClick?: () => void;
}

const MicrophoneIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 14a2 2 0 0 0 2-2V6a2 2 0 0 0-4 0v6a2 2 0 0 0 2 2z"/>
        <path d="M12 17c-2.21 0-4-1.79-4-4H6c0 3.31 2.69 6 6 6s6-2.69 6-6h-2c0 2.21-1.79 4-4 4z"/>
        <path d="M17 11V6a5 5 0 0 0-10 0v5H5v-1a7 7 0 0 1 14 0v1h-2z"/>
    </svg>
);


const TextAreaInput: React.FC<TextAreaInputProps> = ({ label, value, onChange, placeholder, rows = 4, isListening, onVoiceClick }) => {
  return (
    <div>
      <label htmlFor={label} className="block text-sm font-medium text-slate-300 mb-2">
        {label}
      </label>
      <div className="relative">
        <textarea
          id={label}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          className="w-full bg-slate-800 border border-slate-600 rounded-md p-3 pr-12 text-slate-200 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition shadow-sm resize-y"
        />
        {onVoiceClick && (
            <button
                type="button"
                onClick={onVoiceClick}
                className={`absolute right-2 top-2 p-2 rounded-full transition-colors ${
                    isListening 
                    ? 'text-sky-400 bg-sky-900/50 ring-2 ring-sky-400 animate-pulse' 
                    : 'text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                }`}
                aria-label={isListening ? "Stop listening" : "Start listening"}
            >
                <MicrophoneIcon className="w-5 h-5"/>
            </button>
        )}
      </div>
    </div>
  );
};

export default TextAreaInput;