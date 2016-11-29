import React from 'react';
import CalendarHelper from './../helpers/Calendar';
import Helpers from './../helpers/Helpers';
import Holiday from './../helpers/Holiday';
import Month from './Month';
import Day from './Day';
import SelectCountry from './SelectCountry';


export default class Calendar extends React.Component {


  constructor() {
    super();
    this.calendar = new CalendarHelper();
    this.holiday = new Holiday('ffad917e-ddfe-4227-800e-74dcc0c3dd97');
    this.helpers = new Helpers();
    const date = new Date();

    this.state = {
      country: 'BR',
      day: date.getDate(),
      holidays: {},
      month: date.getMonth(),
      publicOnly: false,
      year: date.getFullYear(),
      visualization: 'year',
    };

    this.countries = SelectCountry.countries;

    this.getHolidays();
    this.bindEvents();
  }


  getHolidaysYear() {
    if (this.holiday.checkInLs({
      countryCode: this.state.country,
      year: this.state.year,
      onlyPublic: this.state.publicOnly })) {
      this.getHolidays();
    } else {
      this.helpers.emit('get::holidays');
    }
  }


  getHolidays() {
    this.holiday
      .getCountryHolidays({ countryCode: this.state.country,
        year: this.state.year,
        onlyPublic: this.state.publicOnly })
      .then((data) => {
        const holidays = JSON.parse(data);
        this.setState({ holidays });
      });
  }


  changePublic(e) {
    this.setState({ publicOnly: Helpers.bool(e.target.value) }, this.getHolidays);
  }


  changeCountry(e) {
    this.setState({ country: e.target.value }, this.getHolidays);
  }


  changeVisualization(e) {
    this.setState({ visualization: e.target.value }, this.getHolidays);
  }


  increaseYear() {
    this.setState({ year: this.state.year + 1 }, this.getHolidaysYear);
  }


  decreaseYear() {
    this.setState({ year: this.state.year - 1 }, this.getHolidaysYear);
  }


  increaseMonth() {
    const month = (this.state.month === 11) ? 0 : this.state.month + 1;
    const year = (this.state.month === 11) ? this.state.year + 1 : this.state.year;
    this.setState({ month, year, day: 1 }, this.getHolidays);
  }


  decreaseMonth() {
    const month = (this.state.month === 0) ? 11 : this.state.month - 1;
    const year = (this.state.month === 0) ? this.state.year - 1 : this.state.year;
    this.setState({ month, year, day: 1 }, this.getHolidays);
  }


  decreaseDay() {
    const day = this.calendar.getPrevDay(this.state);
    this.setState(day, this.getHolidays);
  }


  bindEvents() {
    this.helpers.on('get::holidays', Helpers.debounce(this.getHolidays.bind(this)), 250);
  }


  increaseDay() {
    const day = this.calendar.getNextDay(this.state);
    this.setState(day, this.getHolidays);
  }


  render() {
    let layout;
    let controls;
    const monthObj = this.calendar.getMonth(this.state.year, this.state.month);

    switch (this.state.visualization) {
      default:
      case 'year':
        controls = (
          <div>
            <button onClick={e => this.decreaseYear(e)} > Previous Year </button>
            <button onClick={e => this.increaseYear(e)} > Next Year </button>
          </div>
        );
        layout = this.calendar
                      .getYear(this.state.year)
                      .map((month, index) =>
                        <Month
                          key={index} month={month}
                          holidays={this.state.holidays.holidays}
                          public={this.state.publicOnly}
                        />);
        break;
      case 'month':
        controls = (
          <div>
            <button onClick={e => this.decreaseMonth(e)} > Previous Month </button>
            <button onClick={e => this.increaseMonth(e)} > Next Month </button>
          </div>
        );
        layout = (<Month
          month={monthObj}
          holidays={this.state.holidays.holidays}
          public={this.state.publicOnly}
        />);
        break;
      case 'day':
        controls = (
          <div>
            <button onClick={e => this.decreaseDay(e)} > Previous Day </button>
            <button onClick={e => this.increaseDay(e)} > Next Day </button>
          </div>
        );
        layout = (<Day
          day={this.calendar
                      .getDay(this.state.year, this.state.month, this.state.day)}
          holidays={this.state.holidays.holidays}
          template="table"
        />);
        break;
    }

    return (
      <div className="container">
        <div className="controls">
          <h1> Calendar Controls </h1>
          <SelectCountry
            callback={e => this.changeCountry(e)}
            countries={this.countries}
            country={this.state.country}
          />
          <select defaultValue={this.state.publicOnly} onChange={e => this.changePublic(e)}>
            <option value>Only public holidays</option>
            <option value={false}>All holidays</option>
          </select>
          <select
            defaultValue={this.state.visualization}
            onChange={e => this.changeVisualization(e)}
          >
            <option value="year">See year</option>
            <option value="month">See Month</option>
            <option value="day">See Days</option>
          </select>
          <div className="controls__layout-inputs">
            {controls}
          </div>
        </div>
        <div className="calendar">
          {layout}
        </div>
      </div>
    );
  }
}
