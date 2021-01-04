const errorController = require("../error/errorControl");

module.exports = {
  post: (req, res) => {
    if (req.session.userid) {
      if (!req.session.userid) {
        res.status(404).send({ message: "error" });
      } else {
        req.session.destroy(function () {
          req.session;
        });
        res.status(200).send({ message: "bye" });
      }
    } else {
      errorController.respondInternalError(req, res);
    }
  },
};
