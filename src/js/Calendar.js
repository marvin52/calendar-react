import React from "react";
import CalendarHelper from "./helpers/Calendar"
import Helpers from "./helpers/Helpers"
import Holiday from "./helpers/Holiday"
import Month from "./components/Month"
import Day from "./components/Day"
import SelectCountry from "./components/SelectCountry"



export default class Calendar extends React.Component {
	constructor(){
		super();
		this.calendar = new CalendarHelper();
    this.holiday = new Holiday('ffad917e-ddfe-4227-800e-74dcc0c3dd97');
		this.helpers = new Helpers();
		let date = new Date();

		this.state = {
			country : 'BR',
			day : date.getDate(),
			holidays : {},
			month : date.getMonth(),
			publicOnly : false,
			year : date.getFullYear(),
			visualization: 'year'
		}

    this.countries = SelectCountry.countries

    this.bindEvents()
		this.getHolidays();
	}

  bindEvents(){
    this.helpers.on('get::holidays', Helpers.debounce(this.getHolidays.bind(this)), 250)
  }

	increaseDay(){
		let day = this.calendar.getNextDay(this.state)
		this.setState(day, this.getHolidays)
	}

	decreaseDay(){
		let day = this.calendar.getPrevDay(this.state)
		this.setState(day, this.getHolidays)
	}

	increaseMonth() {
		let month = (this.state.month == 11)? 0 : this.state.month + 1;
		let year = (this.state.month == 11)? this.state.year + 1 : this.state.year;
		this.setState({ month, year, day : 1 }, this.getHolidays)
	}

	decreaseMonth() {
		let month = (this.state.month == 0)? 11 : this.state.month - 1;
		let year = (this.state.month == 0)? this.state.year - 1 : this.state.year;
		this.setState({ month, year, day : 1 }, this.getHolidays)
	}


  getHolidaysYear(){
      if(this.holiday.checkInLs({
        countryCode : this.state.country,
        year : this.state.year,
        onlyPublic : this.state.publicOnly }))
      {
        this.getHolidays()
      }else{
        this.helpers.emit('get::holidays')
      }
  }

	increaseYear() {
		this.setState({ year : this.state.year + 1 }, this.getHolidaysYear)
	}



	decreaseYear() {
		this.setState({ year : this.state.year - 1 }, this.getHolidaysYear)
	}


	changeCountry(e) {
		this.setState({country : e.target.value }, this.getHolidays)
	}


	changeVisualization(e) {
		this.setState({visualization : e.target.value }, this.getHolidays)
	}


	changePublic(e) {
		this.setState({publicOnly : Helper.bool(e.target.value) }, this.getHolidays)
	}


	getHolidays() {
    this.holiday
      .getCountryHolidays({ countryCode : this.state.country,
                  year : this.state.year,
                  onlyPublic : this.state.publicOnly})
      .then(data => {
        let holidays = JSON.parse(data)
        this.setState({ holidays })
      });
  }

  render(){
		let layout, controls
		switch(this.state.visualization){
			case 'year':
				controls = (
					<div>
						<button onClick={this.decreaseYear.bind(this)} > Previous Year </button>
						<button onClick={this.increaseYear.bind(this)} > Next Year </button>
					</div>
				)
				layout = this.calendar.getYear(this.state.year).map(( month, index ) => <Month key={index} month={month} holidays={this.state.holidays.holidays} public={this.state.publicOnly}/>)
			break;
			case 'month':
				controls = (
					<div>
						<button onClick={this.decreaseMonth.bind(this)} > Previous Month </button>
						<button onClick={this.increaseMonth.bind(this)} > Next Month </button>
					</div>
				)
				let month = this.calendar.getMonth(this.state.year, this.state.month);
				layout = (<Month month={month} holidays={this.state.holidays.holidays} public={this.state.publicOnly}/>)
			break;
			case 'day':
				controls = (
					<div>
						<button onClick={this.decreaseDay.bind(this)} > Previous Day </button>
						<button onClick={this.increaseDay.bind(this)} > Next Day </button>
					</div>
				)
				layout = <Day day={this.calendar.getDay(this.state.year, this.state.month, this.state.day)} holidays={this.state.holidays.holidays} template="table"/>
			break;
		}

		return (
			<div className="container">
				<div className="controls">
					<h1> Calendar Controls </h1>
					<SelectCountry callback={this.changeCountry.bind(this)} countries={this.countries} country={this.state.country}/>
					<select defaultValue={this.state.publicOnly} onChange={this.changePublic.bind(this)}>
						<option value={true}>Only public holidays</option>
						<option value={false}>All holidays</option>
					</select>
					<select defaultValue={this.state.visualization} onChange={this.changeVisualization.bind(this)}>
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
		)
	}
}
