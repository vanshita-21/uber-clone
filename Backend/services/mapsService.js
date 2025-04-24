const axios = require('axios')

module.exports.getAddressCoordinate = async (address) => {
    const apikey = process.env.GOOGLE_MAPS_API;
    const  url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apikey}`;

    try {
        const response = await axios.get(url);
        if(response.data.status === 'OK') {
            const location = response.data.results[0].geometry.location;
            return {
                ltd : location.lat,
                lng : location.lng
            }
        } else{
            throw new Error('Unable to fetch coordinates');
        }
        
    } catch (error) {
        console.error(error);
        throw error;
    }
} 

module.exports.getDistanceTime = async (origin, destination) => {
    if(!origin || !destination){
        throw new Error('Origin and Destination are required')
    }

    const apikey = process.env.GOOGLE_MAPS_API;
    const  url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apikey}`;

    try {
        const response = await axios.get(url);
        if(response?.data?.status == 'OK'){
            if(response?.data?.rows[0]?.elements[0]?.status == 'ZERO_RESULTS'){
                throw new Error('No routes found')
            }
            return response?.data?.rows[0]?.elements[0];
        }else{
            throw new Error('Unable to fetch Distance and Time');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports.getAutoCompleteSuggestion = async (input) => {
    if(!input){
        throw new Error('query is required')
    }

    const apikey = process.env.GOOGLE_MAPS_API;
    const  url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apikey}`;

    try {
        const response = await axios.get(url);
        if(response?.data?.status == 'OK'){
            return response?.data?.predictions;
        }else{
            throw new Error('Unable to fetch suggestions');
        }
        
    } catch (error) {
        console.error(error);
        throw error;
    }
}