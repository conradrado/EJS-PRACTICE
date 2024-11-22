const express = require("express");
const path = require("path");
const app = express();


const defaultRoutes = require('./routes/default');
const restRoutes = require('./routes/restaurants');

app.set('views', path.join(__dirname, 'views')); // 템플릿을 보관하는 views의 경로
app.set('view engine', 'ejs'); // 템플릿 엔진 -> ejs로 설정

app.use(express.static('public')); // public에 있는 정적 파일들(css,js) 사용 가능하게 하는 미들웨어
app.use(express.urlencoded({extended:false})); // 폼에서 submit된 데이터를 파싱하는 미들웨어

app.use('/', defaultRoutes);
app.use('/', restRoutes)



app.use(function (req, res) {
  res.status("404").render("404");
});

app.use(function (error, req, res, next) {
  console.error(error.stack);
  res.status("500").render("500");
});

app.listen(3000);
