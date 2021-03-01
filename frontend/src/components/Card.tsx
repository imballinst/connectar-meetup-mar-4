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
    <li
      className={`border border-indigo-100 rounded-md text-indigo-100 ${className}`}
    >
      <div className="mb-4">
        <span className="block text-lg font-bold">{title}</span>
        <time dateTime={date} className="block text-xs italic">
          {relativeDate
            ? `${formatCardDate(new Date(date))} ago`
            : formatDate(new Date(date))}
        </time>
      </div>

      <p className="text-sm">{content}</p>
    </li>
  );
}
