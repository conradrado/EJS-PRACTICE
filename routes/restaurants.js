const express = require("express");
const router = express.Router();
const uuid = require("uuid");
const fs = require("fs");

const restaurantData = require("../util/data");

router.get("/restaurants", function (req, res) {
  let order = req.query.order;
  let nextOrder = 'desc';
  if (order !== "asc" && order !== "desc") {
    order = "asc";
  }

  if (order == 'desc'){
    nextOrder = 'asc';
  }

  // restaurant-data 모듈 사용
  const storedRestaurant = restaurantData.getStoredRestaurants();

  storedRestaurant.sort(function (resA, resB) {
    if (
      (order === "asc" && resA.name > resB.name) ||
      (order === "desc" && resB.name > resA.name)
    ) {
      return 1;
    }
    return -1;
  });

  res.render("restaurants", {
    numberOfRestaurants: storedRestaurant.length,
    restaurants: storedRestaurant,
    nextOrder: nextOrder
  });
});

router.get("/restaurants/:id", function (req, res) {
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
router.get("/confirm", function (req, res) {
  res.render("confirm");
});

router.get("/recommend", function (req, res) {
  res.render("recommend");
});

router.post("/recommend", function (req, res) {
  const restaurant = req.body; // 요청에서 submit된 객체들(순수 문자열 상태)을 restaurant라는 변수에 부여
  restaurant.id = uuid.v4(); // 무작위, 고유의 id를 생성하여 restaurant 객체의 id 속성에 부여

  // restaurant-data 모듈 사용
  const storedRestaurant = restaurantData.getStoredRestaurants();
  storedRestaurant.push(restaurant);

  // 데이터를 파일에 저장
  restaurantData.storeRestaurants(storedRestaurant);

  res.redirect("/confirm");
});

module.exports = router;
