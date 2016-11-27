import React from "react";
import Day from "./Day"

export default class Week extends React.Component {
	render(){
		let week = this.props.week.map((day, index) => 
			<Day key={index} day={day} holidays={this.props.holidays} template="td"/>)
		return (
			<tr>
				{week}
			</tr>
		)
	}
}