import React from "react";
import ReactDOM from "react-dom";
import Calendar from "./../helpers/Calendar"

export default class Week extends React.Component {
	constructor(){
		super();
	}

	render(){
		let week = this.props.week;
		return (
			<tr>
				<td>{ (week[0]) ? week[0].day : '' }</td>
				<td>{ (week[1]) ? week[1].day : '' }</td>
				<td>{ (week[2]) ? week[2].day : '' }</td>
				<td>{ (week[3]) ? week[3].day : '' }</td>
				<td>{ (week[4]) ? week[4].day : '' }</td>
				<td>{ (week[5]) ? week[5].day : '' }</td>
				<td>{ (week[6]) ? week[6].day : '' }</td>
			</tr>
		)
	}
}