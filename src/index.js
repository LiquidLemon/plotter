import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Expression from './Expression';
import './index.css';

ReactDOM.render(<App />, document.getElementById('root'));

window.e = Expression;
