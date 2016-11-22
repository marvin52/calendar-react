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
      { name : this.months[0], days : 31 },
      { name : this.months[1], days : this.leapYear(year) ? 29 : 28 },
      { name : this.months[2], days : 31 },
      { name : this.months[3], days : 30 },
      { name : this.months[4], days : 31 },
      { name : this.months[5], days : 30 },
      { name : this.months[6], days : 31 },
      { name : this.months[7], days : 31 },
      { name : this.months[8], days : 30 },
      { name : this.months[9], days : 31 },
      { name : this.months[10], days : 30 },
      { name : this.months[11], days : 31 }
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
        { year, month } = monthObj,
        monthArray = [];

    for(let day = 1; day <= monthObj.days; day++){
      let weekDay = this.weekDay(year, month, day);
      monthArray.push({day, weekDay, year, month})
    }

    switch(monthArray[0].weekDay){
      case 2:
        monthArray.unshift({day : null, weekDay : 1, year, month})
      break;
      case 3:
        monthArray.unshift({day : null, weekDay : 2, year, month})
        monthArray.unshift({day : null, weekDay : 1, year, month})
      break;
      case 4:
        monthArray.unshift({day : null, weekDay : 3, year, month})
        monthArray.unshift({day : null, weekDay : 2, year, month})
        monthArray.unshift({day : null, weekDay : 1, year, month})
      break;
      case 5:
        monthArray.unshift({day : null, weekDay : 4, year, month})
        monthArray.unshift({day : null, weekDay : 3, year, month})
        monthArray.unshift({day : null, weekDay : 2, year, month})
        monthArray.unshift({day : null, weekDay : 1, year, month})
      break;
      case 6:
        monthArray.unshift({day : null, weekDay : 5, year, month})
        monthArray.unshift({day : null, weekDay : 4, year, month})
        monthArray.unshift({day : null, weekDay : 3, year, month})
        monthArray.unshift({day : null, weekDay : 2, year, month})
        monthArray.unshift({day : null, weekDay : 1, year, month})
      break;
      case 0:
        monthArray.unshift({day : null, weekDay : 6, year, month})
        monthArray.unshift({day : null, weekDay : 5, year, month})
        monthArray.unshift({day : null, weekDay : 4, year, month})
        monthArray.unshift({day : null, weekDay : 3, year, month})
        monthArray.unshift({day : null, weekDay : 2, year, month})
        monthArray.unshift({day : null, weekDay : 1, year, month})
      break;
    }

    switch(monthArray[monthArray.length - 1].weekDay){
      case 1:
        monthArray.push({day : null, weekDay : 2, year, month})
        monthArray.push({day : null, weekDay : 3, year, month})
        monthArray.push({day : null, weekDay : 4, year, month})
        monthArray.push({day : null, weekDay : 5, year, month})
        monthArray.push({day : null, weekDay : 6, year, month})
        monthArray.push({day : null, weekDay : 0, year, month})
      break;
      case 2:
        monthArray.push({day : null, weekDay : 3, year, month})
        monthArray.push({day : null, weekDay : 4, year, month})
        monthArray.push({day : null, weekDay : 5, year, month})
        monthArray.push({day : null, weekDay : 6, year, month})
        monthArray.push({day : null, weekDay : 0, year, month})
      break;
      case 3:
        monthArray.push({day : null, weekDay : 4, year, month})
        monthArray.push({day : null, weekDay : 5, year, month})
        monthArray.push({day : null, weekDay : 6, year, month})
        monthArray.push({day : null, weekDay : 0, year, month})
      break;
      case 4:
        monthArray.push({day : null, weekDay : 5, year, month})
        monthArray.push({day : null, weekDay : 6, year, month})
        monthArray.push({day : null, weekDay : 0, year, month})
      break;
      case 5:
        monthArray.push({day : null, weekDay : 6, year, month})
        monthArray.push({day : null, weekDay : 0, year, month})
      break;
      case 6:
        monthArray.push({day : null, weekDay : 0, year, month})
      break;
    }

    return monthArray
  }

}