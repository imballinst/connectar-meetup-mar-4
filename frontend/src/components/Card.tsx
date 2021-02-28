import React from 'react';

export interface ICardProps {
  className?: string;
  title: string;
  body: string;
  date: string;
}

export function Card({ title, body, date, className = '' }: ICardProps) {
  return (
    <div
      className={`border border-indigo-100 rounded-md text-indigo-100 ${className}`}
    >
      <div className="mb-4">
        <span className="block text-lg font-bold">{title}</span>
        <span className="block text-xs italic">{date}</span>
      </div>

      <p className="text-sm">{body}</p>
    </div>
  );
}
