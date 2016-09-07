import { compareUrls, getDiffFields } from './UrlHelper';

describe('urlHelper', () => {
  describe('#compareUrls', () => {
    it('should parse and tell the difference', () => {
      const foo = 'https://tw.yahoo.com/?bucket=181&query=string';
      const bar = 'http://user:pass@host.com:8080/p/a/t/h?query=string#hash';

      expect(compareUrls([foo, bar])).toEqual({
        isSame: false,
        diffFields: ['protocol', 'auth', 'hostname', 'port', 'pathname', 'query', 'hash'],
        queryAllFields: ['bucket', 'query'],
        queryDiffFields: ['bucket']
      });
    });

    it('should ignore the order of queries', () => {
      const foo = 'https://tw.yahoo.com/?a=a&b=b';
      const bar = 'https://tw.yahoo.com/?b=b&a=a';

      expect(compareUrls([foo, bar])).toEqual({
        isSame: true,
        diffFields: [],
        queryAllFields: ['a', 'b'],
        queryDiffFields: []
      });
    });
  });

  describe('#getDiffFields', () => {
    it('should show extra properties', () => {
      const foo = { a: 1, b: 2 };
      const bar = { b: 2, c: 3 };

      expect(getDiffFields(foo, bar)).toEqual(['a']);
    });

    it('should detect value difference', () => {
      const foo = { a: 1, b: 2 };
      const bar = { b: 200, c: 3 };

      expect(getDiffFields(foo, bar)).toEqual(['a', 'b']);
    });

    it('should detect extra properties from both sides', () => {
      const foo = { a: 1, b: 2 };
      const bar = { b: 200, c: 3 };

      expect(getDiffFields(foo, bar, true)).toEqual(['a', 'b', 'c']);
    });
  });
});
