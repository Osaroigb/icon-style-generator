import { useState } from 'react';
import PromptForm from './components/PromptForm';
import StyleSelector from './components/StyleSelector';
import ColorPicker from './components/ColorPicker';
import FormatSelector from './components/FormatSelector';
import LoadingSpinner from './components/LoadingSpinner';
import IconGrid from './components/IconGrid';
import { generateIcons } from './api/iconApi';
import type { StyleId, OutputFormat } from './types';

function App() {
  // Form state
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState<StyleId>(1);
  const [colors, setColors] = useState<string[]>([]);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>('png');
  const [outputQuality, setOutputQuality] = useState(80);

  // Generation state
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    if (prompt.trim().length > 500) {
      setError('Prompt is too long. Maximum 500 characters.');
      return;
    }

    setLoading(true);
    setError('');
    setImages([]);

    try {
      const response = await generateIcons({
        prompt: prompt.trim(),
        style,
        colors: colors.length > 0 ? colors : undefined,
        outputFormat,
        outputQuality,
      });

      if (response.success && response.images) {
        setImages(response.images);
      } else {
        setError(response.error || 'Failed to generate icons');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setImages([]);
    setError('');
  };

  return (
    <div className="container" style={{ padding: '2rem', maxWidth: '1200px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-2xl)' }}>
        <h1 style={{ marginBottom: 'var(--spacing-sm)' }}>Icon Style Generator</h1>
        <p style={{ color: 'var(--color-gray-600)', fontSize: '1.125rem' }}>
          Generate 4 unique icons in consistent visual styles
        </p>
      </div>

      {/* Form */}
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-lg)',
          padding: 'var(--spacing-2xl)',
          marginBottom: 'var(--spacing-2xl)',
        }}
      >
        <PromptForm value={prompt} onChange={setPrompt} error={error} />
        
        <StyleSelector value={style} onChange={setStyle} />
        
        <ColorPicker colors={colors} onChange={setColors} />
        
        <FormatSelector
          format={outputFormat}
          quality={outputQuality}
          onFormatChange={setOutputFormat}
          onQualityChange={setOutputQuality}
        />

        <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
          <button
            onClick={handleGenerate}
            disabled={loading || !prompt.trim()}
            style={{
              flex: 1,
              padding: 'var(--spacing-lg)',
              backgroundColor: 'var(--color-primary)',
              color: 'white',
              borderRadius: 'var(--radius-md)',
              fontWeight: 600,
              fontSize: '1rem',
            }}
          >
            {loading ? 'Generating...' : '✨ Generate Icons'}
          </button>

          {images.length > 0 && (
            <button
              onClick={handleClear}
              disabled={loading}
              style={{
                padding: 'var(--spacing-lg) var(--spacing-xl)',
                backgroundColor: 'var(--color-gray-200)',
                color: 'var(--color-gray-700)',
                borderRadius: 'var(--radius-md)',
                fontWeight: 600,
              }}
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-lg)',
          padding: 'var(--spacing-2xl)',
        }}
      >
        {loading && <LoadingSpinner />}
        
        {!loading && error && !images.length && (
          <div
            style={{
              padding: 'var(--spacing-xl)',
              backgroundColor: '#fee',
              color: 'var(--color-error)',
              borderRadius: 'var(--radius-md)',
              textAlign: 'center',
            }}
          >
            <strong>Error:</strong> {error}
          </div>
        )}

        {!loading && images.length > 0 && (
          <IconGrid images={images} format={outputFormat} prompt={prompt} />
        )}

        {!loading && !error && images.length === 0 && (
          <div
            style={{
              textAlign: 'center',
              padding: 'var(--spacing-2xl)',
              color: 'var(--color-gray-500)',
            }}
          >
            <p style={{ fontSize: '1.125rem', marginBottom: 'var(--spacing-sm)' }}>
              Ready to create amazing icons!
            </p>
            <p>Fill in the form above and click "Generate Icons" to get started.</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', marginTop: 'var(--spacing-xl)', color: 'var(--color-gray-500)', fontSize: '0.875rem' }}>
        <p>Powered by Replicate Flux-Schnell • All icons are 512×512px</p>
      </div>
    </div>
  );
}

export default App;
