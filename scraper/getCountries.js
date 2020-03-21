const axios = require('axios');
const cheerio = require('cheerio');
const moment = require('moment');
const config = require('../constants/constants');
const Helper=require('../Helper/stringManipulation')

const getCountries = async () => {
  let response;
  try {
    response = await axios.get(config.countryUrl);
    if (response.status !== 200) {
      console.error('ERROR : Website is down ');
    }
  } catch (e) {
    console.log('ERROR ', e);
    return null;
  }
  // to store parsed data after scraping
  const result = [];
  // get HTML from response and parse death rates
  const $ = cheerio.load(response.data);
  const countriesTable = $('table#main_table_countries_today');
  const countriesTableCells = countriesTable.children('tbody').
    children('tr').
    children('td');

  const totalColumns = 9;
  const countryColumn = 0;
  const casesColumn = 1;
  const todayCasesColumn = 2;
  const deathsColumn = 3;
  const todayDeathsColumn = 4;
  const curedColumn = 5;
  const activeColumn = 6;
  const criticalColumn = 7;
  const casesPerOneMillionColumn = 8;
  for (let i = 0; i < countriesTableCells.length - totalColumns; i++) {
    const cell = countriesTableCells[i];
    let obj = {};
    // get country name
    if (i % totalColumns === countryColumn) {
      let country =
        cell.children[0].data ||
        cell.children[0].children[0].data || '';
      country = country.trim();
      result.push({ country: country.trim() || '' });
    }

    // get cases
    if (i % totalColumns === casesColumn) {
      let cases = cell.children.length !== 0 ? cell.children[0].data : '';
      result[result.length - 1].cases = Helper.cleanString(cases)
    }

    // get today cases
    if (i % totalColumns === todayCasesColumn) {
      let todayCases = cell.children.length !== 0 ? cell.children[0].data : '';
      result[result.length - 1].todayCases = Helper.cleanString(todayCases)
    }
    // get deaths
    if (i % totalColumns === deathsColumn) {
      let deaths = cell.children.length !== 0 ? cell.children[0].data : '';
      result[result.length - 1].deaths = Helper.cleanString(deaths)
    }

    // get today deaths
    if (i % totalColumns === todayDeathsColumn) {
      let todayDeaths = cell.children.length !== 0 ? cell.children[0].data : '';
      result[result.length - 1].todayDeaths = Helper.cleanString(todayDeaths)
    }
    // get recovered
    if (i % totalColumns === curedColumn) {
      let recovered = cell.children.length !== 0 ? cell.children[0].data : '';
      result[result.length - 1].recovered = Helper.cleanString(recovered)
    }
    // get active cases
    if (i % totalColumns === activeColumn) {
      let active = cell.children.length !== 0 ? cell.children[0].data : '';
      result[result.length - 1].active = Helper.cleanString(active);
    }
    // get critical
    if (i % totalColumns === criticalColumn) {
      let critical = cell.children.length !== 0 ? cell.children[0].data : '';
      result[result.length - 1].critical = Helper.cleanString(critical)
    }
    // get total cases per one million population
    if (i % totalColumns === casesPerOneMillionColumn) {

      let casesPerOneMillion = cell.children.length !== 0
        ? cell.children[0].data
        : '';
      result[result.length - 1].casesPerOneMillion = Helper.cleanString(casesPerOneMillion)
    }

  }

  result.updated = moment().format('MMMM Do YYYY, h:mm:ss a');
  return result;

};

module.exports = getCountries;
