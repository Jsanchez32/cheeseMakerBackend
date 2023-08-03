const {Schema,model} = require("mongoose");

const cheeseSchema = Schema({
    name:{
        type: String,
    },
    state:{
        type:Boolean,
        default:true
    },
    usuario:{
        type:Schema.Types.ObjectId,
        ref: 'Usuario',
    },
    price:{
        type:Number,
    },
    categoria:{
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
    },
    descripcion:{
        type: String,
    },
    avalaible:{
        type: Boolean,
    }
})

module.exports = model('Cheese',cheeseSchema);