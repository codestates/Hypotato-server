const express = require("express");
const potatoRouter = express.Router();
const { potatoController } = require("../controller");

potatoRouter.post("/add", potatoController.potatoAdd.post);

potatoRouter.get("/:id", potatoController.potatoinfo.get);

potatoRouter.put("/:id", potatoController.potatoUpdate.put);

potatoRouter.delete("/:id", potatoController.potatoDelete.delete);

potatoRouter.put("/potatus/:id", potatoController.potatus.put);

module.exports = potatoRouter;
