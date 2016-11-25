import React from "react";
import ReactDOM from "react-dom";
import Calendar from "./../helpers/Calendar"

export default class SelectCountry extends React.Component {
	constructor(){
		super();
	}

	render(){
		let countries = []
		Object.keys(this.props.countries).forEach( (key, index) => {
			countries.push(<option value={key} key={index}>{ this.props.countries[key]}</option>)
		})
		return (
			<select defaultValue={this.props.country} onChange={this.props.callback}>
				{countries}
			</select>
		)
	}
}