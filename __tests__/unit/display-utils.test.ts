import { formatFileSize } from '../../lib/performance-utils';

describe('formatFileSize', () => {
  it('formats bytes correctly', () => {
    expect(formatFileSize(1024)).toBe('1 KB');
    expect(formatFileSize(1048576)).toBe('1 MB');
    expect(formatFileSize(0)).toBe('0 Bytes');
  });
}); 