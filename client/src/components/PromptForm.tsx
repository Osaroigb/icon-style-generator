import { useState } from 'react';

interface PromptFormProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export default function PromptForm({ value, onChange, error }: PromptFormProps) {
  const [localError, setLocalError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    
    // Client-side validation
    if (newValue.trim().length === 0) {
      setLocalError('Prompt is required');
    } else if (newValue.length > 500) {
      setLocalError('Prompt is too long (max 500 characters)');
    } else {
      setLocalError('');
    }
  };

  const displayError = error || localError;

  return (
    <div style={{ marginBottom: 'var(--spacing-lg)' }}>
      <label 
        htmlFor="prompt" 
        style={{ 
          display: 'block', 
          marginBottom: 'var(--spacing-sm)',
          fontWeight: 600,
          color: 'var(--color-gray-900)'
        }}
      >
        What icons do you want to generate?
      </label>
      <input
        id="prompt"
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="e.g., Toys, Animals, Food..."
        style={{
          width: '100%',
          padding: 'var(--spacing-md)',
          fontSize: '1rem',
          border: `2px solid ${displayError ? 'var(--color-error)' : 'var(--color-gray-300)'}`,
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'white',
        }}
      />
      {displayError && (
        <p style={{ 
          marginTop: 'var(--spacing-sm)', 
          color: 'var(--color-error)', 
          fontSize: '0.875rem' 
        }}>
          {displayError}
        </p>
      )}
      <p style={{ 
        marginTop: 'var(--spacing-sm)', 
        color: 'var(--color-gray-500)', 
        fontSize: '0.875rem' 
      }}>
        {value.length}/500 characters
      </p>
    </div>
  );
}
