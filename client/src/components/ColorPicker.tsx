import { useState } from 'react';

interface ColorPickerProps {
  colors: string[];
  onChange: (colors: string[]) => void;
}

export default function ColorPicker({ colors, onChange }: ColorPickerProps) {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const isValidHex = (hex: string): boolean => {
    return /^#?[0-9A-Fa-f]{6}$/.test(hex);
  };

  const addColor = () => {
    const hex = inputValue.startsWith('#') ? inputValue : `#${inputValue}`;
    
    if (!isValidHex(hex)) {
      setError('Invalid HEX color format (e.g., #FF6B9D)');
      return;
    }

    if (colors.length >= 5) {
      setError('Maximum 5 colors allowed');
      return;
    }

    if (colors.includes(hex.toUpperCase())) {
      setError('Color already added');
      return;
    }

    onChange([...colors, hex.toUpperCase()]);
    setInputValue('');
    setError('');
  };

  const removeColor = (index: number) => {
    onChange(colors.filter((_, i) => i !== index));
  };

  return (
    <div style={{ marginBottom: 'var(--spacing-lg)' }}>
      <label 
        style={{ 
          display: 'block', 
          marginBottom: 'var(--spacing-sm)',
          fontWeight: 600,
          color: 'var(--color-gray-900)'
        }}
      >
        Custom Colors (Optional)
      </label>
      <p style={{ 
        marginBottom: 'var(--spacing-md)', 
        color: 'var(--color-gray-600)', 
        fontSize: '0.875rem' 
      }}>
        Add up to 5 brand colors to influence the palette
      </p>

      <div style={{ display: 'flex', gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-md)' }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setError('');
          }}
          placeholder="#FF6B9D"
          style={{
            flex: 1,
            padding: 'var(--spacing-sm) var(--spacing-md)',
            border: `2px solid ${error ? 'var(--color-error)' : 'var(--color-gray-300)'}`,
            borderRadius: 'var(--radius-md)',
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              addColor();
            }
          }}
        />
        <button
          onClick={addColor}
          disabled={colors.length >= 5}
          style={{
            padding: 'var(--spacing-sm) var(--spacing-lg)',
            backgroundColor: 'var(--color-primary)',
            color: 'white',
            borderRadius: 'var(--radius-md)',
            fontWeight: 500,
          }}
        >
          Add Color
        </button>
      </div>

      {error && (
        <p style={{ color: 'var(--color-error)', fontSize: '0.875rem', marginBottom: 'var(--spacing-sm)' }}>
          {error}
        </p>
      )}

      {colors.length > 0 && (
        <div style={{ display: 'flex', gap: 'var(--spacing-sm)', flexWrap: 'wrap' }}>
          {colors.map((color, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-xs)',
                padding: 'var(--spacing-xs) var(--spacing-sm)',
                backgroundColor: 'var(--color-gray-100)',
                borderRadius: 'var(--radius-md)',
              }}
            >
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  backgroundColor: color,
                  borderRadius: 'var(--radius-sm)',
                  border: '2px solid var(--color-gray-300)',
                }}
              />
              <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{color}</span>
              <button
                onClick={() => removeColor(index)}
                style={{
                  padding: '0 var(--spacing-xs)',
                  color: 'var(--color-error)',
                  fontWeight: 600,
                }}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

