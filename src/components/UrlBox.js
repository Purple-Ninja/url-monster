import React, { PureComponent } from 'react';

class UrlBox extends PureComponent {

  // handlers
  updateUrl(index, e) {
    e.preventDefault();
    this.props.updateUrl(index, e.target.value);
  }

  clearUrl(index, e) {
    e.preventDefault();
    this.props.updateUrl(index, '');
  }

  openUrl(e) {
    if (e.keyCode === 13 && e.metaKey) {
      // mac: command + enter
      this.props.openUrl(this.props.index);
    }
  }

  render() {
    const {
      index,
      url
    } = this.props;

    return (
      <div className="urlui">
        <div className="box">
          <input value={url}
            type="text"
            className={`url u${index + 1}`}
            placeholder={`Input URL ${index + 1}`}
            onChange={this.updateUrl.bind(this, index)}
            onKeyDown={this.openUrl.bind(this)} />
        </div>
        <div className="actions" data-uid="1">
          <div className="btn-wrap">
            <a className="cabs" href={url}>Go (current)</a>
          </div>
          <div className="btn-wrap">
            <a className="cabs" href={url} target="_blank">Go (new)</a>
          </div>
          <div className="btn-wrap">
            <a className="cabs" href="#" onClick={this.clearUrl.bind(this, index)}>Clear</a>
          </div>
        </div>
      </div>
    );
  }
}

export default UrlBox;
