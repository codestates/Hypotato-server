const { potato } = require("../../models");
const errorController = require("../error/errorControl");

module.exports = {
  post: (req, res) => {
    if (req.session.userid) {
      const { potatoName, potatoDesc, fieldId } = req.body;

      potato
        .create({ potatoName, potatoDesc, fieldId, userId: req.session.userid })
        .then(() => {
          res.status(200).send({ message: "potato add ok!" });
        })
        .catch(() => {
          res.status(404).send({ message: "potato add fail!" });
        });
    } else {
      errorController.respondInternalError(req, res);
    }
  },
};
