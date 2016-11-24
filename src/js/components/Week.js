import React from "react";
import ReactDOM from "react-dom";
import Calendar from "./../helpers/Calendar"
import Day from "./Day"

export default class Week extends React.Component {
	constructor(){
		super();
	}

	render(){
		let week = this.props.week, days = []
		week.forEach((day, index) => {
			days.push(<Day key={index} day={day} holidays={this.props.holidays}/>)
		})
		return (
			<tr>
				{days}
			</tr>
		)
	}
}