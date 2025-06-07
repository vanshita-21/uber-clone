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
    if (!origin || !destination) {
        throw new Error('Origin and Destination are required');
    }

    const apikey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apikey}`;

    try {
        const response = await axios.get(url);
        console.log("Distance Matrix Response:", response.data);

        if (response?.data?.status === 'OK') {
            const element = response?.data?.rows[0]?.elements[0];
            if (element?.status === 'ZERO_RESULTS') {
                throw new Error('No routes found');
            }
            return element;
        } else {
            throw new Error('Unable to fetch distance and time');
        }
    } catch (error) {
        console.error("Error in getDistanceTime:", error);
        throw error;
    }
};


module.exports.getAutoCompleteSuggestion = async (input) => {
    if(!input){
        throw new Error('query is required')
    }

    const apikey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apikey}`;

    try {
        const response = await axios.get(url);
        
        if(response?.data?.status == 'OK'){
            return response?.data?.predictions;
        }else{
            throw new Error('Unable to fetch suggestions');
        }
        
    } catch (error) {
        console.error("erro---dgvd-",error);
        throw error;
    }
}