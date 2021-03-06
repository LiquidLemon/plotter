import React, { Component } from 'react';
import Plot from './Plot'
import SeriesInput from './SeriesInput';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [{exp: "x", key: 0}]
    };
    this.seriesKey = 0;
  }

  render() {
    const inputs = this.state.series.map((s, i) => {
      return <SeriesInput key={s.key} i={i}
        onUpdate={this.updateSeries}
        onRemove={this.removeSeries}
        onMove={this.moveSeries}
        first={i === 0} last={i === this.state.series.length -1}
        />
    });

    return (
      <div>
        <Plot resolution={5} width={500} height={500} lineWidth={3} series={this.state.series} />
        {inputs}
        <button onClick={this.addSeries}>+</button>
      </div>
    );
  }

  updateSeries = s => {
    const series = this.state.series.slice();
    series[s.i][s.name] = s.value;
    this.setState({series});
  };

  removeSeries = key => {
    let series = this.state.series.slice();
    series = series.filter((_, i) => i !== key);
    this.setState({series});
  }

  moveSeries = (i, dir) => {
    if (i === 0 && dir === -1 || i === this.state.series.length - 1 && dir === 1) return;
    const series = this.state.series.slice();
    const tmp = series[i];
    series[i] = series[i+dir];
    series[i+dir] = tmp;
    series[i].i += dir;
    series[i+dir].i -= dir;
    this.setState({series});
  };

  addSeries = () => {
    const series = this.state.series.slice();
    series.push({exp: "x", key: ++this.seriesKey});
    this.setState({series});
  };
}

export default App;
