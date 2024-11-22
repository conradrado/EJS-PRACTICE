const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '..', 'data', 'restaurants.json');

function getStoredRestaurants(){
    const fileData = fs.readFileSync(filePath);
    const storedRestaurant = JSON.parse(fileData);
    return storedRestaurant;
}

function storeRestaurants(restaurants){
    fs.writeFileSync(filePath,JSON.stringify(restaurants));
}

module.exports = {
    getStoredRestaurants: getStoredRestaurants,
    storeRestaurants: storeRestaurants
};