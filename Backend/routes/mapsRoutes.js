const express = require('express');
const router =  express.Router();
const mapController = require('../controllers/mapController');
const authMiddleware = require('../middlewares/authMiddleware');
const { query } = require('express-validator');


router.get('/get-coordinates',
    query('address').isString().isLength({ min: 3 }),
    authMiddleware.authUser, mapController.getCoordinates);


router.get('/get-distance-time',
    query('origin').isString().isLength({ min: 3 }),
    query('destination').isString().isLength({ min: 3 }),
    authMiddleware.authUser, mapController.getDistanceTime);

router.get('/get-suggestion', 
    query('input').isString().isLength({min : 3}),
    authMiddleware.authUser, mapController.getAutoCompleteSuggestion
)

module.exports = router