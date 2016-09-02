import React, { Component } from 'react';

class CompareBox extends Component {
  render() {
    return (
      <div id="url-query-asdf" className="compt diff">
        <span className="fd"><span className="name">asdf</span><span className="meta">query</span></span>
        <input type="text" className="editable url u1" placeholder="UNDEFINED" />
        <input type="text" className="editable url u2" />
      </div>
    );
  }
}

export default CompareBox;
