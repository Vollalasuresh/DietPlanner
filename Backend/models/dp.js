const mongoose=require('mongoose');
const dpSchema= mongoose.Schema({
        day: String, 
        bf: {
            item1:String,
            item2:String,
            item3:String,

        },
        ln:{
            item1:String,
            item2:String,
            item3:String,

        },
        dn:{
            item1:String,
            item2:String,
            item3:String,

        },
        userName : String,
    
})

const dp= module.exports=mongoose.model('dp',dpSchema);

