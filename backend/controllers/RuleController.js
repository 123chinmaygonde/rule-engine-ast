const Rule = require('../models/RuleModel')
const RuleService = require('../services/RuleService')


exports.createRule =  async(req,res)=>{
    try {
        const {ruleString, ruleName}= req.body
        const ast = RuleService.createAST(ruleString)
        const rule = new Rule({name:ruleName,ast})
        await rule.save()
        res.status(200).json(rule)
        
    } catch (error) {
        res.status(500).json({message:'error creating rule',error})
        
    }
}

exports.combineRules = async(req,res)=>{
    try {
        const {ruleIds} = req.body
        const rules = await RuleService.find({_id:{$in:ruleIds}})
        const combinedAST = RuleService.combineRules(rules.map(r=>r.ast))
        res.status(200).json(combinedAST)
    } catch (error) {
        res.status(500).json({message:'error combining rules',error})
    }
}

exports.evaluateRule = async(req,res)=>{
    try{
        const {ruleId,userData} = req.body
        const rule = await Rule.findById(ruleId)
        const result = RuleService.evaluateRule(rule.ast,userData)
        res.status(200).json({eligible:result})

    }catch(error){
        res.status(500).json({message:'error evaluating rule',error})

    }
}