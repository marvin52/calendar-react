import React from 'react';
import Sub from './Sub';

export default class Day extends React.Component {
  render() {
    let holidaysText = [];
    const { day, year, month, monthObj } = this.props.day;
    let layout;
    const dayDate = new Date(year, month, day).toISOString().split('T')[0];
    const hasHoliday = (day && this.props.holidays && this.props.holidays[dayDate]);

    const dayTd = (
      <td className={(hasHoliday) ? 'calendar__day calendar__day--has-holiday' : 'calendar__day'}>
        {day}
      </td>
    );

    if (this.props.holidays && this.props.template === 'table' && hasHoliday) {
      holidaysText = this.props.holidays[dayDate].map((hl, i) => <Sub hl={hl} key={i} />);
    }

    switch (this.props.template) {
      default:
      case 'td':
        layout = dayTd;
        break;
      case 'table':
        layout = (
          <table className="calendar__day-view">
            <thead className="calendar__year-month-name">
              <tr>
                <td>
                  {monthObj.name}
                  <br />
                  <span className="calendar__year-name">{monthObj.year}</span>
                </td>
              </tr>
            </thead>
            <tbody className="calendar__day">
              <tr>
                {dayTd}
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={7}>
                  {holidaysText}
                </td>
              </tr>
            </tfoot>
          </table>
        );
        break;
    }
    return layout;
  }
}

Day.propTypes = {
  day: React.PropTypes.shape({
    day: React.PropTypes.number,
    year: React.PropTypes.number,
    month: React.PropTypes.number,
    monthObj: React.PropTypes.object,
  }),
  holidays: React.PropTypes.shape({
    holidays: React.PropTypes.array,
  }),
  template: React.PropTypes.string,
};
