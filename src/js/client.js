import React from "react";
import ReactDOM from "react-dom";
import Calendar from "./helpers/Calendar"
import Month from "./components/Month"

const calendar = new Calendar();


class Layout extends React.Component {
	constructor(){
		super();
		let date = new Date();
		this.state = {
			year : date.getFullYear(),
			month : date.getMonth(),
			day : date.getDate()
		}
	}

	increaseYear(){
		this.setState({ year : this.state.year + 1 })
	}

	decreaseYear(){
		this.setState({ year : this.state.year - 1 })
	}

	render(){

		let year = calendar.getYear(this.state.year);
		let months = []
		year.forEach(( month, index ) => {
			months.push( <Month key={index} month={month}/> )
		})

		return (
			<div className="container">
				<div className="controls">
					<button onClick={this.decreaseYear.bind(this)} > { this.state.year - 1 } </button>
					<button onClick={this.increaseYear.bind(this)} > { this.state.year + 1 } </button>
					<h1> { this.state.year + " Calendario" } </h1>
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