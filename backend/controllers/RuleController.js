const Rule = require('../models/RuleModel')
const RuleService = require('../services/RuleService')
const mongoose = require("mongoose")


exports.createRule = async (req, res) => {
    try {
        const { ruleString, ruleName } = req.body;
        console.log("Received body:", req.body);  // Log the received body
        
        const ast = RuleService.createAST(ruleString);  // This might throw an error
        const rule = new Rule({ name: ruleName, ast });
        await rule.save();
        res.status(200).json(rule);
    } catch (error) {
        console.error("Error in createRule:", error);  // Log the error for debugging
        res.status(500).json({ message: 'Error creating rule', error: error.message });
    }
};


exports.combineRules = async (req, res) => {
    try {
        const ruleIds = req.body.ruleIds; // Expecting an array of rule IDs

        // Validate rule IDs
        for (let id of ruleIds) {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ message: `Invalid ObjectId: ${id}` });
            }
        }

        // Fetch the rules from the database
        const rules = await Rule.find({ _id: { $in: ruleIds } });

        if (rules.length === 0) {
            return res.status(404).json({ message: "No rules found with the provided IDs." });
        }

        // Combine the ASTs of the fetched rules
        const combinedAST = RuleService.combineRules(rules.map(rule => rule.ast));

        return res.status(200).json({ combinedAST });
    } catch (error) {
        console.error("Error combining rules", error);
        return res.status(500).json({ message: "Error combining rules", error: error.message });
    }
};

exports.evaluateRule = async(req, res) => {
    const { ruleId, userData } = req.body;

    if (!userData) {
        return res.status(400).json({ message: 'User data is required' });
    }

    try {
        const rule = await Rule.findById(ruleId);
        if (!rule) {
            return res.status(404).json({ message: 'Rule not found' });
        }

        const evaluationResult = RuleService.evaluateRuleRequest(rule.ast, userData);
        res.status(200).json({ eligible: evaluationResult });
    } catch (error) {
        console.error('Error in evaluateRule:', error);
        res.status(500).json({ message: 'Error evaluating rule', error: error.message });
    }
};