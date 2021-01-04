const { potato } = require("../../models");
const errorController = require("../error/errorControl");

module.exports = {
  put: (req, res) => {
    const { lastClickAt, status } = req.body;
    const { id } = req.params;

    if (req.session.id) {
      potato
        .update(
          {
            createdAt: lastClickAt,
            status,
          },
          { where: { id } }
        )
        .then(() => {
          res
            .status(200)
            .send({ message: "potato time and status update ok!" });
        })
        .catch((err) => {
          res
            .status(404)
            .send({ message: "potato time and status update fail!" });
        });
    } else {
      errorController.respondInternalError(req, res);
    }
  },
};
