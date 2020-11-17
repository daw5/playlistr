import express from "express";
import path from "path";
const reactRouterController = express.Router();

reactRouterController.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../../client/build/index.html"), function (
    err
  ) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

export default reactRouterController;
