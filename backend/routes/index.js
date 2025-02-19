const express = require("express");
const router = express.Router();

const experienceRoute = require("./experiences");
const educationRoute = require("./educations")

router.use("/experiences", experienceRoute);
router.use("/educations", educationRoute);

module.exports = router;