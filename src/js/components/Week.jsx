import React from 'react';
import Day from './Day';

export default class Week extends React.Component {
  render() {
    if (!this.props.week) {
      return null;
    }
    const week = this.props.week.map((day, index) =>
      <Day key={index} day={day} holidays={this.props.holidays} template="td" />);
    return (
      <tr>
        {week}
      </tr>
    );
  }
}


Week.propTypes = {
  week: React.PropTypes.array,
  holidays: React.PropTypes.shape({
    holidays: React.PropTypes.array,
  }),
};
