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
    console.log('controller hitting');
    const getTotalCases = await scapper.getTotalCases();
    res.status(200).json(getTotalCases);
  }
}

module.exports = CovidController;
