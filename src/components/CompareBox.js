import React, { Component } from 'react';

class CompareBox extends Component {
  render() {
    const {
      field,
      isQuery = false,
      parsedUrls,
      updateField
    } = this.props;

    return (
      <div id="url-query-asdf" className="compt diff">
        <span className="fd">
          <span className="name">{field}</span>
          {isQuery ? <span className="meta">query</span> : null}
        </span>
        {parsedUrls.map((parsedUrl, index) => {
          const inputProps = {
            key: index,
            type: 'text',
            className: `editable url u${index+1}`,
            placeholder: "UNDEFINED",
            value: (isQuery ? parsedUrls[index].query : parsedUrls[index])[field] || '',
            onChange: updateField(isQuery, index)
          };

          return <input {...inputProps} />;
        })}
      </div>
    );
  }
}

export default CompareBox;
