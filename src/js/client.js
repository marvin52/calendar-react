import React from "react";
import ReactDOM from "react-dom";
import Calendar from "./helpers/Calendar"
import Month from "./components/Month"

class Layout extends React.Component {
	render(){
		let months = []
		this.props.year.forEach(( month, index ) => {
			months.push( <Month key={index} month={month}/> )
		})
		return (
			<div className="calendar">
				{months}
			</div>
		)
	}
}

const app = document.getElementById('app');
const calendar = new Calendar();

let year = calendar.getYear(2036);

ReactDOM.render(<Layout year={year}/>, app);