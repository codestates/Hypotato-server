const express = require("express");
const session = require("express-session");
const cors = require("cors");

require("dotenv").config();

const usersRouter = require("./routes/user");
const fieldRouter = require("./routes/field");
const potatoRouter = require("./routes/potato");

const app = express();

const port = 4000;

app.use(
  session({
    proxy: true,
    secret: process.env.SESSION_SECRET, // 이건 비밀 쉿!
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      maxAge: 24 * 6 * 60 * 10000,
    },
  })
);

app.use(
  cors({
    origin: true,
    method: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//라우터 이름은 엔드포인트로 따봤습니다!
app.use("/", usersRouter);
app.use("/field", fieldRouter);
app.use("/potato", potatoRouter);

// 잘못된 접근을 할 경우 에러 핸들링 할 수 있으면 좋을 것 같다!

// 썩은 감자 필터링 구현하기!

app.listen(port, function () {
  console.log("Welcome Hypotato World from 4000!");
});

module.exports = app;
