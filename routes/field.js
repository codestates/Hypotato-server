const express = require("express");
const fieldRouter = express.Router();
const { fieldController } = require("../controller");

fieldRouter.post("/add", fieldController.fieldAdd.post);

fieldRouter.get("/:id", fieldController.fieldinfo.get);

fieldRouter.put("/:id", fieldController.fieldUpdate.put);

fieldRouter.delete("/:id", fieldController.fieldDelete.delete);

module.exports = fieldRouter;
