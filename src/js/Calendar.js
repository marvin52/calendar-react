import React from "react";
import CalendarHelper from "./helpers/Calendar"
import Holiday from "./helpers/Holiday"
import Month from "./components/Month"
import Day from "./components/Day"
import SelectCountry from "./components/SelectCountry"



export default class Calendar extends React.Component {
	constructor(){
		super();
		this.calendar = new CalendarHelper();
		this.holiday = new Holiday();
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

		this.getHolidays();
		this.countries = SelectCountry.countries
	}

	bool(str) {
	    if (typeof str === 'boolean') {
	      return str;
	    } else if (str === null || str === undefined) {
	      return false;
	    }

	    if (str.match(/(false)/)) {
	      return false;
	    } else if (str.match(/(true)/)[1]) {
	      return true;
	    }
	    return false
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



	increaseYear() {
		this.setState({ year : this.state.year + 1 }, this.getHolidays)
	}



	decreaseYear() {
		this.setState({ year : this.state.year - 1 }, this.getHolidays);
	}


	changeCountry(e) {
		this.setState({country : e.target.value }, this.getHolidays)
	}


	changeVisualization(e) {
		this.setState({visualization : e.target.value }, this.getHolidays)
	}


	changePublic(e) {
		this.setState({publicOnly : this.bool(e.target.value) }, this.getHolidays)
	}


	getHolidays() {
		this.holiday
			.getCountryHolidays({ countryCode : this.state.country,
								  year : this.state.year,
								  onlyPublic : this.state.publicOnly})
			.then(data => {
				let holidays = JSON.parse(data)
				this.setState({ holidays })
			})
	}


	render(){
		let layout, controls
		switch(this.state.visualization){
			case 'year':
				controls = (
					<div>
						<button onClick={this.decreaseYear.bind(this)} > { '< ' + (this.state.year - 1) } </button>
						<button onClick={this.increaseYear.bind(this)} > { (this.state.year + 1) + ' >' } </button>
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
					{controls}
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
				</div>
				<div className="calendar">
					{layout}
				</div>
			</div>
		)
	}
}