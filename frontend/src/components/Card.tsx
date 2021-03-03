import React from 'react';
import { formatDate, formatCardDate } from '../helpers';

export interface ICardProps {
  className?: string;
  title: string;
  content: string;
  date: string;
  relativeDate?: boolean;
}

export function Card({
  title,
  content,
  date,
  className = '',
  relativeDate
}: ICardProps) {
  return (
    <div
      className={`border border-indigo-100 rounded-md text-indigo-100 break-words ${className}`}
      role="group"
      aria-label="Post"
    >
      <span className="block text-lg font-bold">{title}</span>
      <time dateTime={date} className="block text-xs italic">
        {relativeDate
          ? formatCardDate(new Date(date))
          : formatDate(new Date(date))}
      </time>

      <p className="text-sm mt-4">{content}</p>
    </div>
  );
}
