import {parseLatLon} from './forms-map';

describe('parseLatLon', () => {
  it('parses a complete pair', () => {
    expect(parseLatLon('45.1,9.2')).toEqual([45.1, 9.2]);
    expect(parseLatLon(' -12.5 , 130 ')).toEqual([-12.5, 130]);
  });

  it('rejects partial values saved by ajf', () => {
    expect(parseLatLon('45.1,')).toBeNull();
    expect(parseLatLon(',9.2')).toBeNull();
    expect(parseLatLon(',')).toBeNull();
  });

  it('rejects non-numeric and out-of-range values', () => {
    expect(parseLatLon('abc,1')).toBeNull();
    expect(parseLatLon('95,0')).toBeNull();
    expect(parseLatLon('0,181')).toBeNull();
  });

  it('rejects non-strings', () => {
    expect(parseLatLon(null)).toBeNull();
    expect(parseLatLon(undefined)).toBeNull();
    expect(parseLatLon([45.1, 9.2])).toBeNull();
    expect(parseLatLon('45.1')).toBeNull();
  });
});
