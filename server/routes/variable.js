const express = require("express");
const variableController = require("../controller/VariableController");

let router = express.Router();
router.use(express.json());

router.get("/getAllVariable", variableController.getAllVariables);
router.get("/getAllCompanies", variableController.getAllCompanies);

module.exports = router;
