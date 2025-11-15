import React, { useState, useEffect, useCallback } from 'react';
import { LANGUAGE_CODE_MAP } from '../constants';

interface ResponseDisplayProps {
  response: string;
  isLoading: boolean;
  error: string | null;
  outputLanguage: string;
}

const CopyIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125T8.25 4.5h5.625c3.536 0 6.42 2.573 6.92 5.992" />
    </svg>
);

const SpeakerIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
    </svg>
);

const StopIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 9.563C9 9.254 9.254 9 9.563 9h4.874c.309 0 .563.254.563.563v4.874c0 .309-.254.563-.563.563H9.563C9.254 15 9 14.746 9 14.437V9.564Z" />
    </svg>
);


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


const PromptPreview: React.FC<ResponseDisplayProps> = ({ response, isLoading, error, outputLanguage }) => {
  const [copyText, setCopyText] = useState('Copy');
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleCopy = () => {
    if (response) {
      navigator.clipboard.writeText(response);
      setCopyText('Copied!');
      setTimeout(() => setCopyText('Copy'), 2000);
    }
  };
  
  const handleSpeakToggle = useCallback(() => {
    if (isSpeaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    } else if (response) {
      const utterance = new SpeechSynthesisUtterance(response);
      const langCode = LANGUAGE_CODE_MAP[outputLanguage] || 'en-US';
      utterance.lang = langCode;
      
      const setVoice = () => {
        const voices = speechSynthesis.getVoices();
        const voice = voices.find(v => v.lang === langCode);
        if (voice) {
          utterance.voice = voice;
        }
      }

      if (speechSynthesis.getVoices().length === 0) {
        speechSynthesis.onvoiceschanged = setVoice;
      } else {
        setVoice();
      }
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = (e) => {
        console.error("Speech synthesis error", e);
        setIsSpeaking(false);
      };
      
      speechSynthesis.speak(utterance);
    }
  }, [response, outputLanguage, isSpeaking]);

  useEffect(() => {
    return () => {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    };
  }, [response]);

  const renderFormattedResponse = (text: string) => {
    const lines = text.split('\n');
    let html = '';
    let inUnorderedList = false;
    let inOrderedList = false;
    let inBlockquote = false;

    for (const line of lines) {
        if (line.trim() === '') continue;

        let processedLine = line.trim();
        
        const closeTags = (except: 'ul' | 'ol' | 'blockquote' | null = null) => {
            if (inUnorderedList && except !== 'ul') { html += '</ul>'; inUnorderedList = false; }
            if (inOrderedList && except !== 'ol') { html += '</ol>'; inOrderedList = false; }
            if (inBlockquote && except !== 'blockquote') { html += '</blockquote>'; inBlockquote = false; }
        };

        if (processedLine.startsWith('>')) {
            if (!inBlockquote) {
                closeTags();
                html += '<blockquote class="border-l-4 border-slate-600 pl-4 my-4 text-slate-400 italic">';
                inBlockquote = true;
            }
            let content = processedLine.substring(1).trim();
            content = content
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>');
            html += `<p class="mb-2 last:mb-0">${content}</p>`;
            continue;
        }

        if (processedLine.startsWith('- ') || processedLine.startsWith('* ')) {
            if (!inUnorderedList) {
                closeTags();
                html += '<ul class="list-disc pl-6 space-y-2 my-4">';
                inUnorderedList = true;
            }
            let content = processedLine.substring(2);
            content = content
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>');
            html += `<li>${content}</li>`;
            continue;
        }
        
        if (/^\d+\.\s/.test(processedLine)) {
            if (!inOrderedList) {
                closeTags();
                html += '<ol class="list-decimal pl-6 space-y-2 my-4">';
                inOrderedList = true;
            }
            let content = processedLine.replace(/^\d+\.\s/, '');
            content = content
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>');
            html += `<li>${content}</li>`;
            continue;
        }

        closeTags();
        
        processedLine = processedLine
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>');

        if (processedLine.startsWith('### ')) {
            html += `<h3 class="text-md font-semibold text-slate-200 mt-4 mb-2">${processedLine.substring(4)}</h3>`;
        } else if (processedLine.startsWith('## ')) {
            html += `<h2 class="text-lg font-semibold text-sky-400 mt-6 mb-3">${processedLine.substring(3)}</h2>`;
        } else if (processedLine.startsWith('# ')) {
            html += `<h1 class="text-xl font-bold text-sky-300 mt-8 mb-4">${processedLine.substring(2)}</h1>`;
        } else {
            html += `<p class="my-4">${processedLine}</p>`;
        }
    }

    if (inUnorderedList) { html += '</ul>'; }
    if (inOrderedList) { html += '</ol>'; }
    if (inBlockquote) { html += '</blockquote>'; }

    return { __html: html };
  };

  const renderContent = () => {
    if (isLoading) {
      return <LoadingSpinner />;
    }
    if (error) {
      return <ErrorDisplay message={error} />;
    }
    if (response) {
      return (
        <div 
          className="p-6 text-slate-300 font-sans text-base leading-relaxed"
          dangerouslySetInnerHTML={renderFormattedResponse(response)}
        />
      );
    }
    return <Placeholder />;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-slate-100 mb-4">AI-Generated Explanation</h2>
      <div className="relative bg-slate-950/50 border border-slate-700/50 rounded-xl shadow-lg min-h-[200px] flex flex-col justify-center">
        {response && !isLoading && !error && (
          <div className="absolute top-3 right-3 flex items-center space-x-2">
            <button
                onClick={handleSpeakToggle}
                className="p-2 rounded-md text-slate-400 hover:bg-slate-700 hover:text-slate-200 transition-colors"
                aria-label={isSpeaking ? "Stop speaking" : "Read aloud"}
            >
                {isSpeaking ? <StopIcon className="w-5 h-5" /> : <SpeakerIcon className="w-5 h-5" />}
            </button>
            <button
                onClick={handleCopy}
                className="flex items-center space-x-1.5 px-3 py-2 rounded-md text-sm font-medium text-slate-400 hover:bg-slate-700 hover:text-slate-200 transition-colors"
                aria-label="Copy explanation"
            >
                <CopyIcon className="w-4 h-4" />
                <span>{copyText}</span>
            </button>
          </div>
        )}
        {renderContent()}
      </div>
    </div>
  );
};

export default PromptPreview;