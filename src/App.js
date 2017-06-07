import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fun: (x) => x,
      input: "x"
    };

    this.plot = this.plot.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.plot();
  }

  render() {
    return (
      <div>
        <label>f(x) = <input type="text" value={this.state.input} onChange={this.handleChange} /></label>
        <Plot resolution={5} width={500} height={500} lineWidth={3} fun={this.state.fun} />
        <button onClick={this.plot}>Plot</button>
      </div>
    );
  }

  handleChange(event) {
    this.setState({input: event.target.value});
  }

  plot() {
    const fun = this.state.input;
    const fn = eval(`(x) => (${fun})`);
    this.setState({fun: fn});
  }
}

class Plot extends Component {
  render () {
    return (
      <canvas height={this.props.height} width={this.props.width} ref="canvas" />
    );
  }

  componentDidMount() {
    this.update();
  }

  componentDidUpdate() {
    this.clear();
    this.update();
  }

  clear() {
    const ctx = this.refs.canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, this.props.width, this.props.height);
  }

  update() {
    this.context = this.refs.canvas.getContext("2d");
    this.drawGrid();
    this.drawF(this.props.fun);
  }

  drawF(fun) {
    const ratio = this.props.width/this.props.resolution;
    const middleX = this.props.width/2;
    const middleY = this.props.height/2;

    const ctx = this.context;
    ctx.strokeStyle = "green";
    const _lineWidth = ctx.lineWidth
    ctx.lineWidth = this.props.lineWidth;

    let oldx, oldy;
    for (let x = 0; x <= this.props.width; x++) {
      const realX = (x - middleX)/ratio;
      const realY = fun(realX);
      const y = this.props.height - ((realY * ratio) + middleY);

      if (x != 0) {
        ctx.beginPath();
        ctx.moveTo(oldx, oldy);
        ctx.lineTo(x, y);
        ctx.stroke();
      }

      oldx = x;
      oldy = y;
    }
    ctx.lineWidth = _lineWidth;
  }

  drawGrid() {
    const middleX = this.props.width/2;
    const middleY = this.props.height/2;
    const ctx = this.context;
    ctx.strokeStyle = "black";

    // Draw axes
    ctx.beginPath();
    ctx.moveTo(middleX, 0);
    ctx.lineTo(middleX, this.props.height);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, middleY);
    ctx.lineTo(this.props.width, middleY);
    ctx.stroke();

    const ratio = this.props.width/this.props.resolution;

    ctx.strokeStyle = "#888";
    for (let i = ratio; i < middleX; i += ratio) {
      ctx.beginPath();
      ctx.moveTo(middleX - i, 0);
      ctx.lineTo(middleX - i, this.props.height);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(middleX + i, 0);
      ctx.lineTo(middleX + i, this.props.height);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, middleY - i);
      ctx.lineTo(this.props.width, middleY - i);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, middleY + i);
      ctx.lineTo(this.props.width, middleY + i);
      ctx.stroke();
    }
  }
}

export default App;
