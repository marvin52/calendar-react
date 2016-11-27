import React from "react";

export default class Sub extends React.Component {
	render(){
		return (
			<p className="calendar__holiday-sub">{this.props.hl.date.split('-')[2]} - {this.props.hl.name}</p>
		)
	}
}