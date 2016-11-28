import Holiday from '../../src/js/helpers/Holiday'


describe('Test Holiday class helper', function(){


	describe('#getCountryHolidays', function(){

		beforeEach(function(){
			localStorage.clear();
			this.holiday = new Holiday();
		})

		afterEach(function(){
			localStorage.clear();
		})

		it('- Check if the method returns a promise', function(){
			expect(this.holiday.getCountryHolidays({}) instanceof Promise).toBe(true)
		});

		it('- Might execute success callback after resolving the promise', function(){
			let successTest = (data) => { expect(data).toBeDefined() }

			this.holiday
				.getCountryHolidays({})
				.then(successTest)
		});

		it('- Should execute te error callback after resolving the promise', function(){
			this.holiday.key = 'teste'

			let errorTest = (error) => {
				expect(error).toThrow();
			}

			this.holiday
				.getCountryHolidays({})
				.then(errorTest)
		})

		it('- Test getter and setter for api key config', function(){
			let apiKey = this.holiday.key

			expect(this.holiday.key).toBeDefined();
			expect(this.holiday.key).toEqual(apiKey)

			this.holiday.key = 'teste';

			expect(this.holiday.key).not.toEqual(apiKey)
			expect(this.holiday.key).toEqual('teste')
		})

		it('- Test if localStorage is receiving the json data', function(){
			let { countryCode, year, onlyPublic } = this.specObj = { countryCode: 'AR', year: 2019, onlyPublic: true } 
			let ajaxTest = (data, fromCache) => { 
				expect(localStorage.getItem(`${countryCode}::${year}::${onlyPublic}`)).not.toEqual(null)
				expect(localStorage.getItem(`${countryCode}::2029::${onlyPublic}`)).toEqual(null)
				expect(fromCache).toBe(false)
			}
			let lsTest = (data, fromCache) => { expect(fromCache).toBe(true) }

			this.holiday
				.getCountryHolidays(this.specObj)
				.then(ajaxTest)


			this.holiday
				.getCountryHolidays(this.specObj)
				.then(lsTest)
		})
	})


})