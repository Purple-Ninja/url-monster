import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <footer id="footer">
        <span>
          <a href="https://github.com/Purple-Ninja/url-monster">URL Monster 1.0</a>
        </span>
        <span> &copy; </span>
        <span className="sep">
          <a href="http://gadget.chienwen.net/">Handy Gadgets</a>
        </span>
        <span className="sep">
          <a href="https://nodejs.org/api/url.html">Node.js</a>
        </span>
        <span className="sep">
          <a href="https://facebook.github.io/react/">React</a>
        </span>
      </footer>
    );
  }
}

export default Footer;
