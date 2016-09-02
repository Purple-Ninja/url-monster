import React, { Component } from 'react';

class CompareBox extends Component {
  render() {
    return (
      <div id="url-query-asdf" className="compt diff">
        <span className="fd"><span className="name">asdf</span><span className="meta">query</span></span>
        <input type="text" className="editable url u1" value="" lid="query-asdf" lurl="1" placeholder="UNDEFINED" />
        <input type="text" className="editable url u2" value="asdfasdf" lid="query-asdf" lurl="2" />
      </div>
    );
  }
}

export default CompareBox;
