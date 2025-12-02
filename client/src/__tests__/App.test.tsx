import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';

// Mock API
vi.mock('../api/iconApi', () => ({
  generateIcons: vi.fn(async () => ({
    success: true,
    images: ['url1', 'url2', 'url3', 'url4'],
    format: 'png',
  })),
}));

// Mock download utilities
vi.mock('../utils/download', () => ({
  downloadImage: vi.fn(),
  downloadAllImages: vi.fn(),
}));

describe('App Integration', () => {
  it('renders main heading', () => {
    render(<App />);
    expect(screen.getByText(/Icon Style Generator/i)).toBeInTheDocument();
  });

  it('shows initial empty state', () => {
    render(<App />);
    expect(screen.getByText(/Ready to create amazing icons/i)).toBeInTheDocument();
  });

  it('has Generate button disabled when prompt is empty', () => {
    render(<App />);
    const generateButton = screen.getByRole('button', { name: /Generate Icons/i });
    expect(generateButton).toBeDisabled();
  });

  it('enables Generate button when prompt is filled', () => {
    render(<App />);
    
    const input = screen.getByPlaceholderText(/Toys, Animals, Food/i);
    fireEvent.change(input, { target: { value: 'Toys' } });
    
    const generateButton = screen.getByRole('button', { name: /Generate Icons/i });
    expect(generateButton).not.toBeDisabled();
  });

  it('shows error for empty prompt on generate', async () => {
    render(<App />);
    
    // Try to click generate without filling prompt
    const input = screen.getByPlaceholderText(/Toys, Animals, Food/i);
    fireEvent.change(input, { target: { value: '   ' } });
    
    const generateButton = screen.getByRole('button', { name: /Generate Icons/i });
    // Button should be disabled for empty prompt
    expect(generateButton).toBeDisabled();
  });

  it('shows error for too long prompt', async () => {
    render(<App />);
    
    const input = screen.getByPlaceholderText(/Toys, Animals, Food/i);
    const longPrompt = 'a'.repeat(501);
    fireEvent.change(input, { target: { value: longPrompt } });
    
    // Error should appear immediately on change
    expect(screen.getByText(/Prompt is too long \(max 500 characters\)/i)).toBeInTheDocument();
  });

  it('calls API and displays icons on success', async () => {
    const { generateIcons } = await import('../api/iconApi');
    render(<App />);
    
    const input = screen.getByPlaceholderText(/Toys, Animals, Food/i);
    fireEvent.change(input, { target: { value: 'Food' } });
    
    const generateButton = screen.getByRole('button', { name: /Generate Icons/i });
    fireEvent.click(generateButton);
    
    await waitFor(() => {
      expect(generateIcons).toHaveBeenCalled();
    });
  });
});

