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
});
