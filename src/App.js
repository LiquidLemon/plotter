import React, { Component } from 'react';
import Expression from './Expression';
import Plot from './Plot'
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

  componentDidMount() {
    this.plot();
  }

  handleChange(event) {
    this.setState({input: event.target.value});
  }

  plot() {
    const ex = new Expression(this.state.input);
    const fun = x => ex.eval({x});
    this.setState({fun});
  }
}


export default App;
