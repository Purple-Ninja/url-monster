import React, { Component } from 'react';

class CompareBox extends Component {
  render() {
    const {
      field,
      isQuery,
      parsedUrls
    } = this.props;

    return (
      <div id="url-query-asdf" className="compt diff">
        <span className="fd">
          <span className="name">{field}</span>
          {isQuery ? <span className="meta">query</span> : null}
        </span>
        <input value={(isQuery ? parsedUrls[0].query : parsedUrls[0])[field]}
          type="text"
          className="editable url u1"
          placeholder="UNDEFINED" />
        <input value={(isQuery ? parsedUrls[1].query : parsedUrls[1])[field]}
          type="text"
          className="editable url u2"
          placeholder="UNDEFINED" />
      </div>
    );
  }
}

export default CompareBox;
