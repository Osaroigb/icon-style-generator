import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import PromptForm from '../../components/PromptForm';

describe('PromptForm', () => {
  it('renders input field with placeholder', () => {
    const onChange = vi.fn();
    render(<PromptForm value="" onChange={onChange} />);
    
    const input = screen.getByPlaceholderText(/Toys, Animals, Food/i);
    expect(input).toBeInTheDocument();
  });

  it('calls onChange when user types', () => {
    const onChange = vi.fn();
    render(<PromptForm value="" onChange={onChange} />);
    
    const input = screen.getByPlaceholderText(/Toys, Animals, Food/i);
    fireEvent.change(input, { target: { value: 'Animals' } });
    
    expect(onChange).toHaveBeenCalledWith('Animals');
  });

  it('shows character counter', () => {
    const onChange = vi.fn();
    render(<PromptForm value="Toys" onChange={onChange} />);
    
    expect(screen.getByText(/4\/500 characters/i)).toBeInTheDocument();
  });

  it('shows error when prompt is too long', () => {
    const onChange = vi.fn();
    const longPrompt = 'a'.repeat(501);
    // Start with empty value, then type long prompt to trigger validation
    render(<PromptForm value="" onChange={onChange} />);
    
    const input = screen.getByPlaceholderText(/Toys, Animals, Food/i);
    fireEvent.change(input, { target: { value: longPrompt } });
    
    expect(screen.getByText(/Prompt is too long \(max 500 characters\)/i)).toBeInTheDocument();
  });

  it('displays custom error prop', () => {
    const onChange = vi.fn();
    render(<PromptForm value="Test" onChange={onChange} error="Custom error" />);
    
    expect(screen.getByText('Custom error')).toBeInTheDocument();
  });
});

