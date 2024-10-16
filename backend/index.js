const express  = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const RuleRoutes = require('./routes/RuleRoutes')

const app = express()
app.use(express.json())
app.use(bodyParser.json())

const PORT = process.env.PORT || 3000


mongoose.connect("mongodb+srv://chinmay:gonde@cluster0.srqih.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("connected to database")
}).catch((error)=>{
    console.log(error)
})
app.use('/api/rules',RuleRoutes)

app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`)
})


