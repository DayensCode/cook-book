import { formatTime } from '@/helpers/index';

describe('formatTime', () => {
  it('formats only minutes', () => {
    expect(formatTime(15)).toBe('15 мин');
  });

  it('formats only hours', () => {
    expect(formatTime(120)).toBe('2 ч');
  });

  it('formats hours and minutes', () => {
    expect(formatTime(135)).toBe('2 ч 15 мин');
  });

  it('formats 0 minutes as 0 мин', () => {
    expect(formatTime(0)).toBe('0 мин');
  });

  it('formats less than 1 hour', () => {
    expect(formatTime(59)).toBe('59 мин');
  });

  it('formats exact 1 hour', () => {
    expect(formatTime(60)).toBe('1 ч');
  });
});
