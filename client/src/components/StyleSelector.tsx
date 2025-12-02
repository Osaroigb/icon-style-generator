import type { StyleId, StyleOption } from '../types';

interface StyleSelectorProps {
  value: StyleId;
  onChange: (value: StyleId) => void;
}

const STYLE_OPTIONS: StyleOption[] = [
  {
    id: 1,
    name: 'Bold Outlined Pastels',
    description: 'Bold dark purple outlines, pastel colors, flat cartoon style'
  },
  {
    id: 2,
    name: 'Circular with Dots',
    description: 'Thin outlines, pastel circular backgrounds with scattered decorative dots'
  },
  {
    id: 3,
    name: 'Cloud Background',
    description: 'Thin outlines, teal cloud backgrounds with white clouds and stars'
  },
  {
    id: 4,
    name: 'Glossy 3D',
    description: 'No outlines, glossy 3D gradients, modern metallic appearance'
  },
  {
    id: 5,
    name: 'Minimalist Silhouette',
    description: 'White silhouette on solid teal background, monochromatic'
  }
];

export default function StyleSelector({ value, onChange }: StyleSelectorProps) {
  return (
    <div style={{ marginBottom: 'var(--spacing-lg)' }}>
      <label 
        style={{ 
          display: 'block', 
          marginBottom: 'var(--spacing-md)',
          fontWeight: 600,
          color: 'var(--color-gray-900)'
        }}
      >
        Choose a Style
      </label>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 'var(--spacing-md)'
      }}>
        {STYLE_OPTIONS.map((style) => (
          <button
            key={style.id}
            onClick={() => onChange(style.id)}
            style={{
              padding: 'var(--spacing-md)',
              border: `2px solid ${value === style.id ? 'var(--color-primary)' : 'var(--color-gray-300)'}`,
              borderRadius: 'var(--radius-md)',
              backgroundColor: value === style.id ? 'var(--color-primary)' : 'white',
              color: value === style.id ? 'white' : 'var(--color-gray-900)',
              textAlign: 'left',
              cursor: 'pointer',
            }}
          >
            <div style={{ fontWeight: 600, marginBottom: 'var(--spacing-xs)' }}>
              Style {style.id}: {style.name}
            </div>
            <div style={{ 
              fontSize: '0.875rem', 
              opacity: value === style.id ? 0.9 : 0.7 
            }}>
              {style.description}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

