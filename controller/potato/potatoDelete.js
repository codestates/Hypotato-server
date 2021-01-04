const { potato } = require("../../models");
const errorController = require("../error/errorControl");

module.exports = {
  delete: (req, res) => {
    const { id } = req.params;
    if (req.session.userid) {
      potato
        .destroy({
          where: {
            id,
          },
        })
        .then(() => {
          res.status(200).send({ message: "potato delete ok!" });
        })
        .catch(() => {
          res.status(400).send({ message: "potato delete fail!" });
        });
    } else {
      errorController.respondInternalError(req, res);
    }
  },
};
