const { field } = require("../../models");
const errorController = require("../error/errorControl");

module.exports = {
  post: (req, res) => {
    const { fieldName, fieldDesc, category } = req.body;
    if (req.session.userid) {
      field
        .create({ fieldName, fieldDesc, category, userId: req.session.userid })
        .then(() => {
          res.status(200).send({ message: "field added successfully!" });
        })
        .catch(() => {
          res.status(404).send({ message: "field successfully fail!" });
        });
    } else {
      errorController.respondInternalError(req, res);
    }
  },
};
