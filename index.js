import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import './style.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';


class App extends Component {
  constructor() {
    super();
    this.state = {
      selected: new Date(),
      minTime: this.calculateMinTime(new Date())
    };
  }
  calculateMinTime = date => {
    let isToday = moment(date).isSame(moment(), 'day');
    if (isToday) {
        let nowAddOneHour = moment(new Date()).add({hours: 1}).toDate();
        return nowAddOneHour;
    }
    return moment().startOf('day').toDate(); 
}

  handle = (date) => {
    this.setState({
      selectedDate: date,
      minTime: this.calculateMinTime(date)
    })
  }

  render() {
    return (
      <div>
         <DatePicker
            selected={this.state.selected}
            onChange={this.handle}
            
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="MMMM d, yyyy h:mm aa"
            timeCaption="time"
            minDate={new Date()}
            minTime={this.state.minTime}
            maxTime={moment().endOf('day').toDate()}
          />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));