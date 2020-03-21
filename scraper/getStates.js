const axios = require('axios');
const cheerio = require('cheerio');
const moment = require('moment');
const config = require('../constants/constants');
const Helper=require('../Helper/stringManipulation')

const getCountries = async () => {
  let response;
  try {
    response = await axios.get(config.statesUrl);
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
  const statesTable = $("table#usa_table_countries_today");
  const stateTableCells = statesTable
  .children("tbody")
  .children("tr")
  .children("td");
  // NOTE: this will alter when table structure change in worldometers.info
  const totalColumns = 7;
  const stateColumn = 0;
  const casesColumn = 1;
  const todayCasesColumn = 2;
  const deathsColumn = 3;
  const todayDeathsColumn = 4;
  const curedColumn = 5;
  const activeColumn = 6;
  // minus totalColumns to skip last row, which is total
  for (let i = 0; i < stateTableCells.length - totalColumns; i += 1) {
    const cell = stateTableCells[i];

    // get state name
    if (i % totalColumns === stateColumn) {
      let state =
        cell.children[0].data ||
        cell.children[0].children[0].data ||
        // state name with link has another level
        cell.children[0].children[0].children[0].data ||
        cell.children[0].children[0].children[0].children[0].data ||
        "";
      state = state.trim();
      if (state.length === 0) {
        // parse with hyperlink
        state = cell.children[0].next.children[0].data || "";
      }
      result.push({ state: state.trim() || "" });
    }
    // get cases
    if (i % totalColumns === casesColumn) {
      let cases = cell.children.length !== 0 ? cell.children[0].data : "";
      result[result.length - 1].cases = Helper.cleanString(cases)
    }
    // get today reported cases
    if (i % totalColumns === todayCasesColumn) {
      let todayCases = cell.children.length !== 0 ? cell.children[0].data : "";
      result[result.length - 1].todayCases = Helper.cleanString(todayCases)
    }
    // get deaths
    if (i % totalColumns === deathsColumn) {
      let deaths = cell.children.length !== 0 ? cell.children[0].data : "";
      result[result.length - 1].deaths = Helper.cleanString(deaths)
    }
    // get today deaths
    if (i % totalColumns === todayDeathsColumn) {
      let todayDeaths = cell.children.length !== 0 ? cell.children[0].data : "";
      result[result.length - 1].todayDeaths = Helper.cleanString(todayDeaths)
    }
    // get recovered
    if (i % totalColumns === curedColumn) {
      let recovered = cell.children.length !== 0 ? cell.children[0].data : "";
      result[result.length - 1].recovered = Helper.cleanString(recovered)
    }
    // get active
    if (i % totalColumns === activeColumn) {
      let active = cell.children.length !== 0 ? cell.children[0].data : "";
      result[result.length - 1].active = Helper.cleanString(active)
    }
  }

  result.updated = moment().format('MMMM Do YYYY, h:mm:ss a');
  return result;

};

module.exports = getCountries;
