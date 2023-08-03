const Cheese = require('../models/Cheese.js')

const getCheese = async (req,res)=>{
    try {
        const query = {state:true}

        const [total, cheese] = await Promise.all([
            Cheese.countDocuments(query),
            Cheese.find(query)
                .populate('usuario',['nombre'])
                .populate('categoria',['nombre'])
        ])
        res.json({
            total,
            cheese
        })
    } catch (error) {
        res.status(404),
        res.json({
            msg:'No funca'
        })
    }
}

const postCheese = async (req,res)=>{
    try {
        const datos = new Cheese(req.body)
        const newDato = await datos.save();
        res.status(201).json(newDato);
    } catch (error) {
        res.status(404),
        res.send({
            error: 'No funca'
        })
    }
}

const deleteCheese = async (req,res)=>{
    try {
        const {id} = req.params;
        const cheese = await Cheese.findByIdAndUpdate(id,{state:false})
        res.json(cheese)
    } catch (error) {
        res.status(404),
        res.send({
            msg:'No funca'
        })
    }
}

const putCheese = async (req,res)=>{
    try {
        const {id} = req.params;
        const {_id,__v,...datos} = req.body;

        const cheese = await Cheese.findByIdAndUpdate(id,datos,{new:true})
        res.json(cheese);

    } catch (error) {
        res.status(404),
        res.send({
            msg: 'No funca'
        })
    }
}


module.exports={
    getCheese,
    postCheese,
    deleteCheese,
    putCheese
}