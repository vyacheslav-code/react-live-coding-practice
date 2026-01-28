import { useState } from 'react';

interface Props {
  hints: string[];
}

export default function HintAccordion({ hints }: Props) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleHint = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  if (!hints || hints.length === 0) {
    return null;
  }

  return (
    <div className="border border-neutral-800 rounded-lg overflow-hidden">
      <div className="px-8 py-5 border-b border-neutral-800">
        <h3 className="text-xl font-semibold tracking-tight">Hints</h3>
      </div>
      <div className="divide-y divide-neutral-800">
        {hints.map((hint, index) => (
          <div key={index}>
            <button
              onClick={() => toggleHint(index)}
              className="w-full px-8 py-4 bg-transparent hover:bg-neutral-900/50 text-left flex justify-between items-center transition-colors group"
              aria-expanded={expandedIndex === index}
              aria-controls={`hint-${index}`}
            >
              <span className="text-sm font-medium text-neutral-400 group-hover:text-white transition-colors">
                Hint {index + 1}
              </span>
              <svg
                className={`w-4 h-4 text-neutral-500 transition-transform duration-200 ${expandedIndex === index ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              className={`
                grid transition-all duration-200 ease-in-out
                ${expandedIndex === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}
              `}
            >
              <div className="overflow-hidden">
                <div
                  id={`hint-${index}`}
                  className="px-8 py-4 text-sm text-neutral-400 leading-relaxed border-t border-neutral-800"
                >
                  {hint}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
