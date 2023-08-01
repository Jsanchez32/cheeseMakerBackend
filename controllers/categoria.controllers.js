const Categoria  = require('../models/Categoria.js');  

// Metodo Get//
const getCategoria = async(req,res)=>{
    try {
        const {desde,hasta} = req.query;
        const query = {estado:true}

        const [total, categorias] = await Promise.all([
            Categoria.countDocuments(query),
            Categoria.find(query)
                .skip(Number(desde))
                .limit(Number(hasta))
        ])
        res.json({
            total,
            categorias
        })
    } catch (error) {
        res.status(404);
        res.send({error:'No funca'});
    }
}

const postCategoria = async(req, res ) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({ nombre });

    if ( categoriaDB ) {
        return res.status(400).json({
            msg: `La categoria ${ categoriaDB.nombre }, ya existe`
        });
    }
   /*  console.log("usuario:",usuario); */
    // Generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    
    const categoria = new Categoria( data );

    // Guardar DB
    await categoria.save();

    res.status(201).json(categoria);

}

//Method Delete//

const deleteCategoria = async (req,res)=>{
    try {
        const {id} = req.params;
        const categoria = await Categoria.findByIdAndUpdate(id,{estado:false});
        res.json(categoria);
    } catch (error) {
        res.status(404);
        res.send({error:"No funca"});
    }
}

//Method Put//

const putCategoria = async (req,res)=>{
    try {
        const {id} = req.params;
        const {_id,__v,...resto} = req.body;

        const categoria = await Categoria.findByIdAndUpdate(id,resto,{new:true});

        res.json({
            msg:'Categoria Actualizada',
            categoria: categoria
        })
    } catch (error) {
        res.status(404);
        res.send({error:'No funca'})
    }
}

module.exports = {
    getCategoria,
    postCategoria,
    deleteCategoria,
    putCategoria
}