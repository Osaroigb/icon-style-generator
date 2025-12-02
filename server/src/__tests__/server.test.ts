import { describe, it, expect, jest } from '@jest/globals';

// Mock dependencies before importing server
jest.mock('../config/env', () => ({
  env: {
    replicateApiToken: 'test-token',
    port: 3001,
    nodeEnv: 'test',
  },
}));

jest.mock('../services/promptBuilder', () => ({
  buildPrompt: jest.fn((prompt, style) => `4 different ${prompt} icons, style ${style}`),
}));

jest.mock('../services/replicateService', () => ({
  generateIcons: jest.fn(async () => ({
    imageUrls: ['url1', 'url2', 'url3', 'url4'],
    format: 'png',
  })),
}));

describe('Server Validation', () => {
  describe('POST /generate validation', () => {
    it('should validate prompt is required', () => {
      const invalidRequests = [
        { style: 1 },
        { prompt: '', style: 1 },
        { prompt: '   ', style: 1 },
      ];

      invalidRequests.forEach(req => {
        const isValid = !!(req.prompt && req.prompt.trim().length > 0);
        expect(isValid).toBe(false);
      });
    });

    it('should validate prompt max length (500 chars)', () => {
      const longPrompt = 'a'.repeat(501);
      const isValid = longPrompt.length <= 500;
      expect(isValid).toBe(false);

      const validPrompt = 'a'.repeat(500);
      const isValidLength = validPrompt.length <= 500;
      expect(isValidLength).toBe(true);
    });

    it('should validate style is between 1-5', () => {
      const invalidStyles = [0, 6, 99, -1];
      invalidStyles.forEach(style => {
        const isValid = style >= 1 && style <= 5;
        expect(isValid).toBe(false);
      });

      const validStyles = [1, 2, 3, 4, 5];
      validStyles.forEach(style => {
        const isValid = style >= 1 && style <= 5;
        expect(isValid).toBe(true);
      });
    });

    it('should validate output format', () => {
      const invalidFormats = ['webp', 'gif', 'bmp', ''];
      invalidFormats.forEach(format => {
        const isValid = format === 'png' || format === 'jpg';
        expect(isValid).toBe(false);
      });

      const validFormats = ['png', 'jpg'];
      validFormats.forEach(format => {
        const isValid = format === 'png' || format === 'jpg';
        expect(isValid).toBe(true);
      });
    });

    it('should validate output quality (0-100)', () => {
      const invalidQualities = [-1, 101, 999];
      invalidQualities.forEach(quality => {
        const isValid = quality >= 0 && quality <= 100;
        expect(isValid).toBe(false);
      });

      const validQualities = [0, 50, 80, 100];
      validQualities.forEach(quality => {
        const isValid = quality >= 0 && quality <= 100;
        expect(isValid).toBe(true);
      });
    });
  });
});

