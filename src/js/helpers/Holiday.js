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
	constructor(apiKey) {
		this.apiKey = apiKey;
		this.apiUrl = 'https://holidayapi.com/v1/holidays'
	}

	get key(){
		return this.apiKey
	}

	set key(newApiKey){
    this.apiKey = newApiKey
	}

  checkInLs({countryCode = 'BR', year = 2016, onlyPublic = false }){
    return localStorage.getItem(`${countryCode}::${year}::${onlyPublic}`) !== null
  }

	getCountryHolidays({countryCode = 'BR', year = 2016, onlyPublic = false }){
	  return new Promise((fulfill, reject) => {
	  	if(this.checkInLs({countryCode, year, onlyPublic})){
	  		fulfill(localStorage[`${countryCode}::${year}::${onlyPublic}`])
		  } else {
  		  const req = new XMLHttpRequest()
  		  req.open('GET', `${this.apiUrl}?key=${this.key}&year=${year}&country=${countryCode}&public=${onlyPublic}`)

  	    req.onload = () => {
          localStorage[`${countryCode}::${year}::${onlyPublic}`] = req.response
          fulfill(req.response, false)
  	    }
        req.onerror = () => {
          reject(Error(req.statusText))
        }

  		  req.send()
      }

	  })
	}

}
