
import React from 'react';

interface TextAreaInputProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
}

const TextAreaInput: React.FC<TextAreaInputProps> = ({ label, value, onChange, placeholder, rows = 4 }) => {
  return (
    <div>
      <label htmlFor={label} className="block text-sm font-medium text-slate-300 mb-2">
        {label}
      </label>
      <textarea
        id={label}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className="w-full bg-slate-800 border border-slate-600 rounded-md p-3 text-slate-200 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition shadow-sm resize-y"
      />
    </div>
  );
};

export default TextAreaInput;
