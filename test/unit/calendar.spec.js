import Calendar from '../../src/js/helpers/Calendar'
import CalendarMocks from '../mocks/calendar.mocks'

describe('Test Calendar class helper', function(){
  beforeEach(function(){
    this.calendar = new Calendar()
  })

  it('#getNextDay', function(){
    let date = new Date('2016/02/28');
    let date2 = new Date('2016/12/31');

    this.state = {
      day : date.getDate(),
      month : date.getMonth(),
      year : date.getFullYear()
    }

    this.state2 = {
      day : date2.getDate(),
      month : date2.getMonth(),
      year : date2.getFullYear()
    }

    let nextDay = this.calendar.getNextDay(this.state);
    let nextDay2 = this.calendar.getNextDay(this.state2);

    //Test with a leap year
    expect(nextDay.day).toEqual(29)
    expect(nextDay.month).toEqual(1)
    expect(nextDay.year).toEqual(2016)

    //Test with a non-leap year
    expect(nextDay2.day).toEqual(1)
    expect(nextDay2.month).toEqual(0)
    expect(nextDay2.year).toEqual(2017)

  });

  it('#getPrevDay', function(){
    let date = new Date('2016/03/02');
    let date2 = new Date('2016/01/01');

    this.state = {
      day : date.getDate(),
      month : date.getMonth(),
      year : date.getFullYear()
    }

    this.state2 = {
      day : date2.getDate(),
      month : date2.getMonth(),
      year : date2.getFullYear()
    }

    let prevDay = this.calendar.getPrevDay(this.state);
    let prevDay2 = this.calendar.getPrevDay(this.state2);

    //Test with a leap year
    expect(prevDay.day).toEqual(1)
    expect(prevDay.month).toEqual(2)
    expect(prevDay.year).toEqual(2016)

    //Test with a non-leap year
    expect(prevDay2.day).toEqual(31)
    expect(prevDay2.month).toEqual(11)
    expect(prevDay2.year).toEqual(2015)

  });

  it('#leapYear', function(){
    expect(this.calendar.leapYear(2016)).toBeTruthy()
    expect(this.calendar.leapYear(2017)).toBeFalsy()
  });

  it('#weekDay', function(){
    expect(this.calendar.weekDay(2016, 0, 1)).toEqual(5)
  })

  it('#getYear', function(){
    expect(this.calendar.getYear(2016)).toEqual(CalendarMocks.year)
  })

  it('#getMonth', function(){
    expect(this.calendar.getMonth(2016, 0) instanceof Object).toBeTruthy()
  })

  it('#getDay', function(){
    expect(this.calendar.getDay(2016, 0, 1) instanceof Object).toBeTruthy()
  })

  it('#renderMonth', function(){

    let renderedYear = this.calendar.getYear(2016).map(month =>
      this.calendar.renderMonth(this.calendar.getMonth(month.year, month.month))
      );

    expect(renderedYear instanceof Object).toBeTruthy()
    expect(renderedYear.length).toEqual(12)

    renderedYear.forEach(month => {
      expect(month.year).toBeDefined()
      expect(month.month).toBeDefined()
      expect(month.monthName).toBeDefined()
      expect(month.weeks).toBeDefined()
    })

  });


});
