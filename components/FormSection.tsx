
import React from 'react';

interface FormSectionProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const FormSection: React.FC<FormSectionProps> = ({ title, description, children }) => {
  return (
    <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl shadow-md p-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-sky-400">{title}</h2>
        <p className="text-sm text-slate-400 mt-1">{description}</p>
      </div>
      {children}
    </div>
  );
};

export default FormSection;
