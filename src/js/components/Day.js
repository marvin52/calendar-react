import React from "react";
import ReactDOM from "react-dom";
import Calendar from "./../helpers/Calendar"

export default class Day extends React.Component {
	constructor(){
		super();
	}

	render(){
		let {day, year, month} = this.props.day
		let h = this.props.holidays
		let dayDate = new Date(year, month, day).toISOString().split('T')[0]
		let hasHoliday = (day !== null && h && h.holidays && typeof h.holidays[dayDate] !== 'undefined')
		return (
			<td className={(hasHoliday) ? 'calendar__day calendar__day--has-holiday' : 'calendar__day'}>
				{(day) ? day : '-'}
			</td>
		)
	}
}