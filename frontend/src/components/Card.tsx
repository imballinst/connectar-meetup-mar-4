import React from 'react';
import { formatDate, formatDateRelative } from '../helpers';

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
      className={`border border-indigo-100 rounded-md text-indigo-100 ${className}`}
    >
      <div className="mb-4">
        <span className="block text-lg font-bold">{title}</span>
        <span className="block text-xs italic">
          {relativeDate
            ? formatDateRelative(new Date(date))
            : formatDate(new Date(date))}
        </span>
      </div>

      <p className="text-sm">{content}</p>
    </div>
  );
}
