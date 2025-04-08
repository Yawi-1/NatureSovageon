const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    image:{
        type:String,
        required:true
    },
    category:{
        type:String,
    }
})
productSchema.index({ title: 'text'});
module.exports = mongoose.model('Product', productSchema);