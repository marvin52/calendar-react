import React from 'react';

export default class Sub extends React.Component {
  render() {
    if (!this.props.hl) {
      return null;
    }
    return (
      <p className="calendar__holiday-sub">{this.props.hl.date.split('-')[2]} - {this.props.hl.name}</p>
    );
  }
}


Sub.propTypes = {
  hl: React.PropTypes.shape({
    name: React.PropTypes.string,
    date: React.PropTypes.string,
  }),
};
