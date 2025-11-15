
import React, { useState, useCallback } from 'react';
import { GoogleGenAI } from '@google/genai';
import { QueryState, Law } from './types';
import { LAWS_OPTIONS, AUDIENCE_OPTIONS, QUERY_FOCUS_OPTIONS } from './constants';
import Header from './components/Header';
import PromptForm from './components/PromptForm';
import PromptPreview from './components/PromptPreview';

const App: React.FC = () => {
  const [queryState, setQueryState] = useState<QueryState>({
    selectedLaws: [Law.CPC],
    audience: AUDIENCE_OPTIONS[0],
    query: '',
    queryFocus: QUERY_FOCUS_OPTIONS[0],
  });
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStateChange = useCallback(<K extends keyof QueryState>(key: K, value: QueryState[K]) => {
    setQueryState(prev => ({ ...prev, [key]: value }));
  }, []);

  const handleLawChange = useCallback((law: Law) => {
    setQueryState(prev => {
      const selectedLaws = prev.selectedLaws.includes(law)
        ? prev.selectedLaws.filter(l => l !== law)
        : [...prev.selectedLaws, law];
      return { ...prev, selectedLaws };
    });
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!queryState.query || queryState.selectedLaws.length === 0) {
      setError("Please select at least one legal code and enter a query.");
      return;
    }
    
    setIsLoading(true);
    setResponse('');
    setError(null);

    const lawDetails = queryState.selectedLaws.map(law => {
        const lawOption = LAWS_OPTIONS.find(opt => opt.id === law);
        return `- ${lawOption?.fullName || law} (${lawOption?.id})`;
    }).join('\n');

    const focusInstruction = queryState.queryFocus !== 'General Explanation'
      ? `\n**Specific Focus:** The user is particularly interested in the **${queryState.queryFocus}**. Please ensure your answer emphasizes this aspect.`
      : '';

    const prompt = `
      You are an expert legal assistant specializing in Indian law. Your task is to provide clear, accurate, and helpful explanations of Indian legal codes and procedures.

      **Audience:** Explain the concepts for a ${queryState.audience}. Tailor the language, complexity, and depth of your explanation accordingly. For a layperson, use simple terms and avoid jargon. For a legal professional, you can be more technical and detailed.

      **Legal Context:** The query is specifically about the following Indian legal codes:
      ${lawDetails}
      Base your answer primarily on these selected laws.
      ${focusInstruction}
      **User's Query:**
      "${queryState.query}"

      **Your Response:**
      Provide a comprehensive answer. Structure it for clarity using headings, lists, and bold text. Your response **must** adhere to the following:
      1.  **Cite Specific Sections:** When discussing any procedure, definition, or legal principle, you must accurately cite the specific section number from the relevant legal code (e.g., Section 154 of BNSS, Section 52 of BSA).
      2.  **Cite Case Law:** Support your explanation with relevant case law examples and their citations (e.g., *Party A v. Party B*, (Year) SC XXX).
    `;

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const result = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
      });
      setResponse(result.text);
    } catch (e: any) {
      setError(`Failed to get response from AI. ${e.message}`);
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <PromptForm 
            queryState={queryState}
            isLoading={isLoading}
            onStateChange={handleStateChange}
            onLawChange={handleLawChange}
            onSubmit={handleSubmit}
          />
          <div className="mt-12">
            <PromptPreview 
              response={response}
              isLoading={isLoading}
              error={error}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
