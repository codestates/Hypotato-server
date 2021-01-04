const { field, potato } = require("../../models");
const errorController = require("../error/errorControl");

module.exports = {
  get: (req, res) => {
    const { id } = req.params;
    if (req.session.userid) {
      if (id) {
        field
          .findOne({
            include: [
              {
                model: potato,
                attributes: ["id", "potatoName", "potatoDesc", "status"],
              },
            ],
            where: {
              id,
            },
          })
          .then((data) => {
            console.log(data);
            if (data) {
              res.status(200).send({
                data: {
                  fieldName: data.fieldName,
                  fieldDesc: data.fieldDesc,
                  category: data.category,
                  potatoes: data.potatoes,
                },
              });
            }
          })
          .catch((err) => {
            res.status(404).send({ message: "not found" });
          });
      }
    } else {
      errorController.respondInternalError(req, res);
    }
  },
};
