const mongoose = require ('mongoose')
const fileSchema = new mongoose.Schema({

    filename : {type :String  , required : true },
    originalname : {type :String ,required : true },
    destination : {type :String, required : true },
    path : {type :String, required : true },
    size : {type :Number, required : true }
})
const UploadFileSchema = new mongoose.Schema({
    file:[fileSchema],
    
    
})
module.exports = mongoose.model('UploadFile', UploadFileSchema)