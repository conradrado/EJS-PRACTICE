const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, '..', 'data', 'restaurants.json'); // data 디렉토리 안에 있는 json 파일의 경로를 지목

// json 파일에 담겨져 있는 데이터를 자바스크립트 객체로 리턴하는 함수
function getStoredRestaurants() {
    const fileData = fs.readFileSync(filePath); // fileData 변수에 해당 json파일이 가지고 있는 데이터(문자열 상태)를 저장
    const storedRestaurant = JSON.parse(fileData); // JSON.parse 메서드를 사용하여 fileData를 자바스크립트 객체로 변환 및 storedRestaurant에 저장
    return storedRestaurant;
}

// json 파일에 데이터를 쓰는 함수
function storeRestaurants(storableRestaurants) {
    fs.writeFileSync(filePath, JSON.stringify(storableRestaurants)); // 해당 filePath에 있는 json 파일에 매개변수(자바 스크립트 객체)를 문자열 형태로 변환시켜서 쓴다.
}

module.exports = {
    getStoredRestaurants: getStoredRestaurants,
    storeRestaurants: storeRestaurants
};

