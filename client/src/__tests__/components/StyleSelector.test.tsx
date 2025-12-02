import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import StyleSelector from '../../components/StyleSelector';

describe('StyleSelector', () => {
  it('renders all 5 style options', () => {
    const onChange = vi.fn();
    render(<StyleSelector value={1} onChange={onChange} />);
    
    expect(screen.getByText(/Style 1:/i)).toBeInTheDocument();
    expect(screen.getByText(/Style 2:/i)).toBeInTheDocument();
    expect(screen.getByText(/Style 3:/i)).toBeInTheDocument();
    expect(screen.getByText(/Style 4:/i)).toBeInTheDocument();
    expect(screen.getByText(/Style 5:/i)).toBeInTheDocument();
  });

  it('highlights selected style', () => {
    const onChange = vi.fn();
    const { rerender } = render(<StyleSelector value={1} onChange={onChange} />);
    
    const style1Button = screen.getByText(/Style 1:/i).closest('button');
    expect(style1Button).toHaveStyle({ backgroundColor: 'var(--color-primary)' });

    rerender(<StyleSelector value={2} onChange={onChange} />);
    const style2Button = screen.getByText(/Style 2:/i).closest('button');
    expect(style2Button).toHaveStyle({ backgroundColor: 'var(--color-primary)' });
  });

  it('calls onChange when style is clicked', () => {
    const onChange = vi.fn();
    render(<StyleSelector value={1} onChange={onChange} />);
    
    const style3Button = screen.getByText(/Style 3:/i).closest('button');
    fireEvent.click(style3Button!);
    
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it('shows style descriptions', () => {
    const onChange = vi.fn();
    render(<StyleSelector value={1} onChange={onChange} />);
    
    expect(screen.getByText(/Bold dark purple outlines/i)).toBeInTheDocument();
    expect(screen.getByText(/glossy 3D gradients, modern metallic appearance/i)).toBeInTheDocument();
  });
});

