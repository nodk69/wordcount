import mammoth from 'mammoth';

export const parseFile = async (file) => {
  const ext = file.name.split('.').pop().toLowerCase();

  switch (ext) {
    case 'txt':
    case 'md':
      return readAsText(file);
    case 'doc':
    case 'docx':
      return parseDocx(file);
    case 'pdf':
      return parsePdf(file);
    default:
      throw new Error(`Unsupported format ".${ext}". Supported: TXT, DOCX, PDF`);
  }
};

const readAsText = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file, 'utf-8');
  });

const parseDocx = async (file) => {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  if (!result.value) {
    throw new Error('Could not extract text from this document');
  }
  return result.value;
};

let pdfjsInitialized = false;

const parsePdf = async (file) => {
  const arrayBuffer = await file.arrayBuffer();

  // Use v3 CommonJS-compatible import; worker is self-hosted in /public/
  const pdfjsLib = await import('pdfjs-dist/build/pdf');

  if (!pdfjsInitialized) {
    // Self-hosted worker copied from node_modules to public/ — no CDN dependency
    pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';
    pdfjsInitialized = true;
  }

  const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) }).promise;
  const pageTexts = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    pageTexts.push(content.items.map((item) => item.str).join(' '));
  }

  const text = pageTexts.join('\n\n').replace(/\s{3,}/g, ' ').trim();
  if (!text) throw new Error('No text could be extracted from this PDF');
  return text;
};
