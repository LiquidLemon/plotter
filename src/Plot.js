import React, { Component } from 'react';
import Expression from './Expression';

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
    this.props.series.slice().reverse().forEach(s => {
      const exp = new Expression(s.exp);
      this.drawF(x => exp.eval({x}), s.color);
    });
  }

  drawF(fun, color) {
    const ratio = this.props.width/this.props.resolution;
    const middleX = this.props.width/2;
    const middleY = this.props.height/2;

    const ctx = this.context;
    ctx.strokeStyle = color;
    const _lineWidth = ctx.lineWidth
    ctx.lineWidth = this.props.lineWidth;

    ctx.beginPath();
    for (let x = 0; x <= this.props.width; x++) {
      const realX = (x - middleX)/ratio;
      const realY = fun(realX);
      const y = this.props.height - ((realY * ratio) + middleY);

      if (x === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();
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

export default Plot;
