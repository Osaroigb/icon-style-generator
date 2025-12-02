import { stylePresets, getStyleById } from '../stylePresets';

describe('stylePresets', () => {
  it('should have exactly 5 styles', () => {
    expect(stylePresets).toHaveLength(5);
  });

  it('should have unique IDs from 1-5', () => {
    const ids = stylePresets.map(s => s.id);
    expect(ids).toEqual([1, 2, 3, 4, 5]);
  });

  it('should have all required properties', () => {
    stylePresets.forEach(style => {
      expect(style).toHaveProperty('id');
      expect(style).toHaveProperty('name');
      expect(style).toHaveProperty('promptPrefix');
      expect(typeof style.name).toBe('string');
      expect(typeof style.promptPrefix).toBe('string');
      expect(style.promptPrefix.length).toBeGreaterThan(0);
    });
  });

  describe('getStyleById', () => {
    it('should return correct style for valid IDs', () => {
      const style1 = getStyleById(1);
      expect(style1?.id).toBe(1);
      expect(style1?.name).toBe('Bold Outlined Pastels');

      const style5 = getStyleById(5);
      expect(style5?.id).toBe(5);
      expect(style5?.name).toBe('Minimalist Silhouette');
    });

    it('should return undefined for invalid IDs', () => {
      expect(getStyleById(0)).toBeUndefined();
      expect(getStyleById(6)).toBeUndefined();
      expect(getStyleById(99)).toBeUndefined();
    });
  });
});

