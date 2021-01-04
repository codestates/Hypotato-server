const { user } = require("../../models");
const sha256 = require("sha256");
const errorController = require("../error/errorControl");

function remakePw(password, email) {
  const splitEmail = email.split("@");

  const midIdx = Math.round(password.length / 2);
  const headPw = password.slice(0, midIdx);
  const tailPw = password.slice(midIdx);

  return sha256(headPw + splitEmail[0] + tailPw + splitEmail[1]); // 조합된 비밀번호
}

module.exports = {
  put: async (req, res) => {
    if (req.session.userid) {
      const { nickname, password, chk } = req.body;
      if (chk === "nicknameChk") {
        checkNickname = await user.findOne({ where: { nickname } });
        if (checkNickname) {
          res.status(500).send({ chkNickname: "nicknameErr" });
        } else {
          res.status(200).send({ chkNickname: "nicknameOk" });
        }
      } else {
        user.findOne({ where: { id: req.session.userid } }).then((findUser) => {
          user
            .update(
              {
                nickname: nickname,
                password: remakePw(password, findUser.email),
              },
              {
                where: {
                  id: req.session.userid,
                },
              }
            )
            .then(() => {
              res.status(200).send({ nickname: nickname });
            })
            .catch((err) => {
              res.status(404).send({ message: "not Authorized" });
            });
        });
      }
    } else {
      errorController.respondInternalError(req, res);
    }
  },
};
