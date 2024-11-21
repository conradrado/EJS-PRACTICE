const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const uuid = require('uuid');

app.set('views', path.join(__dirname, 'views')); // 템플릿을 보관하는 views의 경로
app.set('view engine', 'ejs'); // 템플릿 엔진 -> ejs로 설정

app.use(express.static('public')); // public에 있는 정적 파일들(css,js) 사용 가능하게 하는 미들웨어
app.use(express.urlencoded({extended:false})); // 폼에서 submit된 데이터를 파싱하는 미들웨어

app.get("/", function (req, res) {
  res.render('index');
});

app.get("/about", function (req, res) {
    res.render('about');
});

app.get("/confirm", function (req, res) {
    res.render('confirm');
});

app.get("/recommend", function (req, res) {
    res.render('recommend');
});

app.post('/recommend', function(req, res){
    const restaurant = req.body;
    restaurant.id = uuid.v4(); // 무작위, 고유의 id를 생성하여 restaurant 객체의 id 속성에 부여
    const filePath = path.join(__dirname, 'data', 'restaurants.json');
    const fileData = fs.readFileSync(filePath);
    const storedRestaurant = JSON.parse(fileData);

    storedRestaurant.push(restaurant);
    fs.writeFileSync(filePath, JSON.stringify(storedRestaurant));
    res.redirect('/confirm');
})


app.get("/restaurants", function (req, res) {
    const filePath = path.join(__dirname, 'data', 'restaurants.json');
    const fileData = fs.readFileSync(filePath);
    const storedRestaurant = JSON.parse(fileData);
    res.render('restaurants', { numberOfRestaurants: storedRestaurant.length , restaurants: storedRestaurant});
});

app.get('/restaurants/:id', function(req,res){
    const restaurantId = req.params.id;
    const filePath = path.join(__dirname, 'data', 'restaurants.json');
    const fileData = fs.readFileSync(filePath);
    const storedRestaurant = JSON.parse(fileData);
    
    for (const restaurant of storedRestaurant){
        if (restaurant.id === restaurantId){
            return res.render('restaurants-detail', {restaurant : restaurant});
        }
    }
    
});

app.listen(3000);
