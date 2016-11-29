import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from './components/Calendar.jsx';

const app = document.getElementById('app');

require('./../css/styles.sass');

ReactDOM.render(<Calendar />, app);
