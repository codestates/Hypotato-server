const { potato, user, field } = require("../../models");
const errorController = require("../error/errorControl");

module.exports = {
  get: (req, res) => {
    if (req.session.userid) {
      user
        .findOne({
          include: [
            {
              model: field,
              attributes: [
                "id",
                "fieldName",
                "fieldDesc",
                "category",
                "userId",
              ],
            },
            {
              model: potato,
              attributes: [
                "id",
                "potatoName",
                "potatoDesc",
                "status",
                "fieldId",
                "userId",
              ],
            },
          ],
          where: {
            id: req.session.userid,
          },
        })
        .then((data) => {
          if (data) {
            res.status(200).send({
              data: {
                nickname: data.nickname,
                email: data.email,
                fields: data.fields,
                potatoes: data.potatoes,
              },
            });
          }
        })
        .catch((err) => {
          res.status(404).send({ message: "not Authorized" });
        });
    } else {
      errorController.respondInternalError(req, res);
    }
  },
};
