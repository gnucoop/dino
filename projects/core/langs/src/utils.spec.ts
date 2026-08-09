import {extractVariables, isRtlLang, langLabel, langRowCompletion, splitVariables} from './utils';

describe('langs utils', () => {
  describe('isRtlLang', () => {
    it('should detect the right to left languages', () => {
      expect(isRtlLang('AR')).toBe(true);
      expect(isRtlLang('ITA')).toBe(false);
      expect(isRtlLang('')).toBe(false);
    });
  });

  describe('extractVariables', () => {
    it('should return every placeholder without duplicates', () => {
      expect(extractVariables('A {{schema_name}} form with {{schema_name}} and {{count}}')).toEqual(
        ['{{schema_name}}', '{{count}}'],
      );
    });

    it('should return an empty list when there is no placeholder', () => {
      expect(extractVariables('Add New')).toEqual([]);
      expect(extractVariables('')).toEqual([]);
    });
  });

  describe('splitVariables', () => {
    it('should split the text around the placeholders', () => {
      expect(splitVariables('remove: {{language}} now')).toEqual([
        {text: 'remove: ', variable: false},
        {text: '{{language}}', variable: true},
        {text: ' now', variable: false},
      ]);
    });

    it('should handle a text made of a single placeholder', () => {
      expect(splitVariables('{{language}}')).toEqual([{text: '{{language}}', variable: true}]);
    });

    it('should handle a text with no placeholder', () => {
      expect(splitVariables('Accept')).toEqual([{text: 'Accept', variable: false}]);
    });
  });

  describe('langRowCompletion', () => {
    const langs = ['ENG', 'ITA', 'FRA', 'AR'];

    it('should count only the non blank translations', () => {
      const row = {key: 'Accept', ENG: 'Accept', ITA: 'Accetta', FRA: '   ', AR: ''};
      expect(langRowCompletion(row, langs)).toEqual({filled: 2, total: 4, pct: 50});
    });

    it('should return 100 when every language is translated', () => {
      const row = {key: 'Accept', ENG: 'a', ITA: 'b', FRA: 'c', AR: 'd'};
      expect(langRowCompletion(row, langs)).toEqual({filled: 4, total: 4, pct: 100});
    });

    it('should not divide by zero when there is no language', () => {
      expect(langRowCompletion({key: 'Accept'}, [])).toEqual({filled: 0, total: 0, pct: 0});
    });

    it('should ignore the languages missing from the row', () => {
      expect(langRowCompletion({key: 'Accept', ENG: 'Accept'}, langs).filled).toBe(1);
    });
  });

  describe('langLabel', () => {
    it('should return the name of the language written in that language', () => {
      expect(langLabel('ITA')).toBe('Italiano');
      expect(langLabel('ENG')).toBe('English');
    });

    it('should fall back to the code of an unknown language', () => {
      expect(langLabel('ZZZ')).toBe('ZZZ');
    });
  });
});
