const { potato } = require("../../models");
const errorController = require("../error/errorControl");

module.exports = {
  put: (req, res) => {
    const { id } = req.params;
    const { potatoName, potatoDesc } = req.body;
    if (req.session.userid) {
      potato
        .update(
          { potatoName, potatoDesc },
          {
            where: {
              id,
            },
          }
        )
        .then(() => {
          res.status(200).send({ message: "potato update ok!" });
        })
        .catch((err) => {
          res.status(404).send({ message: "potato update fail!" });
        });
    } else {
      errorController.respondInternalError(req, res);
    }
  },
};
