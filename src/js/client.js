import React from "react";
import ReactDOM from "react-dom";
import Calendar from "./helpers/Calendar"
import Holiday from "./helpers/Holiday"
import Month from "./components/Month"
import SelectCountry from "./components/SelectCountry"



class Layout extends React.Component {
	constructor(){
		super();
		this.calendar = new Calendar();
		this.holiday = new Holiday();
		let date = new Date();

		this.state = {
			country : 'BR',
			day : date.getDate(),
			month : date.getMonth(),
			publicOnly : false,
			year : date.getFullYear(),
			holidays : {},
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
	  }


	increaseMonth() {
		let month = (this.state.month == 11)? 0 : this.state.month + 1;
		let year = (this.state.month == 11)? this.state.year + 1 : this.state.year;
		this.setState({ month, year }, this.getHolidays)
	}



	decreaseMonth() {
		let month = (this.state.month == 0)? 11 : this.state.month - 1;
		let year = (this.state.month == 0)? this.state.year - 1 : this.state.year;
		this.setState({ month, year }, this.getHolidays)
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
				let year = this.calendar.getYear(this.state.year);
				let months = []
				year.forEach(( month, index ) => {
					months.push( <Month key={index} month={month} holidays={this.state.holidays.holidays} public={this.state.publicOnly}/> )
				})
				layout = months;
				controls = (
					<div>
						<button onClick={this.decreaseYear.bind(this)} > { '< ' + (this.state.year - 1) } </button>
						<button onClick={this.increaseYear.bind(this)} > { (this.state.year + 1) + ' >' } </button>
					</div>
				)
			break;
			case 'month':
				let month = this.calendar.getMonth(this.state.year, this.state.month);
				layout = (<Month month={month} holidays={this.state.holidays.holidays} public={this.state.publicOnly}/>)
				controls = (
					<div>
						<button onClick={this.decreaseMonth.bind(this)} > Previous Month </button>
						<button onClick={this.increaseMonth.bind(this)} > Next Month </button>
					</div>
				)
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

const app = document.getElementById('app');

ReactDOM.render(<Layout/>, app);