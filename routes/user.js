const express = require("express");
const userRouter = express.Router();
const { userController } = require("../controller");

// 회원가입
userRouter.post("/signup", userController.signup.post);

// 로그인
userRouter.post("/signin", userController.signin.post);

// 구글 로그인
userRouter.post("/google/signin", userController.googleSignin.post);

// 로그아웃
userRouter.post("/signout", userController.signout.post);

// 유정 정보 조회
userRouter.get("/userinfo", userController.userinfo.get);

// 유저 정보 수정
userRouter.put("/userinfoupdate", userController.userUpdate.put);

module.exports = userRouter;
