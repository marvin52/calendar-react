import React from "react";
import ReactDOM from "react-dom";
import Calendar from "./../helpers/Calendar"
import Week from "./Week"
import Sub from "./Sub"

export default class Month extends React.Component {
	constructor(){
		super();
		this.calendar = new Calendar();
	}

	render(){
		let weeks = [];
		let holidaysText = [];
		let month = this.calendar.getMonth(this.props.month.year, this.props.month.month)
		let renderMonth = this.calendar.renderMonth(month)

		renderMonth.weeks.forEach((item, index) => {
			weeks.push(<Week key={index} week={item} holidays={this.props.holidays} public={this.props.public}/>)
		})
		if(this.props.holidays){
			let h = Object.keys(this.props.holidays)
				.filter( (h, v) => {
					let m = ( this.props.month.month + 1)
					m = m > 9 ? m : `0${m}`;
					return h.indexOf(`${this.props.month.year}-${m}`) !== -1
				})
				.map(h => this.props.holidays[h])
			let count = 0
			h.forEach(d => {
				d.forEach(hl => {
					if(hl.date){
						holidaysText.push(<Sub hl={hl} key={count++}/>)
					}
				})
			})
		}

		return (
			<table className="calendar__month">
				<thead>
					<tr className="calendar__month-name">
						<td colSpan={7}>
							{this.props.month.name} {this.props.month.year}
						</td>
					</tr>
					<tr className="calendar__week-days">
						<td>S</td>
						<td>T</td>
						<td>Q</td>
						<td>Q</td>
						<td>S</td>
						<td>S</td>
						<td>D</td>
					</tr>
				</thead>
				<tbody className="calendar__weeks">
					{weeks}
				</tbody>
				<tfoot>
					<tr>
						<td colSpan={7}>
							{holidaysText}
						</td>
					</tr>
				</tfoot>
			</table>
		)
	}
}