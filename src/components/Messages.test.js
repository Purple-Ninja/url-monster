import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import Messages from './Messages';

describe('<Messages />', () => {
  it('renders with correct shape', () => {
    const app = shallow(<Messages />);
    expect(app.find('.same').length).toBe(1);
    expect(app.find('.diff').length).toBe(0);
    expect(app.find('.ckd').text()).toBe('Differences');
  });

  it('responds to isSame', () => {
    const app = shallow(<Messages isSame={false} />);
    expect(app.find('.same').length).toBe(0);
    expect(app.find('.diff').length).toBe(1);
  });

  it('responds to currentFilter', () => {
    let app = shallow(<Messages currentFilter="same" />);
    expect(app.find('.ckd').text()).toBe('Similarities');

    app = shallow(<Messages currentFilter="all" />);
    expect(app.find('.ckd').text()).toBe('Show All');
  });

  it('calls updateFilter when .cab is clicked', () => {
    const updateFilter = sinon.spy();
    const app = shallow(<Messages updateFilter={updateFilter} />);
    
    app.find('.cab').first().simulate('click');
    expect(updateFilter.calledOnce).toBe(true);
  });
});
