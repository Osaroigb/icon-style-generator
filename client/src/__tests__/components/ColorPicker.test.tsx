import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ColorPicker from '../../components/ColorPicker';

describe('ColorPicker', () => {
  it('renders color input field', () => {
    const onChange = vi.fn();
    render(<ColorPicker colors={[]} onChange={onChange} />);
    
    expect(screen.getByPlaceholderText('#FF6B9D')).toBeInTheDocument();
    expect(screen.getByText(/Add Color/i)).toBeInTheDocument();
  });

  it('adds valid color when button is clicked', () => {
    const onChange = vi.fn();
    render(<ColorPicker colors={[]} onChange={onChange} />);
    
    const input = screen.getByPlaceholderText('#FF6B9D');
    fireEvent.change(input, { target: { value: '#FF6B9D' } });
    
    const addButton = screen.getByText(/Add Color/i);
    fireEvent.click(addButton);
    
    expect(onChange).toHaveBeenCalledWith(['#FF6B9D']);
  });

  it('shows error for invalid HEX format', () => {
    const onChange = vi.fn();
    render(<ColorPicker colors={[]} onChange={onChange} />);
    
    const input = screen.getByPlaceholderText('#FF6B9D');
    fireEvent.change(input, { target: { value: 'invalid' } });
    
    const addButton = screen.getByText(/Add Color/i);
    fireEvent.click(addButton);
    
    expect(screen.getByText(/Invalid HEX color format/i)).toBeInTheDocument();
    expect(onChange).not.toHaveBeenCalled();
  });

  it('prevents adding more than 5 colors', () => {
    const onChange = vi.fn();
    const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF'];
    render(<ColorPicker colors={colors} onChange={onChange} />);
    
    const input = screen.getByPlaceholderText('#FF6B9D');
    fireEvent.change(input, { target: { value: '#FFFFFF' } });
    
    const addButton = screen.getByText(/Add Color/i);
    fireEvent.click(addButton);
    
    expect(screen.getByText(/Maximum 5 colors/i)).toBeInTheDocument();
  });

  it('prevents duplicate colors', () => {
    const onChange = vi.fn();
    const colors = ['#FF6B9D'];
    render(<ColorPicker colors={colors} onChange={onChange} />);
    
    const input = screen.getByPlaceholderText('#FF6B9D');
    fireEvent.change(input, { target: { value: '#FF6B9D' } });
    
    const addButton = screen.getByText(/Add Color/i);
    fireEvent.click(addButton);
    
    expect(screen.getByText(/already added/i)).toBeInTheDocument();
  });

  it('displays color swatches for added colors', () => {
    const onChange = vi.fn();
    const colors = ['#FF6B9D', '#4A90E2'];
    render(<ColorPicker colors={colors} onChange={onChange} />);
    
    expect(screen.getByText('#FF6B9D')).toBeInTheDocument();
    expect(screen.getByText('#4A90E2')).toBeInTheDocument();
  });

  it('removes color when × is clicked', () => {
    const onChange = vi.fn();
    const colors = ['#FF6B9D', '#4A90E2'];
    render(<ColorPicker colors={colors} onChange={onChange} />);
    
    const removeButtons = screen.getAllByText('×');
    fireEvent.click(removeButtons[0]);
    
    expect(onChange).toHaveBeenCalledWith(['#4A90E2']);
  });
});

