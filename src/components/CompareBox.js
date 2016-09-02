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
        {parsedUrls.map((parsedUrl, index) => {
          return <input value={(isQuery ? parsedUrls[index].query : parsedUrls[index])[field] || ''}
            type="text"
            className={`editable url u${index+1}`}
            placeholder="UNDEFINED" />
        })}
      </div>
    );
  }
}

export default CompareBox;
