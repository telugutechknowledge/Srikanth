
import React from 'react';

interface ResponseDisplayProps {
  response: string;
  isLoading: boolean;
  error: string | null;
}

const LoadingSpinner: React.FC = () => (
  <div className="flex flex-col items-center justify-center p-10">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-500"></div>
    <p className="mt-4 text-slate-400">Consulting legal archives...</p>
  </div>
);

const Placeholder: React.FC = () => (
    <div className="text-center p-10">
        <h3 className="text-lg font-semibold text-slate-300">Your legal explanation will appear here.</h3>
        <p className="mt-1 text-sm text-slate-500">Fill out the form above and click "Get Legal Explanation" to start.</p>
    </div>
);

const ErrorDisplay: React.FC<{ message: string }> = ({ message }) => (
    <div className="bg-red-900/50 border border-red-700/50 text-red-300 p-4 rounded-lg">
        <h4 className="font-bold">An Error Occurred</h4>
        <p className="mt-1 text-sm">{message}</p>
    </div>
);


const PromptPreview: React.FC<ResponseDisplayProps> = ({ response, isLoading, error }) => {
  const renderContent = () => {
    if (isLoading) {
      return <LoadingSpinner />;
    }
    if (error) {
      return <ErrorDisplay message={error} />;
    }
    if (response) {
      return (
        <div className="p-6 text-slate-300 whitespace-pre-wrap font-sans text-base leading-relaxed">
          {response}
        </div>
      );
    }
    return <Placeholder />;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-slate-100 mb-4">AI-Generated Explanation</h2>
      <div className="relative bg-slate-950/50 border border-slate-700/50 rounded-xl shadow-lg min-h-[200px] flex flex-col justify-center">
        {renderContent()}
      </div>
    </div>
  );
};

export default PromptPreview;
