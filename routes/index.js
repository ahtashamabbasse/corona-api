const express = require('express');
const router = express.Router();

const CovidController = require('../controller/covidController');
const covidController=new CovidController();

router.get('/', (req,res)=>res.redirect('https://github.com/ahtashamabbasse/Corona-virus-stats-api'));
router.get('/total', covidController.getTotalCases);
router.get('/countries', covidController.getCountries);
router.get('/countries/:country', covidController.getCountry);
router.get('/countries/sort/:column/:order', covidController.getSortedCountries);

router.get('/states', covidController.getStates);


module.exports = router;
