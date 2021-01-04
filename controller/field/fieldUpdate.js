const { field } = require("../../models");
const errorController = require("../error/errorControl");

module.exports = {
  put: (req, res) => {
    const { fieldName, fieldDesc, category } = req.body;
    const { id } = req.params;
    if (req.session.userid) {
      field
        .update(
          { fieldName: fieldName, fieldDesc: fieldDesc, category: category },
          {
            where: {
              id: id,
            },
          }
        )
        .then(() => {
          res.status(200).send({ message: "field update ok!" });
        })
        .catch((err) => {
          res.status(404).send({ message: "field update fail!" });
        });
    } else {
      errorController.respondInternalError(req, res);
    }
  },
};
