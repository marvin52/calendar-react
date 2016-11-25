import React from "react";
import ReactDOM from "react-dom";
import Calendar from "./helpers/Calendar"
import Holiday from "./helpers/Holiday"
import Month from "./components/Month"
import SelectCountry from "./components/SelectCountry"

const calendar = new Calendar();


class Layout extends React.Component {
	constructor(){
		super();
		this.holiday = new Holiday();
		let date = new Date();

		this.state = {
			country : 'BR',
			day : date.getDate(),
			month : date.getMonth(),
			publicOnly : false,
			year : date.getFullYear(),
			holidays : {}
		}

		this.getHolidays();
		this.countries = {
			 "AR": "Argentina",
       "AO": "Angola",
       "AU": "Australia",
       "AW": "Aruba",
       "BE": "Belgium",
       "BG": "Bulgaria",
       "BR": "Brazil",
       "CA": "Canada",
       "CH": "Switzerland",
       "CN": "China",
       "CO": "Colombia",
       "CZ": "Czech Republic",
       "DE": "Germany",
       "DK": "Denmark",
       "ES": "Spain",
       "FR": "France",
       "GB": "United Kingdom",
       "GT": "Guatemala",
       "HR": "Croatia",
       "HU": "Hungary",
       "ID": "Indonesia",
       "IE": "Ireland",
       "IN": "India",
       "IT": "Italy",
       "LS": "Lesotho",
       "LU": "Luxembourg",
       "MG": "Madagascar",
       "MQ": "Martinique",
       "MX": "Mexico",
       "NL": "Netherlands",
       "NO": "Norway",
       "PL": "Poland",
       "PR": "Puerto Rico",
       "RU": "Russia",
       "SI": "Slovenia",
       "SK": "Slovakia",
       "UA": "Ukraine",
       "US": "United States"
		}
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


	getHolidays() {
		this.holiday
			.getCountryHolidays({ countryCode : this.state.country, year : this.state.year})
			.then(data => {
				let holidays = JSON.parse(data)
				this.setState({ holidays })
			})
	}


	render(){


		let year = calendar.getYear(this.state.year);
		let months = []
		year.forEach(( month, index ) => {
			months.push( <Month key={index} month={month} holidays={this.state.holidays}/> )
		})

		return (
			<div className="container">
				<div className="controls">
					<button onClick={this.decreaseYear.bind(this)} > { this.state.year - 1 } </button>
					<button onClick={this.increaseYear.bind(this)} > { this.state.year + 1 } </button>
					<SelectCountry callback={this.changeCountry.bind(this)} countries={this.countries} country={this.state.country}/>
					<h1> { this.state.year + " Calendário" } </h1>
				</div>
				<div className="calendar">
					{months}
				</div>
			</div>
		)
	}




}

const app = document.getElementById('app');

ReactDOM.render(<Layout/>, app);