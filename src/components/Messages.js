import React, { Component } from 'react';

class Messages extends Component {
  render() {
    return (
      <div id="msgs">
        <div className="msg cmp">
          <h3>Comparison Mode</h3>
          <div>
            The two URLs are 
            <span className="same hidden">THE SAME</span>
            <span className="diff">DIFFERENT</span>
            .
          </div>
          <div className="act">
            <a id="show-d" className="cab ckd">Show Differences</a>
            <a id="show-s" className="cab">Show Similarities</a>
            <a id="show-a" className="cab">Show All</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Messages;
