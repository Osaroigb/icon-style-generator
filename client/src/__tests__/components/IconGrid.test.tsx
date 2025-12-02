import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import IconGrid from '../../components/IconGrid';

// Mock download utilities
vi.mock('../../utils/download', () => ({
  downloadImage: vi.fn(),
  downloadAllImages: vi.fn(),
}));

describe('IconGrid', () => {
  const mockImages = [
    'https://example.com/icon1.png',
    'https://example.com/icon2.png',
    'https://example.com/icon3.png',
    'https://example.com/icon4.png',
  ];

  it('shows empty state when no images', () => {
    render(<IconGrid images={[]} format="png" prompt="Toys" />);
    
    expect(screen.getByText(/No icons generated yet/i)).toBeInTheDocument();
  });

  it('displays all 4 generated icons', () => {
    render(<IconGrid images={mockImages} format="png" prompt="Food" />);
    
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(4);
  });

  it('shows format and size information', () => {
    render(<IconGrid images={mockImages} format="png" prompt="Animals" />);
    
    expect(screen.getByText(/Format: PNG/i)).toBeInTheDocument();
    expect(screen.getByText(/512×512px/i)).toBeInTheDocument();
  });

  it('has download button for each icon', () => {
    render(<IconGrid images={mockImages} format="png" prompt="Gadgets" />);
    
    expect(screen.getByText(/Download Icon 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Download Icon 2/i)).toBeInTheDocument();
    expect(screen.getByText(/Download Icon 3/i)).toBeInTheDocument();
    expect(screen.getByText(/Download Icon 4/i)).toBeInTheDocument();
  });

  it('has Download All button', () => {
    render(<IconGrid images={mockImages} format="png" prompt="Sports" />);
    
    expect(screen.getByText(/Download All/i)).toBeInTheDocument();
  });

  it('calls download when individual button clicked', async () => {
    const { downloadImage } = await import('../../utils/download');
    render(<IconGrid images={mockImages} format="png" prompt="Tools" />);
    
    const downloadButton = screen.getByText(/Download Icon 1/i);
    fireEvent.click(downloadButton);
    
    expect(downloadImage).toHaveBeenCalled();
  });
});

