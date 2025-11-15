
import React from 'react';

interface SelectInputProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
}

const SelectInput: React.FC<SelectInputProps> = ({ label, value, onChange, options }) => {
  return (
    <div>
      <label htmlFor={label} className="block text-sm font-medium text-slate-300 mb-2">
        {label}
      </label>
      <select
        id={label}
        value={value}
        onChange={onChange}
        className="w-full bg-slate-800 border border-slate-600 rounded-md p-3 text-slate-200 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition shadow-sm"
      >
        {options.map(option => (
          <option key={option} value={option} className="bg-slate-800">
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
