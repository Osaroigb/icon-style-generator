export default function LoadingSpinner() {
  return (
    <div style={{ textAlign: 'center', padding: 'var(--spacing-2xl)' }}>
      <div
        className="spinner"
        style={{
          width: '48px',
          height: '48px',
          border: '4px solid var(--color-gray-200)',
          borderTopColor: 'var(--color-primary)',
          borderRadius: '50%',
          margin: '0 auto var(--spacing-md)',
        }}
      />
      <p style={{ color: 'var(--color-gray-600)' }}>
        Generating your icons...
      </p>
      <p style={{ fontSize: '0.875rem', color: 'var(--color-gray-500)', marginTop: 'var(--spacing-sm)' }}>
        This may take 10-30 seconds
      </p>
    </div>
  );
}

