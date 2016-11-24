/**
 * - Test API Key:
 * ffad917e-ddfe-4227-800e-74dcc0c3dd97
 * Test keys are unmetered and return dummy holiday day.
 *
 * - Live API Key:
 * cd6aa3ce-1d7d-40f5-9c8f-fe2f359a9975
 * Limited to 1,000 calls per month, historical data only.
 */

export default class Holiday {
	constructor() {
		this.apiKey = 'ffad917e-ddfe-4227-800e-74dcc0c3dd97'
		this.apiUrl = 'https://holidayapi.com/v1/holidays'
	}

	getCountryHolidays({countryCode = 'BR', year = 2016, onlyPublic = false }) {
	  return new Promise((fulfill, reject) => {
	    const req = new XMLHttpRequest()
	    req.open('GET', `${this.apiUrl}?key=${this.apiKey}&year=${year}&country=${countryCode}&public=${onlyPublic}`)

	    req.onload = function () {
	      if (req.status == 200) {
	        fulfill(req.response)
	      } else {
	        reject(Error(req.statusText))
	      }
	    }

	    req.send()
	  })
	}

}