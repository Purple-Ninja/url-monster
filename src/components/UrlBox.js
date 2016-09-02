import React, { Component } from 'react';

class UrlBox extends Component {
  render() {
    return (
      <div className="urlui">
        <div className="box">
          <input id="u1" type="text" className="url u1" placeholder="Input URL 1"/>
        </div>
        <div className="actions" data-uid="1">
          <a className="cabs act-go-cr">Go (current)</a>
          <a className="cabs act-go-new">Go (new)</a>
          <a className="cabs act-clear">Clear</a>
        </div>
      </div>
    );
  }
}

export default UrlBox;
