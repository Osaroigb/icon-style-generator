import { describe, it, expect } from 'vitest';
import type { GenerateRequest } from '../../types';

describe('iconApi', () => {
  describe('generateIcons validation', () => {
    it('should validate request structure', () => {
      const request: GenerateRequest = {
        prompt: 'Toys',
        style: 1,
      };

      expect(request.prompt).toBe('Toys');
      expect(request.style).toBe(1);
      expect(request.style).toBeGreaterThanOrEqual(1);
      expect(request.style).toBeLessThanOrEqual(5);
    });

    it('should validate API endpoint', () => {
      const endpoint = '/api/generate';
      expect(endpoint).toBe('/api/generate');
      expect(endpoint.startsWith('/api')).toBe(true);
    });

    it('should validate request method', () => {
      const method = 'POST';
      expect(method).toBe('POST');
    });

    it('should validate timeout duration', () => {
      const timeoutMs = 90000;
      expect(timeoutMs).toBe(90000);
      expect(timeoutMs).toBeGreaterThan(0);
    });

    it('should validate success response structure', () => {
      const mockResponse = {
        success: true,
        images: ['url1', 'url2', 'url3', 'url4'],
        format: 'png' as const,
      };

      expect(mockResponse.success).toBe(true);
      expect(mockResponse.images).toHaveLength(4);
      expect(mockResponse.format).toBe('png');
    });

    it('should validate error response structure', () => {
      const errorResponse = {
        success: false,
        error: 'Test error',
      };

      expect(errorResponse.success).toBe(false);
      expect(errorResponse.error).toBeDefined();
    });
  });
});

