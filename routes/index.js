const express = require('express');
const router = express.Router();

const CovidController = require('../controller/covidController');
const covidController=new CovidController();

router.get('/', covidController.getTotalCases);
router.get('/countries', covidController.getCountries);
router.get('/countries/:country', covidController.getCountry);

router.get('/states', covidController.getStates);


module.exports = router;
