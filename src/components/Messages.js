import React, { PureComponent } from 'react';

class Messages extends PureComponent {
  render() {
    const {
      isSame,
      currentFilter,
      updateFilter
    } = this.props;

    const filters = [
      {
        type: 'diff',
        wording: 'Differences'
      },
      {
        type: 'same',
        wording: 'Similarities'
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
              const { type, wording, button } = filter;
              return (
                <a key={index}
                  className={`cab btn btn-small ${type === currentFilter ? 'ckd' : ''}`}
                  onClick={updateFilter.bind(this, type)}>{wording}</a>);
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Messages;
