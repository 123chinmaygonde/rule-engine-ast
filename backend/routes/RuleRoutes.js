const express = require("express")
const RuleController = require("../controllers/RuleController")
const router = express.Router()

router.post('/create',RuleController.createRule)
router.post('/combine',RuleController.combineRules)
router.post('/evaluate',RuleController.evaluateRule)

module.exports = router