import React, { Component } from 'react';

function randomColor() {
  return '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
}

class SeriesInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      color: randomColor(),
      exp: "x"
    };
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
      <label>
      f(x) =&nbsp;
      <input type="text" name="exp" value={this.state.exp}
        onChange={this.handleChange} onBlur={this.handleSubmit} />
      </label>
      <input type="color" name="color" value={this.state.color} onChange={this.handleChange} />
      <input type="submit" value="Draw" />
      <button onClick={() => this.props.onRemove(this.props.i)}>-</button>
      </form>
    );
  }

  componentWillMount() {
    this.update('color', this.state.color);
  }

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value});
    if (e.target.name === 'color') {
      this.update(e.target.name, e.target.value);
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    this.update('exp', this.state.exp);
  };

  update(name, value) {
    this.props.onUpdate({name, value, i: this.props.i});
  }
}

export default SeriesInput;
