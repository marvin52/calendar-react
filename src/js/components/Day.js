import React from "react"
import Sub from "./Sub"

export default class Day extends React.Component {
	render(){
		let holidaysText = [];
		let {day, year, month, monthObj} = this.props.day
		let dayDate = new Date(year, month, day).toISOString().split('T')[0]
		let hasHoliday = (day && this.props.holidays && this.props.holidays[dayDate])

		let dayTd = (
			<td className={(hasHoliday) ? 'calendar__day calendar__day--has-holiday' : 'calendar__day'}>
				{(day) ? day : ''}
			</td>
		)

		if(	this.props.holidays && this.props.template === "table" && hasHoliday)
			holidaysText = this.props.holidays[dayDate].map((hl, i) => <Sub hl={hl} key={i}/>);

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