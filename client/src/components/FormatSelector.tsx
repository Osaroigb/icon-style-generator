import type { OutputFormat } from '../types';

interface FormatSelectorProps {
  format: OutputFormat;
  quality: number;
  onFormatChange: (format: OutputFormat) => void;
  onQualityChange: (quality: number) => void;
}

export default function FormatSelector({
  format,
  quality,
  onFormatChange,
  onQualityChange,
}: FormatSelectorProps) {
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
        Output Format
      </label>

      <div style={{ display: 'flex', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-md)' }}>
        <button
          onClick={() => onFormatChange('png')}
          style={{
            flex: 1,
            padding: 'var(--spacing-md)',
            border: `2px solid ${format === 'png' ? 'var(--color-primary)' : 'var(--color-gray-300)'}`,
            borderRadius: 'var(--radius-md)',
            backgroundColor: format === 'png' ? 'var(--color-primary)' : 'white',
            color: format === 'png' ? 'white' : 'var(--color-gray-900)',
            fontWeight: 600,
          }}
        >
          <div>PNG</div>
          <div style={{ fontSize: '0.75rem', opacity: 0.8, marginTop: 'var(--spacing-xs)' }}>
            Lossless, best quality
          </div>
        </button>

        <button
          onClick={() => onFormatChange('jpg')}
          style={{
            flex: 1,
            padding: 'var(--spacing-md)',
            border: `2px solid ${format === 'jpg' ? 'var(--color-primary)' : 'var(--color-gray-300)'}`,
            borderRadius: 'var(--radius-md)',
            backgroundColor: format === 'jpg' ? 'var(--color-primary)' : 'white',
            color: format === 'jpg' ? 'white' : 'var(--color-gray-900)',
            fontWeight: 600,
          }}
        >
          <div>JPG</div>
          <div style={{ fontSize: '0.75rem', opacity: 0.8, marginTop: 'var(--spacing-xs)' }}>
            Smaller file size
          </div>
        </button>
      </div>

      {format === 'jpg' && (
        <div style={{ 
          padding: 'var(--spacing-md)', 
          backgroundColor: 'var(--color-gray-50)', 
          borderRadius: 'var(--radius-md)' 
        }}>
          <label 
            htmlFor="quality" 
            style={{ 
              display: 'block', 
              marginBottom: 'var(--spacing-sm)',
              fontWeight: 500,
              fontSize: '0.875rem'
            }}
          >
            JPG Quality: {quality}%
          </label>
          <input
            id="quality"
            type="range"
            min="0"
            max="100"
            value={quality}
            onChange={(e) => onQualityChange(Number(e.target.value))}
            style={{ width: '100%' }}
          />
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            fontSize: '0.75rem',
            color: 'var(--color-gray-500)',
            marginTop: 'var(--spacing-xs)'
          }}>
            <span>Lower size</span>
            <span>Higher quality</span>
          </div>
        </div>
      )}
    </div>
  );
}

