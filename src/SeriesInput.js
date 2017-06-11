import React, { Component } from 'react';

function randomColor() {
  return '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
}

class SeriesInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exp: props.exp || "x",
      color: randomColor()
    };
    console.log(this.state.color);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
      <label>
      f(x) =&nbsp;
      <input type="text" name="exp" value={this.state.exp} onChange={this.handleChange} />
      </label>
      <input type="color" name="color" value={this.state.color} onChange={this.handleChange} />
      <input type="submit" value="Draw" />
      </form>
    );
  }

  handleChange = e => {
    const state = {[e.target.name]: e.target.value};
    this.setState(state);
    if (e.target.name === "color") this.sendMessage();
  };

  sendMessage() {
    this.props.onSubmit({
      exp: this.state.exp,
      color: this.state.color
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.sendMessage();
  };

  componentDidMount() {
    this.sendMessage();
  }

}

export default SeriesInput;
