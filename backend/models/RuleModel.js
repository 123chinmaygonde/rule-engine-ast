const mongoose = require("mongoose")

const ruleSchema = new mongoose.Schema({
    name:String,
    ast:Object
})

const Rule = mongoose.model('Rule',ruleSchema)
module.exports= Rule