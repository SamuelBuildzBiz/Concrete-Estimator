import {
  formatCurrency,
  formatDimensions,
  formatProjectType,
  formatSurfaceFinish
} from './formatters';

describe('Formatters', () => {
  describe('formatCurrency', () => {
    it('formats numbers as USD currency', () => {
      expect(formatCurrency(0)).toBe('$0.00');
      expect(formatCurrency(10)).toBe('$10.00');
      expect(formatCurrency(1000)).toBe('$1,000.00');
      expect(formatCurrency(1000000)).toBe('$1,000,000.00');
      expect(formatCurrency(1234.56)).toBe('$1,234.56');
    });

    it('handles negative numbers', () => {
      expect(formatCurrency(-10)).toBe('-$10.00');
      expect(formatCurrency(-1000)).toBe('-$1,000.00');
      expect(formatCurrency(-1234.56)).toBe('-$1,234.56');
    });

    it('handles zero and small numbers', () => {
      expect(formatCurrency(0)).toBe('$0.00');
      expect(formatCurrency(0.1)).toBe('$0.10');
      expect(formatCurrency(0.01)).toBe('$0.01');
    });
  });

  describe('formatDimensions', () => {
    it('formats dimensions with feet and inches', () => {
      expect(formatDimensions(20, 10, 4)).toBe("20' × 10' × 4\"");
      expect(formatDimensions(15, 15, 6)).toBe("15' × 15' × 6\"");
      expect(formatDimensions(30, 20, 8)).toBe("30' × 20' × 8\"");
    });

    it('handles zero values', () => {
      expect(formatDimensions(0, 0, 0)).toBe("0' × 0' × 0\"");
    });

    it('handles decimal values', () => {
      expect(formatDimensions(20.5, 10.75, 4.25)).toBe("20.5' × 10.75' × 4.25\"");
    });
  });

  describe('formatProjectType', () => {
    it('formats project types with proper capitalization and spacing', () => {
      expect(formatProjectType('driveway')).toBe('Driveway');
      expect(formatProjectType('patio')).toBe('Patio');
      expect(formatProjectType('athleticCourt')).toBe('Athletic Court');
      expect(formatProjectType('customProject')).toBe('Custom Project');
    });

    it('handles empty strings', () => {
      expect(formatProjectType('')).toBe('');
    });

    it('handles already formatted strings', () => {
      expect(formatProjectType('Driveway')).toBe('Driveway');
      expect(formatProjectType('Athletic Court')).toBe('Athletic Court');
    });
  });

  describe('formatSurfaceFinish', () => {
    it('formats surface finishes with proper capitalization and spacing', () => {
      expect(formatSurfaceFinish('smooth')).toBe('Smooth');
      expect(formatSurfaceFinish('broom')).toBe('Broom');
      expect(formatSurfaceFinish('stamped')).toBe('Stamped');
      expect(formatSurfaceFinish('exposedAggregate')).toBe('Exposed Aggregate');
    });

    it('handles empty strings', () => {
      expect(formatSurfaceFinish('')).toBe('');
    });

    it('handles already formatted strings', () => {
      expect(formatSurfaceFinish('Smooth')).toBe('Smooth');
      expect(formatSurfaceFinish('Exposed Aggregate')).toBe('Exposed Aggregate');
    });
  });
}); 