const { getAllUserCards } = require("../controllers/home.controller.js");

const express = require("express");
const router = express.Router();

router.get("/", getAllUserCards);

module.exports = router;
