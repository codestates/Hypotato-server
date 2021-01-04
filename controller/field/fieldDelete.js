const { truncate } = require("fs");
const { field, potato } = require("../../models");
const errorController = require("../error/errorControl");

// function potatpDestroyAll(potatoes) {

// }

module.exports = {
  delete: (req, res) => {
    const { id } = req.params;
    if (req.session.userid) {
      field
        .destroy({
          where: {
            id,
          },
        })
        .then(() => {
          potato.destroy({ where: { fieldId: id } }).then(() => {
            res.status(200).send({ message: "field delete ok!" });
          });
        })
        .catch(() => {
          res.status(404).send({ message: "field delete fail!" });
        });
    } else {
      errorController.respondInternalError(req, res);
    }
  },
};
