import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-kotlin';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-bash';
import { Check, Copy } from 'lucide-react';

interface CodeBlockProps {
  language: string;
  value: string;
}

const CodeBlock = ({ language, value }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const html = Prism.highlight(
    value,
    Prism.languages[language] || Prism.languages.markup,
    language
  );

  return (
    <div className="relative group/code">
      <div className="absolute top-2.5 right-2.5 flex items-center gap-2 z-10 opacity-0 group-hover/code:opacity-100 transition-opacity duration-200">
        <span className="text-[10px] font-mono bg-black/60 border border-white/5 text-white/40 px-2 py-0.5 rounded uppercase tracking-widest">{language}</span>
        <button
          onClick={handleCopy}
          className="p-1 rounded bg-black/60 border border-white/5 hover:bg-black/80 text-white/40 hover:text-white transition-all duration-200 cursor-pointer"
          aria-label="Copy Code"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>
      <pre>
        <code
          className={`language-${language}`}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </pre>
    </div>
  );
};

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer = ({ content }: MarkdownRendererProps) => {
  return (
    <div className="markdown-body">
      <ReactMarkdown
        components={{
          pre({ children }) {
            return <>{children}</>;
          },
          code({ className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            const isInline = !match;
            if (isInline) {
              return <code className={className} {...props}>{children}</code>;
            }
            return <CodeBlock language={match[1]} value={String(children).replace(/\n$/, '')} />;
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
