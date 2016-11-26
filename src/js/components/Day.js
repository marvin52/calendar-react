import React from "react";
import ReactDOM from "react-dom";
import Calendar from "./../helpers/Calendar"
import Sub from "./Sub"

export default class Day extends React.Component {
	constructor(){
		super();
		this.calendar = new Calendar();
	}

	render(){
		let holidaysText = [];
		let {day, year, month, monthObj} = this.props.day
		let h = this.props.holidays
		let dayDate = new Date(year, month, day).toISOString().split('T')[0]
		let hasHoliday = (day !== null && h && typeof h[dayDate] !== 'undefined')

		let dayTd = (
			<td className={(hasHoliday) ? 'calendar__day calendar__day--has-holiday' : 'calendar__day'}>
				{(day) ? day : ''}
			</td>
		)

		if(this.props.holidays){
			let h = Object.keys(this.props.holidays)
				.filter( h => h.indexOf(dayDate) !== -1)
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

		switch(this.props.template){
			case "td":
			return dayTd
			break;
			case "table":
				return (
					<table className="calendar__day-view">
						<thead className="calendar__year-month-name">
							<tr>
								<td>
									{monthObj.name} 
									<br/> 
									<span className="calendar__year-name">{monthObj.year}</span>
								</td>
							</tr>
						</thead>
						<tbody class="calendar__day">
							<tr>
								{dayTd}
							</tr>
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
			break;
		}
	}
}