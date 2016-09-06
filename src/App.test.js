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
    expect(app.find(UrlBox).length).toEqual(2);
    expect(app.find(Messages).length).toEqual(0);
    expect(app.find(Footer).length).toEqual(1);
  });

  describe('<Messages />', () => {
    it('renders no Message if url2 is empty', () => {
      const appProps = {
        urls: ['https://tw.yahoo.com/', '']
      };
      const app = shallow(<App {...appProps} />);
      expect(app.find(Messages).length).toEqual(0);
    });

    it('renders Message if url2 is not empty', () => {
      const appProps = {
        urls: ['https://tw.yahoo.com/', 'https://tw.yahoo.com/']
      };
      const app = shallow(<App {...appProps} />);
      expect(app.find(Messages).length).toEqual(1);
    });
  });
});
