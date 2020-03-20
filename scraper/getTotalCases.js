const axios = require('axios');
const cheerio = require('cheerio');

const getTotalCases = async () => {
  let response;
  try {
    response = await axios.get('https://www.worldometers.info/coronavirus/');
    if (response.status !== 200) {
      console.error('ERROR : Website is down ');
    }
  } catch (e) {
    console.log('ERROR');
    return null;
  }
  const result = {};

  const html = cheerio.load(response.data);
  html('.maincounter-number').filter((i, el) => {
    let cases = el.children[0].next.children[0].data || 0;
    if (i === 0) {
      result.cases = cases;
    } else if (i === 1) {
      result.deaths = cases;
    } else if (i === 2) {
      result.recovered = cases;
    }
  });
  result.updated = Date.now();
  return result;

};

module.exports = getTotalCases;
