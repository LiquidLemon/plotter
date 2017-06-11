import React, { Component } from 'react';
import Expression from './Expression';
import Plot from './Plot'
import SeriesInput from './SeriesInput';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fun: (x) => x,
      input: "x",
      series: []
    };

    this.plot = this.plot.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    return (
      <div>
        <SeriesInput onSubmit={this.handleSeriesSubmit} />
        <Plot resolution={5} width={500} height={500} lineWidth={3} series={this.state.series} />
        <button onClick={this.plot}>Plot</button>
      </div>
    );
  }

  handleSeriesSubmit = series => {
    this.setState({series: [series]});
  };

  componentDidMount() {
    this.plot();
  }

  handleChange(event) {
    this.setState({input: event.target.value});
  }

  plot() {
    this.state.series.forEach(s => {})
    const ex = new Expression(this.state.input);
    const fun = x => ex.eval({x});
    this.setState({fun});
  }
}


export default App;
