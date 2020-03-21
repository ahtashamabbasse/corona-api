const db = require('quick.db');
const constants = require('../constants/constants');

class CovidController {
  /**
   * @route public /totalCases
   * @method GET
   * @param req
   * @param res
   * @description get total reported cases, death and recovered patients,
   */
  async getTotalCases (req, res) {
    const getTotalCases = db.get(constants.totalCases);
    res.status(200).json(getTotalCases);
  }

  /**
   * @route public /countries
   * @method GET
   * @param req
   * @param res
   * @description get details of all countries
   */
  async getCountries (req, res) {
    const getCountries = db.get(constants.countryTable);
    res.status(200).json(getCountries);
  }

  /**
   * @route public /countries/:country
   * @method GET
   * @param req
   * @param res
   * @description get details of individual country
   */
  async getCountry (req, res) {
    const countries = db.get(constants.countryTable);
    const paramCountry = req.params.country.toLowerCase();
    const country = countries.filter(
      c => c.country.toLocaleLowerCase() === paramCountry);
    res.status(200).json(country);
  }

  /**
   * @route public /states
   * @method GET
   * @param req
   * @param res
   * @description get details of USA states
   */
  async getStates (req, res) {
    const states = db.get(constants.stateTable);
    res.status(200).json(states);
  }

}

module.exports = CovidController;
