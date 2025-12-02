import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import FormatSelector from '../../components/FormatSelector';

describe('FormatSelector', () => {
  it('renders PNG and JPG options', () => {
    const onFormatChange = vi.fn();
    const onQualityChange = vi.fn();
    render(
      <FormatSelector 
        format="png" 
        quality={80} 
        onFormatChange={onFormatChange} 
        onQualityChange={onQualityChange} 
      />
    );
    
    expect(screen.getByText('PNG')).toBeInTheDocument();
    expect(screen.getByText('JPG')).toBeInTheDocument();
  });

  it('highlights selected format', () => {
    const onFormatChange = vi.fn();
    const onQualityChange = vi.fn();
    render(
      <FormatSelector 
        format="png" 
        quality={80} 
        onFormatChange={onFormatChange} 
        onQualityChange={onQualityChange} 
      />
    );
    
    const pngButton = screen.getByText('PNG').closest('button');
    expect(pngButton).toHaveStyle({ backgroundColor: 'var(--color-primary)' });
  });

  it('calls onFormatChange when format is clicked', () => {
    const onFormatChange = vi.fn();
    const onQualityChange = vi.fn();
    render(
      <FormatSelector 
        format="png" 
        quality={80} 
        onFormatChange={onFormatChange} 
        onQualityChange={onQualityChange} 
      />
    );
    
    const jpgButton = screen.getByText('JPG').closest('button');
    fireEvent.click(jpgButton!);
    
    expect(onFormatChange).toHaveBeenCalledWith('jpg');
  });

  it('shows quality slider only for JPG format', () => {
    const onFormatChange = vi.fn();
    const onQualityChange = vi.fn();
    
    const { rerender } = render(
      <FormatSelector 
        format="png" 
        quality={80} 
        onFormatChange={onFormatChange} 
        onQualityChange={onQualityChange} 
      />
    );
    
    expect(screen.queryByText(/JPG Quality/i)).not.toBeInTheDocument();
    
    rerender(
      <FormatSelector 
        format="jpg" 
        quality={80} 
        onFormatChange={onFormatChange} 
        onQualityChange={onQualityChange} 
      />
    );
    
    expect(screen.getByText(/JPG Quality: 80%/i)).toBeInTheDocument();
  });

  it('updates quality when slider changes', () => {
    const onFormatChange = vi.fn();
    const onQualityChange = vi.fn();
    render(
      <FormatSelector 
        format="jpg" 
        quality={80} 
        onFormatChange={onFormatChange} 
        onQualityChange={onQualityChange} 
      />
    );
    
    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: '95' } });
    
    expect(onQualityChange).toHaveBeenCalledWith(95);
  });
});

