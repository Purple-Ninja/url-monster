import React, { PureComponent } from 'react';

class UrlBox extends PureComponent {
  render() {
    const {
      clearUrl,
      updateUrl,
      index,
      href
    } = this.props;

    return (
      <div className="urlui">
        <div className="box">
          <input value={href}
            type="text"
            className={`url u${index + 1}`}
            placeholder={`Input URL ${index + 1}`}
            onChange={updateUrl} />
        </div>
        <div className="actions" data-uid="1">
          <a className="cabs" href={href}>Go (current)</a>
          <a className="cabs" href={href} target="_blank">Go (new)</a>
          <a className="cabs" onClick={clearUrl}>Clear</a>
        </div>
      </div>
    );
  }
}

export default UrlBox;
