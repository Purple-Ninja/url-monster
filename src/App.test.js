import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import { App, mapStateToProps } from './App';
import UrlBox from './components/UrlBox';
import Messages from './components/Messages';
import Footer from './components/Footer';

describe('<App />', () => {
  it('should render with correct shape', () => {
    const appProps = mapStateToProps({
      urls: ['https://tw.yahoo.com', ''],
      filter: 'diff'
    });
    const app = shallow(<App {...appProps} />);
    expect(app.find(UrlBox).length).toBe(2);
    expect(app.find(Messages).length).toBe(0);
    expect(app.find(Footer).length).toBe(1);
  });

  it('should show Messages if url 2 is not empty', () => {
    const appProps = mapStateToProps({
      urls: ['https://tw.yahoo.com', 'https://www.google.com.tw/']
    });
    const app = shallow(<App {...appProps} />);
    expect(app.find(Messages).length).toBe(1);
  });

  describe('#compareUrls', () => {
    let compareUrls;

    beforeEach(() => {
      const appInstance = shallow(<App />).instance();
      compareUrls = appInstance.compareUrls.bind(appInstance);
    });

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
    let getDiffFields;

    beforeEach(() => {
      const appInstance = shallow(<App />).instance();
      getDiffFields = appInstance.getDiffFields.bind(appInstance);
    });

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
