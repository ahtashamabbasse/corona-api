const axios = require('axios');
const cheerio = require('cheerio');
const moment = require('moment');
const config = require('../constants/constants');

const getTotalCases = async () => {
  let response;
  try {
    response = await axios.get(config.countryUrl);
    if (response.status !== 200) {
      console.error('ERROR : Website is down ');
    }
  } catch (e) {
    console.log('ERROR ',e);
    return null;
  }
  const result = {};

  const html = cheerio.load(response.data);
  html('.maincounter-number').filter((index, element) => {
    let cases = element.children[0].next.children[0].data || 0;
    if (index === 0) {
      result.cases = cases;
    } else if (index === 1) {
      result.deaths = cases;
    } else if (index === 2) {
      result.recovered = cases;
    }
  });
  result.updated = moment().format('MMMM Do YYYY, h:mm:ss a');
  return result;

};

module.exports = getTotalCases;
