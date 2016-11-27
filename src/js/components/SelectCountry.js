import React from "react";

export default class SelectCountry extends React.Component {
	static get countries(){
		return {
			"AR": "Argentina",
			"AO": "Angola",
			"AU": "Australia",
			"AW": "Aruba",
			"BE": "Belgium",
			"BG": "Bulgaria",
			"BR": "Brazil",
			"CA": "Canada",
			"CH": "Switzerland",
			"CN": "China",
			"CO": "Colombia",
			"CZ": "Czech Republic",
			"DE": "Germany",
			"DK": "Denmark",
			"ES": "Spain",
			"FR": "France",
			"GB": "United Kingdom",
			"GT": "Guatemala",
			"HR": "Croatia",
			"HU": "Hungary",
			"ID": "Indonesia",
			"IE": "Ireland",
			"IN": "India",
			"IT": "Italy",
			"LS": "Lesotho",
			"LU": "Luxembourg",
			"MG": "Madagascar",
			"MQ": "Martinique",
			"MX": "Mexico",
			"NL": "Netherlands",
			"NO": "Norway",
			"PL": "Poland",
			"PR": "Puerto Rico",
			"RU": "Russia",
			"SI": "Slovenia",
			"SK": "Slovakia",
			"UA": "Ukraine",
			"US": "United States"
		}
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