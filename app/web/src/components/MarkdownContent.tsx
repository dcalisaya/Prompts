import React, { useMemo } from 'react';
import { marked } from 'marked';
import './MarkdownContent.css';

interface MarkdownContentProps {
  content: string;
}

const stripFrontMatter = (markdown: string): string =>
  markdown.replace(/^---\n[\s\S]*?\n---\n?/, '');

marked.setOptions({
  breaks: true,
  gfm: true,
});

const MarkdownContent: React.FC<MarkdownContentProps> = ({ content }) => {
  const html = useMemo(() => {
    const cleaned = stripFrontMatter(content);
    return marked.parse(cleaned) as string;
  }, [content]);

  return <div className="markdown-content" dangerouslySetInnerHTML={{ __html: html }} />;
};

export default MarkdownContent;
