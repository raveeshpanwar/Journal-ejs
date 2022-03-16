const mongoose=require('mongoose');
const newSchema=new mongoose.Schema({
    title:String,
    poste:String
});
module.exports=mongoose.model("Post",newSchema)