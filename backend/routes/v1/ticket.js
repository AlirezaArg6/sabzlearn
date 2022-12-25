const express = require("express");

const isAdminMiddleware = require("../../middlewares/isAdmin");
const authenticatedMiddleware = require("../../middlewares/authenticated");
const controller = require("../../controllers/v1/ticket");

const router = express.Router();

router
  .route("/")
  .post(authenticatedMiddleware, controller.create)
  .get(authenticatedMiddleware, controller.getAll);

router.route("/departments").get(controller.departments);
router.route("/departments-subs/:id").get(controller.departmentsSubs);

module.exports = router;
