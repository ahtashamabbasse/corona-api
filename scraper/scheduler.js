const scraper = require('../scraper/index');
const constants = require('../constants/constants');
const db = require('quick.db');

const scheduleAll = async () => {
  console.log('Data scrapping ');
  const totalCases = await scraper.getTotalCases();
  console.log(totalCases);
  db.set(constants.totalCases, totalCases);

  const countries = await scraper.getCountries();
  db.set(constants.countryTable, countries);

  const states = await scraper.getStates();
  db.set(constants.stateTable, states);

};
scheduleAll().then(() => {
  console.log('data loaded');
});
setInterval(scheduleAll, 600000);
