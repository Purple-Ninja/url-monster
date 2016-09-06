import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import App from './App';
import UrlBox from './components/UrlBox';
import Messages from './components/Messages';
import Footer from './components/Footer';

describe('<App />', () => {
  it('renders with correct shape', () => {
    const app = shallow(<App />);
    expect(app.find(UrlBox).length).toBe(2);
    expect(app.find(Messages).length).toBe(0);
    expect(app.find(Footer).length).toBe(1);
  });

  it('renders no Message if url2 is empty', () => {
    const appProps = {
      urls: ['https://tw.yahoo.com/', '']
    };
    const app = shallow(<App {...appProps} />);
    expect(app.find(Messages).length).toBe(0);
  });

  it('renders Message if url2 is not empty', () => {
    const appProps = {
      urls: ['https://tw.yahoo.com/', 'https://tw.yahoo.com/']
    };
    const app = shallow(<App {...appProps} />);
    expect(app.find(Messages).length).toBe(1);
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
