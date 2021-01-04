const { potato } = require("../../models");
const errorController = require("../error/errorControl");

module.exports = {
  get: (req, res) => {
    const { id } = req.params;
    if (req.session.userid) {
      potato
        .findOne({ where: { id } })
        .then((potatoData) => {
          const { id, potatoName, potatoDesc, status } = potatoData;

          res
            .status(200)
            .send({ data: { id, potatoName, potatoDesc, status } });
        })
        .catch(() => {
          res.status(404).send({ message: "potato error!" });
        });
    } else {
      errorController.respondInternalError(req, res);
    }
  },
};
