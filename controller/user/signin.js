const { user } = require("../../models");
const sha256 = require("sha256");

function remakePw(password, email) {
  const splitEmail = email.split("@");

  const midIdx = Math.round(password.length / 2);
  const headPw = password.slice(0, midIdx);
  const tailPw = password.slice(midIdx);

  return sha256(headPw + splitEmail[0] + tailPw + splitEmail[1]);
}

module.exports = {
  post: async (req, res) => {
    const { email, password } = req.body;

    user
      .findOne({
        where: {
          email,
          password: remakePw(password, email),
        },
      })
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "no user found" });
        } else {
          req.session.save(() => {
            req.session.userid = data.id;
            res.status(200).send({ message: "ok" });
          });
        }
      })
      .catch((err) => {
        res.status(404).send(err);
      });
  },
};
