import React from "react";
import ReactDOM from "react-dom";
import Calendar from "./../helpers/Calendar"
import Week from "./Week"

export default class Month extends React.Component {
	constructor(){
		super();
		this.calendar = new Calendar();
	}

	render(){
		let weeks = [];
		let month = this.calendar.getMonth(this.props.month.year, this.props.month.month)
		let renderMonth = this.calendar.renderMonth(month)

		renderMonth.weeks.forEach((item, index) => {
			weeks.push(<Week key={index} week={item}/>)
		})

		return (
			<table className="month">
				<thead>
					<tr>
						<td colSpan={7}>
							{this.props.month.name}
						</td>
					</tr>
					<tr>
						<td>S</td>
						<td>T</td>
						<td>Q</td>
						<td>Q</td>
						<td>S</td>
						<td>S</td>
						<td>D</td>
					</tr>
				</thead>
				<tbody>
					{weeks}
				</tbody>
			</table>
		)
	}
}