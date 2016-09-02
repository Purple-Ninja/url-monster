import React, { Component } from 'react';
import classnames from 'classnames';

class CompareBox extends Component {
  render() {
    const {
      field,
      isQuery = false,
      parsedUrls,
      diffing,
      updateField
    } = this.props;

    const boxClass = classnames('compt', {
      diff: diffing
    });

    return (
      <div className={boxClass}>
        <span className="fd">
          <span className="name">{field}</span>
          {isQuery ? <span className="meta">query</span> : null}
        </span>
        {parsedUrls.map((parsedUrl, index) => {
          if (!diffing && index === 1) {
            return null;
          }
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
