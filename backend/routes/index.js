const express = require("express");
const router = express.Router();

const experienceRoute = require("./experiences");

router.use("/experiences", experienceRoute);

module.exports = router;