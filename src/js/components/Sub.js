import React from "react";
import ReactDOM from "react-dom";
import Calendar from "./../helpers/Calendar"

export default class Sub extends React.Component {
	constructor(){
		super();
	}

	render(){
		return (
			<p className="holiday-sub">{this.props.hl.date.split('-')[2]} - {this.props.hl.name}</p>
		)
	}
}