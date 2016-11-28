import Holiday from '../../src/js/helpers/Holiday'


describe('Test Holiday class helper', function(){


	describe('#getCountryHolidays', function(){

		beforeEach(function(){
			localStorage.clear();
			this.holiday = new Holiday('ffad917e-ddfe-4227-800e-74dcc0c3dd97');
      this.specObj = { countryCode: 'AR', year: 2019, onlyPublic: true }
		})

		afterEach(function(){
			localStorage.clear();
		})

		it('- Check if the method returns a promise', function(){
			expect(this.holiday.getCountryHolidays({}) instanceof Promise).toBe(true)
		});

		it('- Might execute success callback after resolving the promise', function(done){
			let successTest = (data) => {
        expect(data).toBeDefined();
        done();
      }

			this.holiday
				.getCountryHolidays(this.specObj)
				.then(successTest)
        .catch(function(e){
          done()
        })
		});

		it('- Should execute te error callback after resolving the promise', function(done){
			this.holiday.key = 'invalid key'

			let errorTest = (error) => {
				expect(error instanceof Error).toBeTruthy();
        done()
			}

			this.holiday
				.getCountryHolidays(this.specObj)
        .then()
				.catch(errorTest)
		})

		it('- Test getter and setter for api key config', function(){
			let apiKey = this.holiday.key

			expect(this.holiday.key).toBeDefined();
			expect(this.holiday.key).toEqual(apiKey)

			this.holiday.key = 'teste';

			expect(this.holiday.key).not.toEqual(apiKey)
			expect(this.holiday.key).toEqual('teste')
		})

		it('- Test if localStorage is receiving the json data', function(done){
      let { countryCode, year, onlyPublic } = this.specObj;

      let ajaxTest = (data) => {
        expect(JSON.parse(data) instanceof Object).toBeTruthy()
        expect(localStorage.getItem(`${countryCode}::${year}::${onlyPublic}`)).not.toEqual(null)
        expect(this.holiday.checkInLs(this.specObj)).toBeTruthy()
        expect(localStorage.getItem(`${countryCode}::2029::${onlyPublic}`)).toEqual(null)


        this.holiday
        .getCountryHolidays(this.specObj)
        .then(function(data){
          expect(JSON.parse(data) instanceof Object).toBeTruthy()
          done();
        })


      }

			this.holiday
				.getCountryHolidays(this.specObj)
				.then(ajaxTest)


		})

    it('- Test error handling of promise', function(done){
      this.holiday.key = 'invalid key'

      this.specObj = {
        countryCode: 'BR',
        year: 2019,
        onlyPublic: true
      }


      this.holiday
        .getCountryHolidays(this.specObj)
        .catch(function(error){
          expect(error instanceof Error).toBeTruthy()
          done();
        })


    })
	})


})
