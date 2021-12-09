const express = require("express");
const router = express.Router();

router.use("/covid", require("./covidRouter"));
router.use("/user", require("./userRouter"));
router.use("/developer", require("./developerRouter"));

module.exports = router;
