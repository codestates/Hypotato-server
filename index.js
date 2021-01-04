const express = require("express");
const session = require("express-session");
const cors = require("cors");
const nodeSchedule = require("node-schedule");
const { errorController } = require("./controller");
const { potato } = require("./models");

require("dotenv").config();

const usersRouter = require("./routes/user");
const fieldRouter = require("./routes/field");
const potatoRouter = require("./routes/potato");

const app = express();

const port = 4000;

app.use(
  session({
    proxy: true,
    secret: process.env.SESSION_SECRET,
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

app.use("/", usersRouter);
app.use("/field", fieldRouter);
app.use("/potato", potatoRouter);

app.use(errorController.pageNotFoundError);
app.use(errorController.respondInternalError);

// 썩은 감자를 필터링하기 위한 스케쥴링 설정
// 매주마다 검사
const BadPotatoChkSchedule = nodeSchedule.scheduleJob("* * */24 * * *", () => {
  potato
    .findAll()
    .then((data) => {
      let badPotatoFilter = data.map((potato) => {
        let currentDate = new Date().getTime();
        let potatoUpdatedAt = new Date(potato.createdAt).getTime();
        let dateDiff = Math.floor(
          (currentDate - potatoUpdatedAt) / (1000 * 3600 * 24)
        );

        if (dateDiff > 7) {
          return potato.id;
        }
      });

      return badPotatoFilter;
    })
    .then((badPotatoFilter) => {
      badPotatoFilter.forEach((badPotato) => {
        if (badPotato) {
          potato
            .update({ status: "bad" }, { where: { id: badPotato } })
            .then(() => {
              console.log("badPotato filter success!");
            });
        }
      });
    });
});

app.listen(port, function () {
  console.log("Welcome Hypotato World from 4000!");
});

module.exports = app;
