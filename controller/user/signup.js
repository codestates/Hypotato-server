const { user } = require("../../models");
const sha256 = require("sha256");
const errorController = require("../error/errorControl");
const { Op } = require("sequelize");

function remakePw(password, email) {
  const splitEmail = email.split("@");

  const midIdx = Math.round(password.length / 2);
  const headPw = password.slice(0, midIdx);
  const tailPw = password.slice(midIdx);

  return sha256(headPw + splitEmail[0] + tailPw + splitEmail[1]); // 조합된 비밀번호
}

// email 또는 nickname 이 같은 사용자가 있으면
// if(email || nickname)
// {message: "중복되는 이메일 또는 닉네임이 있습니다.", err: "삐빅 에러입니다!"}

// if(email === 중복) // if(nickname === 중복)
// {message: "중복되는 이메일 또는 닉네임이 있습니다.", err: "삐빅 에러입니다!"}

module.exports = {
  post: async (req, res) => {
    try {
      const { nickname, email, password, chk } = req.body;
      let checkEmail;
      let checkNickname;

      if (!req.session.userid) {
        if (chk === "emailChk") {
          checkEmail = await user.findOne({ where: { email } });
          if (checkEmail) {
            res.status(500).send({ chkEmail: "emailErr" });
          } else {
            res.status(200).send({ chkEmail: "emailOk" });
          }
        }

        if (chk === "nicknameChk") {
          checkNickname = await user.findOne({ where: { nickname } });
          if (checkNickname) {
            res.status(500).send({ chkNickname: "nicknameErr" });
          } else {
            res.status(200).send({ chkNickname: "nicknameOk" });
          }
        }

        if (!chk) {
          if (!email || !nickname || !password) {
            return res
              .status(422)
              .send({ message: "정보를 다 입력하지 않았습니다." });
          } else {
            const chkUser = await user.findOne({
              where: { [Op.or]: [{ email }, { nickname }] },
            });

            if (!chkUser) {
              user
                .create({
                  nickname,
                  email,
                  password: remakePw(password, email),
                })
                .then((data) => {
                  res.status(200).send({ signupdata: data.nickname });
                })
                .catch((err) => {
                  res.status(404).send({ message: "err" });
                });
            } else {
              res.status(500).send({ message: "user conflict" });
            }
          }
        }
      } else {
        errorController.respondInternalError(req, res);
      }
    } catch (err) {
      console.log(err);
    }
  },
};
