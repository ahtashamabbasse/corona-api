const express = require('express');
const router = express.Router();

const CovidController = require('../controller/covidController');
const covidController=new CovidController();

router.get('/', covidController.getTotalCases);


module.exports = router;
