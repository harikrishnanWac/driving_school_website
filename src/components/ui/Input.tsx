import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string;
  error?: string;
  multiline?: boolean;
  rows?: number;
}

const Input: React.FC<InputProps> = ({ label, error, multiline, rows = 4, className = '', ...props }) => {
  const inputStyles = `w-full px-4 py-3 rounded-xl border bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 transition-all duration-200 placeholder:text-black ${
    error 
      ? 'border-red-500 focus:ring-red-200' 
      : 'border-gray-200 focus:border-primary focus:ring-primary/20'
  } ${className}`;

  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && <label className="text-sm font-semibold text-gray-700 ml-1">{label}</label>}
      {multiline ? (
        <textarea 
          className={inputStyles} 
          rows={rows}
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input 
          className={inputStyles} 
          {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
      {error && <span className="text-sm text-red-500 ml-1">{error}</span>}
    </div>
  );
};

export default Input;
