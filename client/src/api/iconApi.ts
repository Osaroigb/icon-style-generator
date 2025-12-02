import type { GenerateRequest, GenerateResponse } from '../types';

const API_BASE_URL = '/api';

export async function generateIcons(request: GenerateRequest): Promise<GenerateResponse> {
  try {
    // Create timeout (90 seconds for AI generation)
    const timeoutMs = 90000;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    const response = await fetch(`${API_BASE_URL}/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || 'Failed to generate icons',
      };
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    
    // Handle timeout specifically
    if (error instanceof Error && error.name === 'AbortError') {
      return {
        success: false,
        error: 'Request timed out. Please try again.',
      };
    }
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error. Please check your connection.',
    };
  }
}

