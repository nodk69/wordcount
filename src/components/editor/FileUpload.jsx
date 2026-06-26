import { useRef, useState } from 'react';
import { parseFile } from '../../utils/fileParser';

const ACCEPTED = '.txt,.md,.doc,.docx,.pdf';

const FileUpload = ({ onTextLoaded }) => {
  const inputRef = useRef(null);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFile = async (file) => {
    if (!file) return;
    setLoading(true);
    setStatus('');
    try {
      const text = await parseFile(file);
      if (!text.trim()) {
        setStatus('⚠️ No text found in the file.');
      } else {
        onTextLoaded(text);
        setStatus(`✅ Loaded "${file.name}"`);
        setTimeout(() => setStatus(''), 4000);
      }
    } catch (err) {
      setStatus(`❌ ${err.message}`);
      setTimeout(() => setStatus(''), 6000);
    } finally {
      setLoading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const handleChange = (e) => handleFile(e.target.files?.[0]);

  const handleDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files?.[0]);
  };

  return (
    <div className="inline-flex flex-col items-start">
      <button
        onClick={() => inputRef.current?.click()}
        disabled={loading}
        className="btn-secondary flex items-center gap-1.5"
        aria-label="Upload file (TXT, DOCX, PDF)"
      >
        {loading ? (
          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
        )}
        {loading ? 'Loading...' : 'Upload File'}
      </button>

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED}
        onChange={handleChange}
        onDrop={handleDrop}
        className="hidden"
        aria-hidden="true"
      />

      {status && (
        <span className="text-xs mt-1.5 max-w-[200px] break-words">
          {status}
        </span>
      )}
    </div>
  );
};

export default FileUpload;
