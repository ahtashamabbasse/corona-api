const scraper = require('../scraper/index');
const constants = require('../constants/constants');
const db = require('quick.db');
const scheduleAll = () => {
  const totalCases = scraper.getTotalCases();
  db.set(constants.totalCases, totalCases);

  const countries = scraper.getCountries();
  db.set(constants.countryTable, countries);

  const states = scraper.getStates();
  db.set(constants.stateTable, states);

};
scheduleAll();
setInterval(scheduleAll, constants.interval);
