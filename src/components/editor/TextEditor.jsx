import { useRef, useEffect } from 'react';

const TextEditor = ({ text, setText, saveStatus }) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === 'a' && document.activeElement === textareaRef.current) {
        e.preventDefault();
        textareaRef.current?.select();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="section-card">
      <div className="relative">
        <textarea
          ref={textareaRef}
          id="textInput"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing or paste your text here..."
          aria-label="Text editor for word counting"
          aria-multiline="true"
          className="w-full h-48 sm:h-64 md:h-80 lg:h-96 p-4 text-base text-gray-900 dark:text-white bg-white dark:bg-dark border border-gray-200 dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-y leading-relaxed placeholder-gray-400 dark:placeholder-gray-600"
          spellCheck="true"
        />
        {/* Save indicator */}
        <div className="absolute bottom-3 right-3 flex items-center gap-3">
          {saveStatus && (
            <span className="text-xs text-green-600 dark:text-green-400 font-medium flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
              {saveStatus}
            </span>
          )}
          <span className="text-xs text-gray-400 bg-white dark:bg-dark px-1">
            {text.length.toLocaleString()} chars
          </span>
        </div>
      </div>

      {/* Screen reader live region */}
      <div role="status" aria-live="polite" className="sr-only">
        {text.length > 0 && `Text updated. Character count: ${text.length}`}
      </div>
    </div>
  );
};

export default TextEditor;
