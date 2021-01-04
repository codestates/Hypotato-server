const axios = require("axios");
const { user } = require("../../models");
const sha256 = require("sha256");

module.exports = {
  post: async (req, res) => {
    const { nickname, email, password } = req.body;
    let googleUser = await user.findOne({ where: { email } });
    if (!googleUser) {
      user
        .create({ nickname, email, password: sha256(password) })
        .then((data) => {
          req.session.userid = data.id;
          res.status(200).send({ nickname: data.nickname });
        });
    } else {
      req.session.userid = googleUser.id;
      res.status(200).send({ nickname: googleUser.nickname });
    }
  },
};
