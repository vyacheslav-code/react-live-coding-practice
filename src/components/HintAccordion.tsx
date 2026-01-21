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
    <div className="space-y-2">
      <h3 className="text-lg font-semibold text-gray-200 mb-3">💡 Hints</h3>
      {hints.map((hint, index) => (
        <div key={index} className="border border-gray-700 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleHint(index)}
            className="w-full px-4 py-3 bg-gray-800 hover:bg-gray-750 text-left flex justify-between items-center transition-colors"
            aria-expanded={expandedIndex === index}
            aria-controls={`hint-${index}`}
          >
            <span className="font-medium text-gray-200">Hint {index + 1}</span>
            <span className="text-gray-400 text-xl">
              {expandedIndex === index ? '−' : '+'}
            </span>
          </button>
          {expandedIndex === index && (
            <div
              id={`hint-${index}`}
              className="px-4 py-3 bg-gray-850 text-gray-300"
            >
              {hint}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
