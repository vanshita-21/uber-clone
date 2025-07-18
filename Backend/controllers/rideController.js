const rideService =require('../services/rideService');
const { validationResult } = require('express-validator');
const mapService = require('../services/mapsService');
const { sendMessageToSocketId } = require('../socket');
const rideModel = require('../models/rideModel');

module.exports.createRide = async(req,res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {userId, pickup, destination, vehicleType} = req.body;

    try {
        const ride = await rideService.createRide({user: req.user._id, pickup, destination, vehicleType})
        res.status(201).json(ride);

        const pickupCoordinates = await mapService.getAddressCoordinate(pickup);

        const captainsInRadius = await mapService.getCaptainsInTheRadius(pickupCoordinates.ltd, pickupCoordinates.lng, 2);
        ride.otp = "";

        const rideWithUser = await rideModel.findOne({_id: ride._id}).populate('user')
        
        captainsInRadius.map(captain => {
            sendMessageToSocketId(captain.socketId, {
                event: 'new-ride',
                data: rideWithUser
            })
        })
        
    } catch (error) {
        return res.status(500).json({message : error.message});
    }
}

module.exports.getFare = async(req,res) =>  {
    const errors = validationResult(req);
    console.log("1111", req.query);
    
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array() });
    }

    const {pickup, destination} = req.query;

    try {
        const fare = await rideService.getFare(pickup, destination);
        return res.status(200).json(fare);
    } catch (error) {
        console.error("Error in getFare:", error.message);
        return res.status(500).json({message : error.message});
        
    }
}

module.exports.confirmRide = async(req, res) => {
    const errors = validationResult(req);
     if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const { rideId } = req.body;

    try {
        const ride = await rideService.confirmRide({rideId, captain: req.captain});

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data: ride
        })

        return res.status(200).json(ride);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports.startRide = async(req,res) => {
    const errors = validationResult(req);
     if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {rideId, otp} = req.query;

    try {
        const ride = await rideService.startRide({ rideId, otp, captain: req.captain});

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-started',
            data: ride
        })

        return res.status(200).json(ride);
        
    } catch (error) {
        return res.status(500).json({ message: error.message });
        
    }
}

module.exports.endRide = async(req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {rideId} =  req.body;

    try {
        const ride = await rideService.endRide({ rideId, captain: req.captain});

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-ended',
            data: ride
        })
        
    } catch (error) {
        return res.status(500).json({ message: error.message });
        
    }
}

