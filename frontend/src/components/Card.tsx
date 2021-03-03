import React from 'react';

export interface ICardProps {
  className?: string;
  title: string;
  content: string;
  date: string;
  preview?: boolean;
}

export function Card({
  title,
  content,
  date,
  className = '',
  preview
}: ICardProps) {
  return (
    <div
      className={`border border-indigo-100 rounded-md text-indigo-100 break-words ${className}`}
      role="group"
      aria-label="Post"
    >
      <span className="block text-lg font-bold">{title}</span>
      <time dateTime={date} className="block text-xs italic">
        {date}
      </time>

      <p className="text-sm mt-4">{trimContentOnPreview(content, preview)}</p>
    </div>
  );
}

function trimContentOnPreview(text: string, preview: boolean | undefined) {
  if (preview && text.length > 280) {
    return `${text.slice(0, 280)}...`;
  }

  return text;
}
