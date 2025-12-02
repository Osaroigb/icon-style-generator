import { hexToColorName, isValidHex } from '../utils/colorUtils';

describe('colorUtils', () => {
  describe('isValidHex', () => {
    it('should validate correct HEX colors with #', () => {
      expect(isValidHex('#FF6B9D')).toBe(true);
      expect(isValidHex('#000000')).toBe(true);
      expect(isValidHex('#FFFFFF')).toBe(true);
    });

    it('should validate correct HEX colors without #', () => {
      expect(isValidHex('FF6B9D')).toBe(true);
      expect(isValidHex('4A90E2')).toBe(true);
    });

    it('should reject invalid HEX formats', () => {
      expect(isValidHex('#GGG')).toBe(false);
      expect(isValidHex('12345')).toBe(false);
      expect(isValidHex('#12345678')).toBe(false);
      expect(isValidHex('not-a-color')).toBe(false);
      expect(isValidHex('')).toBe(false);
    });
  });

  describe('hexToColorName', () => {
    it('should convert known HEX codes to color names', () => {
      expect(hexToColorName('#FF6B9D')).toBe('vibrant pink');
      expect(hexToColorName('#4A90E2')).toBe('sky blue');
      expect(hexToColorName('#FF0000')).toBe('red');
    });

    it('should handle HEX codes without # prefix', () => {
      expect(hexToColorName('FF6B9D')).toBe('vibrant pink');
      expect(hexToColorName('4A90E2')).toBe('sky blue');
    });

    it('should be case-insensitive', () => {
      expect(hexToColorName('#ff6b9d')).toBe('vibrant pink');
      expect(hexToColorName('#FF6B9D')).toBe('vibrant pink');
    });

    it('should return original HEX for unknown colors', () => {
      expect(hexToColorName('#123456')).toBe('#123456');
    });

    it('should throw error for invalid HEX format', () => {
      expect(() => hexToColorName('invalid')).toThrow('Invalid HEX color format');
      expect(() => hexToColorName('#GGG')).toThrow('Invalid HEX color format');
    });
  });
});

