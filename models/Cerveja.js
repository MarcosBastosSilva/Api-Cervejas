const mongoose  = require('mongoose')
const Cerveja = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    ingredients:{
        type:String,
        required:true
    },
    alcoholContent:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
},
{
    timestamps:true,
})

mongoose.model("cerveja",Cerveja)