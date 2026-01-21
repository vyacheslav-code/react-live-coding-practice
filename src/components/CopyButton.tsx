import { useState } from 'react';

interface CopyButtonProps {
  code: string;
}

export default function CopyButton({ code }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="
        px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200
        bg-primary-600 hover:bg-primary-500 text-white
        hover:shadow-lg hover:shadow-primary-500/30
        focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-950
        disabled:opacity-50 disabled:cursor-not-allowed
        inline-flex items-center gap-2
      "
      aria-label={copied ? 'Code copied to clipboard' : 'Copy code to clipboard'}
      disabled={copied}
    >
      {copied ? (
        <>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          Copied!
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          Copy Code
        </>
      )}
    </button>
  );
}
