import { useState } from 'react';
import { downloadImage, downloadAllImages } from '../utils/download';
import type { OutputFormat } from '../types';

interface IconGridProps {
  images: string[];
  format: OutputFormat;
  prompt: string;
}

export default function IconGrid({ images, format, prompt }: IconGridProps) {
  const [downloading, setDownloading] = useState<number | null>(null);
  const [downloadingAll, setDownloadingAll] = useState(false);
  const [error, setError] = useState<string>('');

  const handleDownload = async (imageUrl: string, index: number) => {
    setDownloading(index);
    setError('');
    try {
      const fileName = `icon-${prompt.toLowerCase().replace(/\s+/g, '-')}-${index + 1}`;
      await downloadImage(imageUrl, fileName, format);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Download failed');
    } finally {
      setDownloading(null);
    }
  };

  const handleDownloadAll = async () => {
    setDownloadingAll(true);
    setError('');
    try {
      const baseFileName = `icon-${prompt.toLowerCase().replace(/\s+/g, '-')}`;
      await downloadAllImages(images, baseFileName, format);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Download all failed');
    } finally {
      setDownloadingAll(false);
    }
  };

  if (images.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: 'var(--spacing-2xl)',
        color: 'var(--color-gray-500)'
      }}>
        <p>No icons generated yet. Fill in the form above and click Generate!</p>
      </div>
    );
  }

  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 'var(--spacing-lg)'
      }}>
        <div>
          <h3 style={{ marginBottom: 'var(--spacing-xs)' }}>Generated Icons</h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-gray-600)' }}>
            Format: {format.toUpperCase()} • Size: 512×512px
          </p>
        </div>
        <button
          onClick={handleDownloadAll}
          disabled={downloadingAll}
          style={{
            padding: 'var(--spacing-md) var(--spacing-lg)',
            backgroundColor: 'var(--color-secondary)',
            color: 'white',
            borderRadius: 'var(--radius-md)',
            fontWeight: 600,
          }}
        >
          {downloadingAll ? 'Downloading...' : 'Download All'}
        </button>
      </div>

      {error && (
        <div style={{
          padding: 'var(--spacing-md)',
          backgroundColor: '#fee',
          color: 'var(--color-error)',
          borderRadius: 'var(--radius-md)',
          marginBottom: 'var(--spacing-md)'
        }}>
          {error}
        </div>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: 'var(--spacing-lg)'
      }}>
        {images.map((imageUrl, index) => (
          <div
            key={index}
            style={{
              border: '2px solid var(--color-gray-200)',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              backgroundColor: 'white'
            }}
          >
            <div style={{
              width: '100%',
              paddingBottom: '100%',
              position: 'relative',
              backgroundColor: 'var(--color-gray-50)'
            }}>
              <img
                src={imageUrl}
                alt={`Generated icon ${index + 1}`}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain'
                }}
              />
            </div>
            <div style={{ padding: 'var(--spacing-md)' }}>
              <button
                onClick={() => handleDownload(imageUrl, index)}
                disabled={downloading === index}
                style={{
                  width: '100%',
                  padding: 'var(--spacing-sm)',
                  backgroundColor: 'var(--color-primary)',
                  color: 'white',
                  borderRadius: 'var(--radius-md)',
                  fontWeight: 500,
                  fontSize: '0.875rem'
                }}
              >
                {downloading === index ? 'Downloading...' : `Download Icon ${index + 1}`}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
