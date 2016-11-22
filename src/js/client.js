import React from "react";
import ReactDOM from "react-dom";
import Calendar from "./helpers/Calendar"

class Layout extends React.Component {
	render(){
		return (
			<h1>React test!</h1>
		)
	}
}

const app = document.getElementById('app');

ReactDOM.render(<Layout/>, app);


const calendar = new Calendar();

let month = calendar.getMonth(2016, 1);

console.log(calendar.renderMonth(month))