import { buildPrompt } from '../services/promptBuilder';

describe('promptBuilder', () => {
  describe('buildPrompt', () => {
    it('should build prompt with user input and style', () => {
      const result = buildPrompt('Toys', 1);
      expect(result).toContain('4 different Toys icons');
      expect(result).toContain('bold dark purple outlines');
      expect(result).toContain('pastel colors');
    });

    it('should handle all 5 styles', () => {
      const style1 = buildPrompt('Food', 1);
      expect(style1).toContain('bold dark purple outlines');

      const style2 = buildPrompt('Food', 2);
      expect(style2).toContain('thin dark brown outlines');
      expect(style2).toContain('circular background');

      const style3 = buildPrompt('Food', 3);
      expect(style3).toContain('cloud background');

      const style4 = buildPrompt('Food', 4);
      expect(style4).toContain('glossy 3D');

      const style5 = buildPrompt('Food', 5);
      expect(style5).toContain('white silhouette');
      expect(style5).toContain('teal');
    });

    it('should integrate colors when provided', () => {
      const result = buildPrompt('Animals', 2, ['#FF6B9D', '#4A90E2']);
      expect(result).toContain('using color palette');
      expect(result).toContain('vibrant pink');
      expect(result).toContain('sky blue');
    });

    it('should work without colors', () => {
      const result = buildPrompt('Gadgets', 3);
      expect(result).not.toContain('color palette');
      expect(result).toContain('4 different Gadgets icons');
    });

    it('should trim whitespace from prompt', () => {
      const result = buildPrompt('  Toys  ', 1);
      expect(result).toContain('4 different Toys icons');
      expect(result).not.toContain('  Toys  ');
    });

    it('should throw error for empty prompt', () => {
      expect(() => buildPrompt('', 1)).toThrow('User prompt cannot be empty');
      expect(() => buildPrompt('   ', 1)).toThrow('User prompt cannot be empty');
    });

    it('should throw error for invalid style ID', () => {
      expect(() => buildPrompt('Toys', 0)).toThrow('Invalid style ID');
      expect(() => buildPrompt('Toys', 6)).toThrow('Invalid style ID');
      expect(() => buildPrompt('Toys', 99)).toThrow('Invalid style ID');
    });
  });
});

