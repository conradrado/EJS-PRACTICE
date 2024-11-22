const express = require("express");
const path = require("path");
const app = express();
const uuid = require("uuid");

const restaurantData = require("./util/restaurant-data");

app.set("views", path.join(__dirname, "views")); // 템플릿을 보관하는 views의 경로
app.set("view engine", "ejs"); // 템플릿 엔진 -> ejs로 설정

app.use(express.static("public")); // public에 있는 정적 파일들(css,js) 사용 가능하게 하는 미들웨어
app.use(express.urlencoded({ extended: false })); // 폼에서 submit된 데이터를 파싱하는 미들웨어

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.get("/confirm", function (req, res) {
  res.render("confirm");
});

app.get("/recommend", function (req, res) {
  res.render("recommend");
});

app.post("/recommend", function (req, res) {
  const restaurant = req.body; // 요청에서 submit된 객체들(순수 문자열 상태)을 restaurant라는 변수에 부여
  restaurant.id = uuid.v4(); // 무작위, 고유의 id를 생성하여 restaurant 객체의 id 속성에 부여

  // restaurant-data 모듈 사용
  const storedRestaurant = restaurantData.getStoredRestaurants();
  storedRestaurant.push(restaurant);

  // 데이터를 파일에 저장
  restaurantData.storeRestaurants(storedRestaurant);

  res.redirect("/confirm");
});

app.get("/restaurants", function (req, res) {
  // restaurant-data 모듈 사용
  const storedRestaurant = restaurantData.getStoredRestaurants();
  res.render("restaurants", {
    numberOfRestaurants: storedRestaurant.length,
    restaurants: storedRestaurant,
  });
});

app.get("/restaurants/:id", function (req, res) {
  const restaurantId = req.params.id;
  // restaurant-data 모듈 사용
  const storedRestaurant = restaurantData.getStoredRestaurants();
  for (const restaurant of storedRestaurant) {
    if (restaurant.id === restaurantId) {
      return res.render("restaurants-detail", { restaurant: restaurant });
    }
  }

  res.status("404").render("404");
});

app.use(function (req, res) {
  res.status("404").render("404");
});

app.use(function (error, req, res, next) {
  res.status("500").render("500");
});

app.listen(3000);
