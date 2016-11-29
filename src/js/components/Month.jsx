import React from 'react';
import CalendarHelper from './../helpers/Calendar';
import Week from './Week';
import Sub from './Sub';

export default class Month extends React.Component {
  constructor() {
    super();
    this.calendar = new CalendarHelper();
  }

  render() {
    const holidaysText = [];
    const month = this.calendar.getMonth(this.props.month.year, this.props.month.month);
    const renderMonth = this.calendar.renderMonth(month);

    const weeks = renderMonth.weeks.map((item, index) =>
      <Week
        key={index}
        week={item}
        holidays={this.props.holidays}
        public={this.props.public}
      />);

    if (this.props.holidays) {
      const h = Object.keys(this.props.holidays)
        .filter((hh) => {
          let m = (this.props.month.month + 1);
          m = m > 9 ? m : `0${m}`;
          return hh.indexOf(`${this.props.month.year}-${m}`) !== -1;
        })
        .map(hhh => this.props.holidays[hhh]);
      let count = 0;
      h.forEach((d) => {
        d.forEach((hl) => {
          if (hl.date) {
            holidaysText.push(<Sub hl={hl} key={count += 1} />);
          }
        });
      });
    }

    return (
      <table className="calendar__month">
        <thead>
          <tr className="calendar__month-name">
            <td colSpan={7}>
              {this.props.month.name} {this.props.month.year}
            </td>
          </tr>
          <tr className="calendar__week-days">
            <td>S</td>
            <td>T</td>
            <td>Q</td>
            <td>Q</td>
            <td>S</td>
            <td>S</td>
            <td>D</td>
          </tr>
        </thead>
        <tbody className="calendar__weeks">
          {weeks}
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
  }
}


Month.propTypes = {
  month: React.PropTypes.shape({
    year: React.PropTypes.number,
    month: React.PropTypes.number,
    name: React.PropTypes.string,
  }),
  holidays: React.PropTypes.shape({
    holidays: React.PropTypes.array,
  }),
  public: React.PropTypes.bool,
};
