import React from 'react';
import { QueryState, Law } from '../types';
import { LAWS_OPTIONS, AUDIENCE_OPTIONS, QUERY_FOCUS_OPTIONS } from '../constants';
import FormSection from './FormSection';
import SelectInput from './SelectInput';
import TextAreaInput from './TextAreaInput';
import Checkbox from './Checkbox';

interface QueryFormProps {
  queryState: QueryState;
  isLoading: boolean;
  onStateChange: <K extends keyof QueryState>(key: K, value: QueryState[K]) => void;
  onLawChange: (law: Law) => void;
  onSubmit: (event: React.FormEvent) => void;
}

const PromptForm: React.FC<QueryFormProps> = ({ queryState, isLoading, onStateChange, onLawChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="flex flex-col space-y-8">
      <FormSection title="1. Set Your Context" description="Select the relevant laws and your desired level of detail for the explanation.">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-3">Legal Codes</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {LAWS_OPTIONS.map(law => (
                <Checkbox
                  key={law.id}
                  id={law.id}
                  label={law.name}
                  checked={queryState.selectedLaws.includes(law.id)}
                  onChange={() => onLawChange(law.id)}
                />
              ))}
            </div>
          </div>
          <SelectInput 
            label="Explain for a..."
            value={queryState.audience}
            onChange={e => onStateChange('audience', e.target.value)}
            options={AUDIENCE_OPTIONS}
          />
        </div>
      </FormSection>

      <FormSection title="2. Ask Your Question" description="Enter your legal query and specify the aspect you are most interested in.">
        <div className="space-y-6">
          <SelectInput 
            label="Focus on..."
            value={queryState.queryFocus}
            onChange={e => onStateChange('queryFocus', e.target.value)}
            options={QUERY_FOCUS_OPTIONS}
          />
          <TextAreaInput
            label="Your Query"
            placeholder="e.g., 'What is the procedure for filing a consumer complaint?', 'Explain the key elements of criminal intimidation under BNS.'"
            value={queryState.query}
            onChange={e => onStateChange('query', e.target.value)}
            rows={6}
          />
        </div>
      </FormSection>
        
      <div>
        <button 
          type="submit"
          disabled={isLoading}
          className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-sky-500 disabled:bg-slate-500 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Getting Explanation...' : 'Get Legal Explanation'}
        </button>
      </div>
    </form>
  );
};

export default PromptForm;
