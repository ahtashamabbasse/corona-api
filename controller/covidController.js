const scapper = require('../scraper/index');

class CovidController {
  /**
   * @route public /totalCases
   * @method GET
   * @param req
   * @param res
   * @description get total reported cases, death and recovered patients,
   */
  async getTotalCases (req, res) {
    const getTotalCases = await scapper.getTotalCases();
    res.status(200).json(getTotalCases);
  }

  /**
   * @route public /country
   * @method GET
   * @param req
   * @param res
   * @description get details of all countries
   */
  async getCountries(req, res) {
    const getCountries = await scapper.getCountries();
    res.status(200).json(getCountries);
  }

  /**
   * @route public /states
   * @method GET
   * @param req
   * @param res
   * @description get details of USA states
   */
  async getStates(req, res) {
    const states = await scapper.getStates();
    res.status(200).json(states);
  }

}

module.exports = CovidController;
