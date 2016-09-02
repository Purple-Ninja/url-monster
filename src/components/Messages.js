import React, { Component } from 'react';

class Messages extends Component {
  render() {
    const {
      isSame,
      currentFilter,
      updateFilter
    } = this.props;

    const filters = [
      {
        type: 'diff',
        wording: 'Show Differences'
      },
      {
        type: 'same',
        wording: 'Show Similarities'
      },
      {
        type: 'all',
        wording: 'Show All'
      }
    ]

    return (
      <div id="msgs">
        <div className="msg cmp">
          <h3>Comparison Mode</h3>
          <div>
            The two URLs are&nbsp;
            { isSame ?
              <span className="same">THE SAME</span> :
              <span className="diff">DIFFERENT</span>
            }&nbsp;.
          </div>
          <div className="act">
            {filters.map((filter, index) => {
              const { type, wording } = filter;
              return (
                <a className={`cab ${type === currentFilter ? 'ckd' : ''}`}
                  onClick={updateFilter.bind(this, type)}>{wording}</a>);
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Messages;
