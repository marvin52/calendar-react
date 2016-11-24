export default class Calendar {

  constructor(){
    this.months = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outrubro",
      "Novembro",
      "Dezembro"
    ];
  }

  leapYear(year) {
    return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)
  }

  weekDay(year, month, day) {
    return new Date(year, month, day).getDay()
  }

  getYear(year) {
    return [
      { year, name : this.months[0], month: 0 , days : 31 },
      { year, name : this.months[1], month: 1 , days : this.leapYear(year) ? 29 : 28 },
      { year, name : this.months[2], month: 2 , days : 31 },
      { year, name : this.months[3], month: 3 , days : 30 },
      { year, name : this.months[4], month: 4 , days : 31 },
      { year, name : this.months[5], month: 5 , days : 30 },
      { year, name : this.months[6], month: 6 , days : 31 },
      { year, name : this.months[7], month: 7 , days : 31 },
      { year, name : this.months[8], month: 8 , days : 30 },
      { year, name : this.months[9], month: 9 , days : 31 },
      { year, name : this.months[10], month: 10 , days : 30 },
      { year, name : this.months[11], month: 11 , days : 31 }
    ]
  }

  getMonth(year, month){
    let monthDays = [31, this.leapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    return {
      name : this.months[month],
      month : month,
      year : year,
      days : monthDays[month]
    }
  }


  renderMonth(monthObject) {

    let monthObj = monthObject || {},
        { year, month, name : monthName } = monthObj,
        monthArray = [];

    for(let day = 1; day <= monthObj.days; day++){
      let weekDay = this.weekDay(year, month, day);
      monthArray.push({day, weekDay, year, month})
    }

    /**
     * add null days to fill the begin of the week
     * @param  {Number} weekDay - Object Date representation of the week day
     * @return {Boolean}
     */
    let mus = weekDay => {
      while(weekDay-- >= 1)
        monthArray.unshift(
          {day : null, weekDay, year, month}
        )
    }

    /**
     * add null days to fill the end of the week
     * @param  {Number} val - Object Date representation of the week day
     * @return {Boolean}
     */
    const mps = val => {
      let value = (val === 0)? 7 : val
      while(value++ <= 7){
        let weekDay = ( value == 7 ) ? 0 : value
        monthArray.push({ day : null, weekDay, year, month })
      }
    }

    switch(monthArray[0].weekDay){
      case 2: mus(1); break;
      case 3: mus(2); break;
      case 4: mus(3); break;
      case 5: mus(4); break;
      case 6: mus(5); break;
      case 0: mus(6); break;
    }

    switch(monthArray[monthArray.length - 1].weekDay){
      case 1: mps(2); break;
      case 2: mps(3); break;
      case 3: mps(4); break;
      case 4: mps(5); break;
      case 5: mps(6); break;
      case 6: mps(0); break;
    }

    var weeks = [];

    while (monthArray.length > 0)
        weeks.push(monthArray.splice(0, 7));

    return {
      year,
      month,
      monthName,
      weeks
    }
  }

}

/**
 {
    "name": "Independence Day",
    "date": "2015-07-04"
    "observed": "2015-07-03"
    "public": true,
  }
 */