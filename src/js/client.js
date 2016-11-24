import React from "react";
import ReactDOM from "react-dom";
import Calendar from "./helpers/Calendar"
import Holiday from "./helpers/Holiday"
import Month from "./components/Month"

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

		this.getHolidays()
	}



	increaseYear() {
		this.setState({ year : this.state.year + 1 });
	}



	decreaseYear() {
		this.setState({ year : this.state.year - 1 });
	}


	changeCountry(e) {
		this.setState({country : e.target.value })
		this.getHolidays()
	}


	getHolidays() {
		this.holiday
			.getCountryHolidays({ country : this.state.country})
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
					<select onChange={this.changeCountry.bind(this)}>
						<option value="BR">Brasil</option>
						<option value="AR">Argentina</option>
					</select>
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